import style from "./styles/M_ApplyTeamListItem.module.scss";
import { applyTeam } from "../../../types/member";
import M_ApplyTeamMemberList from "./M_ApplyTeamMemberList";
import M_ApplyAcceptButtonList from "../FindTeam/M_ApplyAcceptButtonList";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

type PropsType = {
  animation: boolean;
  setAnimation: Dispatch<SetStateAction<boolean>>;
  timeout: any;
  team: applyTeam;
  haveOppositeTeam: boolean;
  idx: number;
  setOppoTeamIdx: Dispatch<SetStateAction<number>>;
  setOppoVisible: Dispatch<SetStateAction<boolean>>;
  clickBtn: boolean;
  setClickBtn: Dispatch<SetStateAction<boolean>>;
};

const M_ApplyTeamListItem: React.FC<PropsType> = ({
  animation,
  setAnimation,
  timeout,
  team,
  haveOppositeTeam,
  idx,
  setOppoTeamIdx,
  setOppoVisible,
  clickBtn,
  setClickBtn,
}) => {
  const [oppositeTeamCode, setOppositeTeamCode] = useState<string>("");
  useEffect(() => {
    setOppositeTeamCode(team.teamUUID);
  }, []);
  return (
    <li className={style.applyTeamBox}>
      <M_ApplyTeamMemberList
        animation={animation}
        setAnimation={setAnimation}
        timeout={timeout}
        team={team.members}
        idx={idx}
        setOppoTeamIdx={setOppoTeamIdx}
        setOppoVisible={setOppoVisible}
      />
      <M_ApplyAcceptButtonList
        haveOppositeTeam={haveOppositeTeam}
        oppsiteTeamUUID={oppositeTeamCode}
        clickBtn={clickBtn}
        setClickBtn={setClickBtn}
      />
    </li>
  );
};

export default M_ApplyTeamListItem;
