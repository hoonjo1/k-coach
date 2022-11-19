import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { actuatedNormalize } from "../fontSize";

const DetailView = styled.View`
  padding-left: 10%;
  padding-right: 10%;
  align-items: center;
  background-color: ${colors.inBoxBackground};
  border-radius: 10px;
  flex-direction: row;
  margin-bottom: 10px;
  flex-wrap: wrap;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const LeftContainer = styled.Text`
  flex: 1 1 50%;
  color: ${colors.disableFont};
  padding: 3px;
  font-size: ${actuatedNormalize(11)};
`;
const RightContainer = styled.Text`
  flex: 1 1 40%;
  color: ${colors.disableFont};
  padding: 3px;
  font-size: ${actuatedNormalize(11)};
`;

const EventContainer = styled.View`
  flex: 1 1 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  margin-top: 10px;
`;

const EventNameText = styled.Text`
  flex: 1 1 40%;
  color: ${colors.scoreBad};
  font-size: 12px;
  font-weight: bold;
`;
const EventDetailContainer = styled.View`
  flex: 1 1 50%;
`;
const EventTimeText = styled.Text`
  text-align: right;
  font-size: 10px;
  font-weight: 500;
  color: ${colors.accent};
`;
const EventAddressText = styled.Text`
  text-align: right;
  font-size: 9px;
  color: ${colors.disableFont};
`;

const DetailContainer = ({ data }) => {
  const eventSelector = (e) => {
    switch (e.eventName) {
      case "endOverSpeed":
        return e.eventMsg;
      case "endIdling":
        return e.eventMsg;
      case "overRPMEnd":
        return e.eventMsg;
      case "rapidAccel":
        return e.eventMsg;
      default:
        return false;
    }
  };
  const timeConverter = (time) =>
    `${time.substring(0, 2)}:${time.substring(2, 4)}:${time.substring(4, 6)}`;
  return (
    <DetailView>
      <LeftContainer>출발 {data.start}</LeftContainer>
      <RightContainer>과속 {data.overSpeedCount}초</RightContainer>
      <LeftContainer>종료 {data.end}</LeftContainer>
      <RightContainer>급가속 {data.overRapidAccelCount}초</RightContainer>
      <LeftContainer>{Math.ceil(data.total / 2)}명</LeftContainer>
      <RightContainer>공회전 {data.idlingTime}초</RightContainer>
      {data.eventList.map((d, i) =>
        eventSelector(d) ? (
          <EventContainer key={i}>
            <EventNameText>{eventSelector(d)}</EventNameText>
            <EventDetailContainer>
              <EventTimeText>{timeConverter(d.time)}</EventTimeText>
              <EventAddressText>{d.addressName}</EventAddressText>
            </EventDetailContainer>
          </EventContainer>
        ) : (
          <React.Fragment key={i}></React.Fragment>
        )
      )}
    </DetailView>
  );
};

export default DetailContainer;
