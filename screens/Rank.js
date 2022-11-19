import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { tokenVar } from "../apollo";
import ScreenLayout from "../components/ScreenLayout";
import { Ionicons } from "@expo/vector-icons";

const MONTHLY_RANK = gql`
  query ranking($token: String!) {
    ranking(token: $token) {
      year
      name
      month
      route
      result {
        name
        scoreAvg
      }
    }
  }
`;

const RankTitle = styled.Text`
  color: white;
  margin-top: 40px;
  font-size: 22px;
`;

const RankSubTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const TextContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const RankIndexText = styled.Text`
  color: white;
  margin-left: 30%;
`;
const RankNameText = styled.Text`
  margin-left: 10%;
  color: white;
`;
const RankScoreText = styled.Text`
  margin-left: 10%;
  margin-right: 10%;
  color: white;
`;

const ScrollContainer = styled.ScrollView`
  width: 100%;
`;

export default function Rank() {
  const token = tokenVar();
  const { data, error, loading } = useQuery(MONTHLY_RANK, {
    variables: { token: token },
  });
  return (
    <ScreenLayout loading={loading}>
      <RankTitle>{`${data?.ranking.year}년 ${data?.ranking.month}월`}</RankTitle>
      <RankSubTitle>
        <Ionicons name={"bus-outline"} color={"white"} size={24} />
        {`${data?.ranking.route}번`}
      </RankSubTitle>
      <ScrollContainer>
        {data?.ranking.result.map((d, i) => (
          <TextContainer key={i}>
            <RankIndexText
              style={
                d.name === data?.ranking.name
                  ? {
                      color: "lightblue",
                      fontSize: 16,
                      fontWeight: "bold",
                      marginLeft: "27%",
                    }
                  : { color: "white" }
              }
              key={i}
            >
              {i + 1}
            </RankIndexText>
            <RankNameText
              style={
                d.name === data?.ranking.name
                  ? { color: "lightblue", fontSize: 16, fontWeight: "bold" }
                  : { color: "white" }
              }
            >
              {d.name}
            </RankNameText>
            <RankScoreText
              style={
                d.name === data?.ranking.name
                  ? { color: "lightblue", fontSize: 16, fontWeight: "bold" }
                  : { color: "white" }
              }
            >{`${d.scoreAvg}점`}</RankScoreText>
          </TextContainer>
        ))}
      </ScrollContainer>
    </ScreenLayout>
  );
}
