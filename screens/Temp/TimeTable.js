import React from "react";
import { Text, View, ScrollView } from "react-native";
import styled from "styled-components";
import RouteTimeTable from "../../components/RouteTimeTable";

const TitleContainer = styled.View`
  padding: 10px;
`;
const TitleText = styled.Text`
  font-family: "Jua_400Regular";
  font-size: 22px;
`;

const TimeTableContainer = styled.View`
  width: 100%;
`;
const StateContainer = styled.View`
  background-color: #eeeeee;
  padding: 10px;
  width: 100%;
`;
const StateTitleText = styled.Text`
  font-family: "Jua_400Regular";
  font-size: 17px;
`;

export default function TimeTable() {
  return (
    <ScrollView
      style={{
        backgroundColor: "white",
        flex: 1,
        padding: 13,
        flexDirection: "column",
      }}
    >
      <TitleContainer>
        <TitleText>운행시간표</TitleText>
      </TitleContainer>
      <TimeTableContainer>
        <StateContainer>
          <StateTitleText>수원</StateTitleText>
          <RouteTimeTable
            title="3000"
            time="평일 12~15분, 토요일 15분, 공휴일 15분"
          />
          <RouteTimeTable
            title="7770"
            time="평일 5~8분, 토요일 5~7분, 공휴일 5~7분"
          />
          <RouteTimeTable
            title="7780"
            time="평일 12~15분, 토요일 13분, 공휴일 13분"
          />
          <RouteTimeTable
            title="7800"
            time="평일 8~10분, 토요일 10분, 공휴일 10분"
          />
          <RouteTimeTable
            title="8471"
            time="평일 240~260분, 토요일 240~260분, 공휴일 240~260분"
          />
          <RouteTimeTable
            title="8472"
            time="평일 70~90분, 토요일 70~90분, 공휴일 70~90분"
          />
          <RouteTimeTable
            title="9802"
            time="평일 27~30분, 토요일 33분, 공휴일 33분"
          />
        </StateContainer>
        <StateContainer>
          <StateTitleText>화성</StateTitleText>
          <RouteTimeTable
            title="1006"
            time="평일 40~80분, 토요일 40~80분, 공휴일 40~80분"
          />
          <RouteTimeTable />
        </StateContainer>
      </TimeTableContainer>
    </ScrollView>
  );
}
