package kr.lovesignal.chattingservice.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.lovesignal.chattingservice.model.request.ReqChatMessage;
import kr.lovesignal.chattingservice.model.request.ReqShareInfo;
import kr.lovesignal.chattingservice.pubsub.RedisPublisher;
import kr.lovesignal.chattingservice.service.ChatRoomService;
import kr.lovesignal.chattingservice.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "채팅")
@RequiredArgsConstructor
@RestController
public class ChatController {

    private static final String SUCCESS = "success";

    private final RedisPublisher redisPublisher;
    private final ChatRoomService chatRoomService;
    private final ChatService chatService;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void message(ReqChatMessage reqChatMessage) {
        if (reqChatMessage.getType().equals("ENTER")) {
            chatRoomService.enterChatRoom(reqChatMessage.getRoomUUID());
        }

        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
        redisPublisher.publish(chatRoomService.getTopic(reqChatMessage.getRoomUUID()), reqChatMessage);
    }

    @ApiOperation(value = "채팅내역 조회", notes = "입장한 채팅방의 모든 채팅내역을 가져온다.")
    @GetMapping("/chat/messages")
    public ResponseEntity<List<ReqChatMessage>> getChatMessages(String roomUUID) {
        return new ResponseEntity<>(chatService.getChatMessages(roomUUID), HttpStatus.OK);
    }

    @ApiOperation(value = "이성팀 프로필 공유", notes = "동성 채팅방에 원하는 이성팀 프로필을 메세지로 보낸다.")
    @PostMapping("/chat/share")
    public ResponseEntity<String> shareProfile(@RequestBody ReqShareInfo reqShareInfo) {
        String userUUID = reqShareInfo.getUserUUID();
        String oppositeTeamUUID = reqShareInfo.getTeamUUID();
        chatService.saveShareMessage(userUUID, oppositeTeamUUID);
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }



}
