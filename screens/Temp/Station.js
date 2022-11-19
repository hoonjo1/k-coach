import React from "react";
import { Text, ScrollView } from "react-native";
import styled from "styled-components";
import { colors } from "../../colors";
import TabIcon from "../../components/nav/TabIcon";
import StationList from "../../components/StationList";

const DetailContainer = styled.View`
  background-color: #f7f7f7;
  padding: 25px;
  flex-direction: column;
  flex-wrap: wrap;
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
`;

const TitleText = styled.Text`
  color: ${colors.red2};
  font-size: 22px;
  font-weight: bold;
  flex: 1 1 100%;
`;

const StartStationName = styled.Text`
  padding-top: 10px;
  font-size: 17px;
  font-family: "Jua_400Regular";
`;

const TimeText = styled.Text`
  padding-left: 5px;
  color: #363636;
`;

const StationContainer = styled.View`
  /* background-color: blueviolet; */
`;

export default function Station() {
  return (
    <ScrollView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <DetailContainer>
        <TitleText>
          <TabIcon iconName={"bus"} color={colors.red2} /> 7800
        </TitleText>
        <StartStationName>기점 : 호매실동차고지</StartStationName>
        <TimeText>평일 05:00 ~ 23:50</TimeText>
        <TimeText>주말 05:00 ~ 23:00</TimeText>
        <StartStationName>회차 : 사당역(중)</StartStationName>
        <TimeText>평일 06:00 ~ 01:00</TimeText>
        <TimeText>주말 06:00 ~ 00:00</TimeText>
        <StartStationName>운행대수 : 24대</StartStationName>
      </DetailContainer>
      <StationContainer>
        <StationList name="호매실동차고지" />
        <StationList name="능실마을21단지.수원여대입구" />
        <StationList name="호매실엔루체" />
        <StationList name="호매실스위첸19단지.능실마을22단지" />
        <StationList
          name="능실초등학교.힐스테이트호매실"
          car="1620"
          seat=" 40석"
        />
        <StationList name="호매실마을14단지.장애인종합복지관" />
        <StationList name="호매실마을13단지.수원시보훈회관" />
      </StationContainer>
    </ScrollView>
  );
}
