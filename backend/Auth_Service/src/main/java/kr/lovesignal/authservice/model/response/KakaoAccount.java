package kr.lovesignal.authservice.model.response;


import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class KakaoAccount {

    private String email;
}
