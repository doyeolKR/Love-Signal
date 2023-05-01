import style from "./SignUp.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input_Type_A from "../UI/Common/Input_Type_A";
import Button_Type_A from "../UI/Common/Button_Type_A";
import Image_Type_A from "../UI/Common/Image_Type_A";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [checkNickname, setCheckNickname] = useState<boolean>(false);

  const navigate = useNavigate();

  const birth: string = "19970220";
  const description: string = "나는 손종효다";
  const gender: string = "M";
  const help: string = "T";

  // const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = e.target as HTMLInputElement;
  //   setEmail(target.value);
  // };

  // const handleChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = e.target as HTMLInputElement;
  //   setPassword(target.value);
  // };

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setNickname(target.value);
    setCheckNickname(false); //바뀌면 바로 false로 바꿔줘.
  };

  //중복확인 해주는 함수입니다.
  const duplecheck = () => {
    axios
      .get(`http://localhost:8888/member/auth/check/nickname/${nickname}`)
      .then((response) => {
        //여기로 와서 만약 response가 중복되지 않은것을 알려주었다면?

        if (response) {
          setCheckNickname(true); //중복확인 체크하기.
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);

        console.log(err); //에러발생!
      });
  };

  //회원가입 버튼 클릭했을때
  const signup = () => {
    if (checkNickname) {
      //중복 확인 했을때만 가능하다
      axios
        .post("http://localhost:8888/member/auth/sign-up", {
          birth: birth,
          description: description,
          gender: gender,
          help: help,
          loginId: email,
          nickname: nickname,
          password: password,
        })
        .then((response) => {
          console.log(response);
          navigate("/Manual");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //아니면 중복확인 눌러줘~
      alert("중복확인 체크는 하셨나요?");
    }
  };

  return (
    <>
      <div className={`${style.Container} diagonal-gradient`}>
        <img src="/assets/Logo2.png" height="100vh" />
        <Image_Type_A />
        <div className={style.userInfo}>
          <div className={style.nickName}>
            <Input_Type_A
              className="writeNickName"
              type="text"
              id="nickName"
              value={nickname}
              onChange={handleChangeNickname}
              placeholder="우정새우"
            />
            <Button_Type_A
              className="dupleCheck"
              width="96px"
              height="24px"
              background="#ffffff"
              onClick={duplecheck}
              disabled={true}
              children="중복확인"
            />
          </div>
          <Button_Type_A
            className="dupleCheck"
            width="180px"
            height="32px"
            background="#ffffff"
            onClick={signup}
            disabled={true}
            children="회원가입"
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
