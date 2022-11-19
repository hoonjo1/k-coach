import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import { colors } from "../colors";
import BBS from "../components/BBS";
import AuthButton from "../components/AuthButton";
import ScreenLayout from "../components/ScreenLayout";
import { actuatedNormalize } from "../fontSize";

const Button = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 15px 10px;
  border-radius: 4px;
  /* width: 100%; */
  opacity: ${(props) => (props.disable ? "0.5" : "1")};
  margin: 3px;
  margin-bottom: 10px;
  /* flex: 1 1 100%; */
`;
const TwoButton = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 15px 10px;
  border-radius: 4px;
  width: 90%;
  opacity: ${(props) => (props.disable ? "0.5" : "1")};
  margin: 3px;
  margin-bottom: 10px;
  flex: 1 1 40%;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: ${actuatedNormalize(14)};
  font-weight: 600;
  text-align: center;
`;

export default function Profile() {
  const logOut = () => logUserOut();
  return (
    <ScreenLayout>
      <Button onPress={logOut} style={{ backgroundColor: colors.accent }}>
        <ButtonText>로그아웃</ButtonText>
      </Button>
    </ScreenLayout>
  );
  // const content = [
  //   "7월 공지사항입니다.",
  //   "2021년 7월 근무표 업로드 완료",
  //   "6월 급여명세서 업데이트.",
  // ];
  // const dateList = ["07/01", "06/25", "06/10"];
  // const content2 = ["운행 전 확인 바랍니다.", "긴급 공지사항입니다.", ""];
  // const dateList2 = ["06/30", "06/13", ""];
  // return (
  //   <View
  //     style={{
  //       backgroundColor: "white",
  //       flex: 1,
  //       alignItems: "center",
  //       justifyContent: "center",
  //       padding: 30,
  //     }}
  //   >
  //     <ProfileContainer>
  //       <ProfileImage source={require("../assets/user.png")}></ProfileImage>
  //       <ProfileNameContainer>
  //         <ProfileName>홍길동님</ProfileName>
  //         <ProfileDetail>7800번 근무 중</ProfileDetail>
  //       </ProfileNameContainer>
  //     </ProfileContainer>
  //     <BBS title="공지사항" content={content} dateList={dateList} />
  //     <BBS title="7800번 공지사항" content={content2} dateList={dateList2} />

  //     <ButtonContainer>
  //       <TwoButton>
  //         <ButtonText>1대1 문의</ButtonText>
  //       </TwoButton>
  //       <TwoButton>
  //         <ButtonText>증명서류 발급</ButtonText>
  //       </TwoButton>
  //       <Button>
  //         <ButtonText>건의사항</ButtonText>
  //       </Button>
  //       <Button onPress={logOut} style={{ backgroundColor: "#ff9595" }}>
  //         <ButtonText>로그아웃</ButtonText>
  //       </Button>
  //     </ButtonContainer>
  //   </View>
  // );
}
