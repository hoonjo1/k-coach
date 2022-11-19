import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { colors } from "../colors";
import TabIcon from "./nav/TabIcon";

const RouteContainer = styled.View`
  background-color: white;
  align-self: center;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  margin-top: 10px;
`;

const RouteTitleContainer = styled.View`
  flex: 5 1 40%;
`;
const RouteTitleText = styled.Text`
  color: ${colors.red2};
  font-size: 18px;
  font-weight: bold;
`;

const RouteMoreContainer = styled.View`
  flex-direction: row;
  margin-top: 15px;
  justify-content: flex-end;
  flex: 1 1 40%;
`;

const RouteTimeContainer = styled.View`
  flex: 1 1 40%;
`;
const RouteTimeText = styled.Text`
  color: #616161;
  font-size: 10px;
`;

export default function RouteTimeTable({ title, time }) {
  return (
    <RouteContainer>
      <RouteTitleContainer>
        <RouteTitleText>{title}</RouteTitleText>
      </RouteTitleContainer>
      <RouteMoreContainer>
        <TabIcon iconName={"chevron-forward"} color={"#525252"} />
      </RouteMoreContainer>
      <RouteTimeContainer>
        <RouteTimeText>{time}</RouteTimeText>
      </RouteTimeContainer>
    </RouteContainer>
  );
}
