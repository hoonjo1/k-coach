import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { actuatedNormalize } from "../fontSize";
import TabIcon from "./nav/TabIcon";

const ContentContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom-color: #555555;
  border-bottom-width: ${(props) => (props.isLast ? "0px" : "1px")};
  margin-top: 5px;
  padding: 5px;
  padding-bottom: 10px;
`;

const TitleText = styled.Text`
  flex: 1 1 100%;
  text-align: center;
  font-weight: bold;
  font-size: ${actuatedNormalize(14)};
  color: ${colors.scoreBad};
  padding-bottom: 5px;
`;

const DateText = styled.Text`
  font-size: ${actuatedNormalize(11)};
  flex: 1 1 40%;
  color: ${colors.scoreNotBad};
  padding-bottom: 5px;
`;
const RouteText = styled.Text`
  text-align: left;
  flex: 1 1 35%;
  font-size: ${actuatedNormalize(12)};
  font-weight: bold;
  color: ${colors.red2};
`;
const CarNumberText = styled.Text`
  flex: 1 1 40%;
  text-align: right;
  font-size: ${actuatedNormalize(12)};
  font-weight: bold;
  color: #606fe4;
  padding-bottom: 5px;
`;
const AddressName = styled.Text`
  flex: 1 1 55%;
  text-align: right;
  color: ${colors.scoreNotBad};
  font-size: ${actuatedNormalize(10)};
`;

export default function TextContainer({
  car,
  date,
  route,
  time,
  addressName,
  eventMsg,
  isLast = false,
}) {
  return (
    <ContentContainer isLast={isLast}>
      <TitleText>{eventMsg}</TitleText>
      <DateText>
        {`${date.substring(2, 4)}월 ${date.substring(4, 6)}일 `}
        {`${time.substring(0, 2)}:${time.substring(2, 4)}:${time.substring(
          4,
          6
        )}`}
      </DateText>
      <CarNumberText>{car}</CarNumberText>

      <RouteText>
        <TabIcon iconName={"bus"} color={colors.red2} size={12} />
        {route}
      </RouteText>
      <AddressName>{addressName}</AddressName>
    </ContentContainer>
  );
}
