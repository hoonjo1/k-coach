import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { colors } from "../colors";
import TabIcon from "./nav/TabIcon";
import { Ionicons } from "@expo/vector-icons";

const StationConatiner = styled.View`
  /* background-color: pink; */
  align-items: center;
  padding: 10px;
  padding-bottom: 0px;
`;
const StationArrow = styled.View`
  padding: 8px;
  padding-bottom: 0px;
  width: 100%;
  padding-left: 47%;
  flex-direction: row;
`;

const StationText = styled.Text`
  font-size: 16px;
`;

const CarContainer = styled.View`
  border-width: 1px;
  border-radius: 7px;
  border-color: #b9b9b9;
  padding: 2px;
  flex-direction: row;
  margin-left: 10px;
`;
const EmptyContainer = styled.View``;
const CarText = styled.Text`
  font-size: 10px;
  margin: auto;
`;
const SeatText = styled.Text`
  font-size: 10px;
  margin: auto;
  color: ${colors.red2};
`;

export default function StationList({ name, car, seat }) {
  return (
    <StationConatiner>
      <StationText>{name}</StationText>
      <StationArrow>
        <TabIcon iconName={"arrow-down-circle"} color="#636363" />
        {car ? (
          <CarContainer>
            <Ionicons name="bus-outline" size={16} color={colors.red2} />
            <CarText>{car}</CarText>
            <SeatText>{seat}</SeatText>
          </CarContainer>
        ) : (
          <EmptyContainer></EmptyContainer>
        )}
      </StationArrow>
    </StationConatiner>
  );
}
