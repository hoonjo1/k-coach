import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { colors } from "../colors";
import { Calendar } from "react-native-calendars";
import AuthButton from "../components/AuthButton";

const TitleContainer = styled.View`
  padding: 30px;
`;
const TitleText = styled.Text`
  font-size: 26px;
  font-weight: 600;
  font-family: "Jua_400Regular";
`;

const AbleContainer = styled.View`
  padding: 30px;
`;
const AbleText = styled.Text`
  font-size: 18px;
  font-weight: 200;
  font-family: "NanumGothic_400Regular";
`;

const AccentText = styled.Text`
  color: ${colors.red2};
  font-size: 20px;
`;

const CalendarContainer = styled.View`
  width: 100%;
`;

const RequestText = styled.TextInput`
  width: 100%;
  height: 20%;
  border-width: 2px;
  border-color: lightgray;
  border-radius: 7px;
  margin: 10px;
  padding: 5px;
`;

export default function Dispatch() {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
      }}
    >
      <TitleContainer>
        <TitleText>2021년 7월 - 7800번</TitleText>
      </TitleContainer>
      <AbleContainer>
        <AbleText>
          잔여 휴무 : <AccentText>4개</AccentText>
        </AbleText>
      </AbleContainer>
      <CalendarContainer>
        <Calendar
          current="2021-06-25"
          monthFormat={"yyyy MM"}
          markedDates={{
            "2021-07-03": {
              selected: true,
              selectedColor: "#ff5d5d",
            },
            "2021-07-12": {
              selected: true,
              selectedColor: "#ff5d5d",
            },
            "2021-07-17": {
              selected: true,
              selectedColor: "#ff5d5d",
            },
            "2021-07-27": {
              selected: true,
              selectedColor: "#ff5d5d",
            },
            "2021-07-21": { disabled: true, disableTouchEvent: true },
          }}
          theme={{
            backgroundColor: "#FFFFFF",
            calendarBackground: "#FFFFFF",
            textSectionTitleColor: "black",
            textSectionTitleDisabledColor: "#84817a",
            selectedDayTextColor: "#8d8d8d",
            todayTextColor: "black",
            dayTextColor: "#84817a",
            monthTextColor: "#84817a",
          }}
        ></Calendar>
      </CalendarContainer>
      <RequestText
        placeholder="요청사항"
        multiline
        numberOfLines={4}
        onChangeText={(text) => onChangeText(text)}
      ></RequestText>
      <AuthButton text="제출"></AuthButton>
    </View>
  );
}
