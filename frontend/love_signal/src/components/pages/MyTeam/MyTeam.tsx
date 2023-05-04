import { useState, useEffect } from "react";
import style from "./styles/MyTeam.module.scss";
import T_MyTeam from "../../templates/MyTeam/T_MyTeam";
import M_MyTeamDesc from "../../molecules/MyTeam/M_MyTeamDesc";
import O_MyTeamBox from "../../organisms/MyTeam/O_MyTeamBox";
import { inquireMember } from "../../../api/auth";
import { myMemberUUID } from "../../../atom/member";
import { useRecoilState } from "recoil";

const MyTeam = () => {
  //현재 우리팀이 상대팀이 매칭이 되어있는지 확인하기.(임시입니다.)
  //내가 팀 리더인지 파악을 할 수 있어야한다. (현재 내가 팀이 있을때 teamLeader가 true인지 false인지 파악.)

  //내가 상대팀이 있는지 파악해주는 state변수입니다.
  const [haveOppositeTeam, setHaveOppositeTeam] = useState<boolean>(false);

  //내가 현재 리더인지 파악해주는 state변수입니다.
  const [isLeader, setIsLeader] = useState<boolean>(true);

  //내 개인 UUID 입니다.
  const [myUUID] = useRecoilState<string>(myMemberUUID);

  //들어올 때 마다 axios요청을해서 내 개인정보를 불러오고 거기에 팀 리더인지, 팀이 있는지를 파악해주자.
  //가져올 axios는 나의 팀 정보, 우리팀에 들어온 신청정보.
  useEffect(() => {
    getUserInfo();
  }, []);

  //axios로 내 정보 받아오기.
  const getUserInfo = () => {
    inquireMember(myUUID)
      .then((res) => {
        console.log(res); //해당 정보 보고 판단.
        //여기서 이 정보를 가지고 내가 리더인지, 현재 상대팀이 매칭이 되어있는지를 파악하기.

        //내가 리더면 변경.
        if (true) {
          setIsLeader(true);
        }
        //내가 상대팀을 가지고 있는지를 파악.
        if (true) {
          setHaveOppositeTeam(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={style.container}>
      <T_MyTeam>
        <M_MyTeamDesc />
        <O_MyTeamBox isLeader={isLeader} haveOppositeTeam={haveOppositeTeam} />
      </T_MyTeam>
    </div>
  );
};

export default MyTeam;