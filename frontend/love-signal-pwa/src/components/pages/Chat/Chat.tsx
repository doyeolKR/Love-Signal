import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import style from "./styles/Chat.module.scss";

import T_Chat from "../../templates/Chat/T_Chat";
import T_ChatRoom from "../../templates/Chat/T_ChatRoom";

import { roomInfo } from "../../../atom/chatRoom";
import { footerIsOn } from "../../../atom/footer";
import { footerIdx } from "../../../atom/footer";
import { inquireMember } from "../../../api/auth";
import { member, userInfo } from "../../../types/member";

const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useRecoilState(roomInfo);
  const [_, setIdx] = useRecoilState<number>(footerIdx);
  const [__, setFooterIsOn] = useRecoilState(footerIsOn);

  // test용 state
  const [userUUID, ___] = useState<string>(
    "882a9377-c1a6-4802-a0d8-2f310c004fed"
  );
  const [chatUser, setChatUser] = useState<member>();

  useEffect(() => {
    inquireMember(userUUID).then((res) => {
      const userInfo: userInfo = res.data.body;

      setChatUser({
        nickname: userInfo.nickname,
        age: userInfo.age,
        memberUUID: userInfo.memberUUID,
        description: userInfo.description,
        profileImage: userInfo.profileImage,
      });
    });

    setIdx(2);
    window.addEventListener("resize", unitHeightSetHandler);
    window.addEventListener("touchend", unitHeightSetHandler);
    window.visualViewport?.addEventListener(
      "resize",
      resizeVisualViewportHandler
    );

    return () => {
      setSelectedRoom({});
      setFooterIsOn(true);
      window.removeEventListener("resize", unitHeightSetHandler);
      window.removeEventListener("touchend", unitHeightSetHandler);
      window.visualViewport?.removeEventListener(
        "resize",
        resizeVisualViewportHandler
      );
    };
  }, []);

  const unitHeightSetHandler = () => {
    let vh = window.visualViewport?.height;
    if (!vh) {
      vh = window.innerHeight * 0.01;
    } else {
      vh *= 0.01;
    }
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const resizeVisualViewportHandler = () => {
    const current = window.visualViewport?.height;
  };

  const roomExitHandler = () => {
    setSelectedRoom({});
    setFooterIsOn(true);
  };

  return (
    <div
      className={`${style.container} ${
        selectedRoom.uuid ? style.expanded : ""
      }`}
    >
      {/* 채팅방 타입은 SYSTEM, TEAM, MEETING, SECRET, SIGNAL 나뉘어져 있음 */}
      {selectedRoom.uuid && (
        <T_ChatRoom
          className={`${selectedRoom.uuid ? "slide-in-enter" : ""} common-bg`}
          roomId={selectedRoom.uuid}
          title={selectedRoom.roomName}
          count={selectedRoom.memberCount}
          roomExitHandler={roomExitHandler}
          roomType={selectedRoom.type}
          me={chatUser} // temp data
        />
      )}
      {!selectedRoom.uuid && <T_Chat />}

      {/* <T_Chat />
      <T_ChatRoom
        className={`${selectedRoom.uuid ? "slide-in-enter" : ""} common-bg`}
        roomId={selectedRoom.uuid}
        title={selectedRoom.roomName}
        count={selectedRoom.memberCount}
        roomExitHandler={roomExitHandler}
        roomType={selectedRoom.type}
        // chatList={chat}
        // onTextSend={textSendHandler}
      /> */}
    </div>
  );
};

export default Chat;
