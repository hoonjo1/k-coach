import React from "react";
import { ActivityIndicator, View, ScrollView, Text } from "react-native";
import styled from "styled-components";

const TitleContainer = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  flex-wrap: wrap;
`;
const TitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  flex: 9;
`;
const TitleMoreText = styled.Text`
  font-size: 9px;
  flex: 1;
  color: #636363;
  align-self: flex-end;
`;

const ContentContainer = styled.View`
  border-bottom-color: lightgray;
  border-bottom-width: 1px;
  padding: 5px;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ContentText = styled.Text`
  flex: 4;
`;

const DateText = styled.Text`
  flex: 1;
  text-align: right;
  font-size: 10px;
  color: #4d4d4d;
  margin-top: 3px;
`;

export default function BBS({ loading, title, content, dateList }) {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        width: "95%",
        marginBottom: "10%",
        // flexDirection: "row",
      }}
    >
      {/* {loading ? <ActivityIndicator color="black" /> : <Text>dddd</Text>} */}
      <TitleContainer>
        <TitleText>{title}</TitleText>
        <TitleMoreText>more</TitleMoreText>
      </TitleContainer>
      <ContentContainer>
        <ContentText>{content[0]}</ContentText>
        <DateText>{dateList[0]}</DateText>
      </ContentContainer>
      <ContentContainer>
        <ContentText>{content[1]}</ContentText>
        <DateText>{dateList[1]}</DateText>
      </ContentContainer>
      <ContentContainer>
        <ContentText>{content[2]}</ContentText>
        <DateText>{dateList[2]}</DateText>
      </ContentContainer>
      <ContentContainer>
        <ContentText></ContentText>
        <DateText></DateText>
      </ContentContainer>
    </View>
  );
}
