import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Text, View, TouchableOpacity } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { tokenVar } from "../apollo";
import ScreenLayout from "../components/ScreenLayout";
import { colors } from "../colors";
import { actuatedNormalize } from "../fontSize";

const ItemContainer = styled.View`
  background-color: rgb(25, 31, 44);
  border-color: rgba(207, 207, 207, 0.3);
  border-width: 1px;
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.04) -1px 1px 1px;
  padding: 15px;
  margin-top: 20px;
`;
const DateText = styled.Text`
  color: ${colors.accent};
  font-family: "Gyunggi-title-Bold";
  font-size: ${actuatedNormalize(18)};
`;
const DateItemContainer = styled.TouchableOpacity`
  padding-left: 10%;
  padding-right: 10%;
  align-items: center;
  background-color: ${colors.inBoxBackground};
  border-radius: 10px;
  flex-direction: row;
  margin-top: 15px;
  flex-wrap: wrap;
  padding-top: 5px;
  padding-bottom: 5px;
`;
const CategoryText = styled.Text`
  color: ${colors.font};
  width: 90%;
  font-family: "Gyunggi-title-Bold";
  font-size: ${actuatedNormalize(14)};
`;

const LOAD_PAY_DATA = gql`
  query getBillData($token: String!) {
    getBillData(token: $token) {
      _id
      date
      category
      bonus
    }
  }
`;

export default function Billing({ navigation }) {
  const token = tokenVar();
  const today = new Date();
  const dateFomatter = (d) => {
    if (d < 10) {
      return "0" + d;
    }
    return d;
  };
  const yyyymm = today.getFullYear() + dateFomatter(today.getMonth());
  const [firstPress, setFirstPress] = useState(false);
  const [secondPress, setSecondPress] = useState(false);
  const [date, setDate] = useState(yyyymm);
  const dateKR = new Date();
  const year = dateKR.getFullYear();
  const month = dateKR.getMonth() + 1;
  const { data, error, loading } = useQuery(LOAD_PAY_DATA, {
    variables: { token: token },
  });
  const comma = (m) => m.toLocaleString("ko-KR");
  return (
    <ScreenLayout loading={loading}>
      {data?.getBillData.map((d, i) => (
        <ItemContainer key={i}>
          <DateText>{`${d[0].date.substring(0, 4)}년 ${d[0].date.substring(
            5,
            7
          )}월`}</DateText>
          {d.map((da, i) => (
            <DateItemContainer
              key={i}
              onPress={() => navigation.navigate("BillingDetail", da)}
            >
              <CategoryText>{da.category}</CategoryText>
              <TabIcon
                iconName={"chevron-forward"}
                color={"#FFFFFF"}
                size={17}
              ></TabIcon>
            </DateItemContainer>
          ))}
        </ItemContainer>
      ))}
    </ScreenLayout>
  );
}
