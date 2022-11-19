import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { actuatedNormalize } from "../fontSize";
import TabIcon from "./nav/TabIcon";

const ContentContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  /* border-bottom-color: #555555;
  border-bottom-width: ${(props) => (props.isLast ? "0px" : "1px")}; */
  padding: 10px;
  padding-bottom: 15px;
  margin-left: 10px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;

const CycleText = styled.Text`
  font-size: ${actuatedNormalize(20)};
  flex: 1 1 10%;
  color: ${colors.accent};
`;
const ScoreText = styled.Text`
  text-align: right;
  flex: 1 1 19%;
  font-size: ${actuatedNormalize(16)};
  font-weight: bold;
  color: ${(props) =>
    props.score > 90
      ? colors.scoreGood
      : props.score > 50
      ? colors.scoreNotBad
      : colors.scoreBad};
`;
const RouteNameContainer = styled.View`
  flex: 1 1 45%;
`;
const RouteNameText = styled.Text`
  font-size: ${actuatedNormalize(14)};
  font-weight: bold;
  color: ${colors.nRed};
`;
const CarNumberText = styled.Text`
  flex: 1 1 40%;
  font-size: ${actuatedNormalize(12)};
  font-weight: bold;
  color: ${colors.disableFont};
`;
const MoreText = styled.Text`
  flex: 1 1 10%;
  text-align: right;
  color: #ffffff;
  font-size: 10px;
`;

export default function OperationalContainer({ data, isLast = false }) {
  return (
    <ContentContainer isLast={isLast}>
      <CycleText>{data.cycle}</CycleText>
      <RouteNameContainer>
        <RouteNameText>{data.route}</RouteNameText>
        <CarNumberText>{data.carNumber}</CarNumberText>
      </RouteNameContainer>
      <ScoreText score={data.score}>{data.score}점</ScoreText>
    </ContentContainer>
  );
}
