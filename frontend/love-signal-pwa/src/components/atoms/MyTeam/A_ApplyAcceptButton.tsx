import { Dispatch, SetStateAction } from "react";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import { acceptMeeting } from "../../../api/team";
import { useRecoilState } from "recoil";
import { myMemberUUID } from "../../../atom/member";

type propsType = {
  isLeader: boolean;
  haveOppositeTeam: boolean;
  oppsiteTeamUUID: string;
  clickBtn: boolean;
  setClickBtn: Dispatch<SetStateAction<boolean>>;
};

const A_ApplyAcceptButton: React.FC<propsType> = ({
  isLeader,
  haveOppositeTeam,
  oppsiteTeamUUID,
  clickBtn,
  setClickBtn,
}) => {
  //버튼 클릭시 팀 수락한거임.
  const [myUUID] = useRecoilState<string>(myMemberUUID);
  const acceptTeam = () => {
    acceptMeeting(myUUID, oppsiteTeamUUID);
    setClickBtn(!clickBtn);
    // console.log("클릭되는건가 나?");
  };

  return (
    <Button_Type_A
      width="56px"
      height="32px"
      background={isLeader && haveOppositeTeam ? "#cad9ff" : "#BCBCBC"}
      disabled={isLeader && haveOppositeTeam}
      onClick={acceptTeam}
    >
      {isLeader && haveOppositeTeam ? (
        <img src="/assets/btn_check.png" onClick={acceptTeam} />
      ) : (
        <img src="/assets/btn_blackcheck.png" />
      )}
    </Button_Type_A>
  );
};

export default A_ApplyAcceptButton;
