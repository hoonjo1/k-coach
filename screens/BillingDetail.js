import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { colors } from "../colors";
import TabIcon from "../components/nav/TabIcon";
import ScreenLayout from "../components/ScreenLayout";
import { actuatedNormalize } from "../fontSize";

const LOAD_PAY_DATA_DETAIL = gql`
  query getBillDetail($_id: ID!) {
    getBillDetail(_id: $_id) {
      _id
      date
      category
      bonus
      name
      data {
        itemName
        item
      }
    }
  }
`;
const HideView = styled.View`
  /* flex: 1; */
  background: ${colors.inBoxBackground};
  /* height: 75px; */
  border-radius: 10px;
  padding-left: 10%;
  padding-right: 10%;
  flex: 1 1 90%;
  align-items: center;
  display: none;
  margin-top: 45px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ContentContainer = styled.TouchableOpacity`
  background-color: rgb(25, 31, 44);
  border-color: rgba(207, 207, 207, 0.3);
  border-width: 1px;
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.04) -1px 1px 1px;
  padding: 20px;
  margin-top: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ContentCountText = styled.Text`
  font-family: "Gyunggi-title-Bold";
  font-size: ${actuatedNormalize(16)};
  margin-left: 3%;
  margin-right: 10px;
  text-align: right;
  flex: 1 1 40%;
  color: ${colors.accent};
`;

const ContentTitleText = styled.Text`
  font-family: "Gyunggi-title-Bold";
  font-size: ${actuatedNormalize(18)};
  margin-left: 3%;
  color: #ffffff;
  flex: 1 1 40%;
`;

const ContentPayText = styled.Text`
  font-family: "Gyunggi-title-Bold";
  font-size: ${actuatedNormalize(16)};
  margin-left: 3%;
  margin-right: 10px;
  text-align: right;
  flex: 1 1 40%;
  color: ${(props) =>
    props.color === "green"
      ? colors.scoreGood
      : props.color === "red"
      ? colors.scoreBad
      : colors.scoreNotBad};
`;

const ItemContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom-color: #555555;
  border-bottom-width: ${(props) => (props.isLast ? "0px" : "1px")};
  padding: 5px;
`;
const ItemNameText = styled.Text`
  color: ${(props) => props.color};
  flex: 1 1 40%;
  font-size: ${actuatedNormalize(13)};
`;
const ItemText = styled.Text`
  flex: 1 1 40%;
  font-size: ${actuatedNormalize(13)};
  color: ${(props) => props.color};
  text-align: right;
`;
export default function BillingDetail({ route }) {
  const getParam = route.params;
  const [daysTotal, setDaysTotal] = useState(false);
  const [inputTotal, setInputTotal] = useState(false);
  const [outputTotal, setOutputTotal] = useState(false);
  const { data, error, loading } = useQuery(LOAD_PAY_DATA_DETAIL, {
    variables: { _id: getParam._id },
  });
  const bill = data?.getBillDetail;
  // const comma = (m) => m.toLocaleString("ko-KR");
  const comma = (inputNumber) =>
    inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return data ? (
    getParam.bonus ? (
      <ScreenLayout loading={loading}>
        <ContentContainer onPress={() => setInputTotal(!inputTotal)}>
          <ContentTitleText>총상여</ContentTitleText>
          <ContentPayText color={"green"}>
            {comma(bill?.data[3].item)}원
          </ContentPayText>
          <TabIcon
            iconName={inputTotal ? "chevron-up" : "chevron-down"}
            color={"#FFFFFF"}
            size={14}
          />
          <HideView style={{ display: inputTotal ? "flex" : "none" }}>
            {bill.data.map((d, i) =>
              i < 3 ? (
                <ItemContainer isLast={i === 2 ? true : false} key={i}>
                  <ItemNameText color={i === 0 ? "#178a17" : "#b7c1cc"}>
                    {d.itemName.replace(/ /g, "")}
                  </ItemNameText>
                  <ItemText color={i === 0 ? "#178a17" : "#b7c1cc"}>
                    {comma(d.item)}원
                  </ItemText>
                </ItemContainer>
              ) : (
                <React.Fragment key={i}></React.Fragment>
              )
            )}
          </HideView>
        </ContentContainer>
        <ContentContainer onPress={() => setOutputTotal(!outputTotal)}>
          <ContentTitleText>공제총액</ContentTitleText>
          <ContentPayText color={"red"}>
            {comma(bill?.data[10].item)}원
          </ContentPayText>
          <TabIcon
            iconName={outputTotal ? "chevron-up" : "chevron-down"}
            color={"#FFFFFF"}
            size={14}
          />
          <HideView style={{ display: outputTotal ? "flex" : "none" }}>
            {bill.data.map((d, i) =>
              i > 3 && i !== 11 ? (
                <ItemContainer isLast={i === 10 ? true : false} key={i}>
                  <ItemNameText color={i === 10 ? "#eb5374" : "#b7c1cc"}>
                    {d.itemName.replace(/ /g, "")}
                  </ItemNameText>
                  <ItemText color={i === 10 ? "#eb5374" : "#b7c1cc"}>
                    {comma(d.item)}원
                  </ItemText>
                </ItemContainer>
              ) : (
                <React.Fragment key={i}></React.Fragment>
              )
            )}
          </HideView>
        </ContentContainer>
        <ContentContainer>
          <ContentTitleText>실수령액</ContentTitleText>
          <ContentPayText>{comma(bill?.data[11].item)}원</ContentPayText>
        </ContentContainer>
      </ScreenLayout>
    ) : (
      <ScreenLayout loading={loading}>
        <ContentContainer onPress={() => setDaysTotal(!daysTotal)}>
          <ContentTitleText>근무일수</ContentTitleText>
          <ContentCountText>{bill?.data[59].item}일</ContentCountText>
          <TabIcon
            iconName={inputTotal ? "chevron-up" : "chevron-down"}
            color={"#FFFFFF"}
            size={14}
          />
          <HideView style={{ display: daysTotal ? "flex" : "none" }}>
            {bill.data.map((d, i) =>
              i > 52 && d.item > 0 ? (
                <ItemContainer isLast={i === 27 ? true : false} key={i}>
                  <ItemNameText color={"#b7c1cc"}>
                    {d.itemName.replace(/ /g, "")}
                  </ItemNameText>
                  <ItemText color={"#b7c1cc"}>{comma(d.item)}일</ItemText>
                </ItemContainer>
              ) : (
                <React.Fragment key={i}></React.Fragment>
              )
            )}
          </HideView>
        </ContentContainer>
        <ContentContainer onPress={() => setInputTotal(!inputTotal)}>
          <ContentTitleText>급여총액</ContentTitleText>
          <ContentPayText color={"green"}>
            {comma(bill?.data[27].item)}원
          </ContentPayText>
          <TabIcon
            iconName={inputTotal ? "chevron-up" : "chevron-down"}
            color={"#FFFFFF"}
            size={14}
          />
          <HideView style={{ display: inputTotal ? "flex" : "none" }}>
            {bill.data.map((d, i) =>
              i < 28 ? (
                <ItemContainer isLast={i === 27 ? true : false} key={i}>
                  <ItemNameText color={i === 27 ? "#178a17" : "#b7c1cc"}>
                    {d.itemName.replace(/ /g, "")}
                  </ItemNameText>
                  <ItemText color={i === 27 ? "#178a17" : "#b7c1cc"}>
                    {comma(d.item)}원
                  </ItemText>
                </ItemContainer>
              ) : (
                <React.Fragment key={i}></React.Fragment>
              )
            )}
          </HideView>
        </ContentContainer>
        <ContentContainer onPress={() => setOutputTotal(!outputTotal)}>
          <ContentTitleText>공제총액</ContentTitleText>
          <ContentPayText color={"red"}>
            {comma(bill?.data[51].item)}원
          </ContentPayText>
          <TabIcon
            iconName={outputTotal ? "chevron-up" : "chevron-down"}
            color={"#FFFFFF"}
            size={14}
          />
          <HideView style={{ display: outputTotal ? "flex" : "none" }}>
            {bill.data.map((d, i) =>
              i > 27 && i < 52 ? (
                <ItemContainer isLast={i === 51 ? true : false} key={i}>
                  <ItemNameText color={i === 51 ? "#eb5374" : "#b7c1cc"}>
                    {d.itemName.replace(/ /g, "")}
                  </ItemNameText>
                  <ItemText color={i === 51 ? "#eb5374" : "#b7c1cc"}>
                    {comma(d.item)}원
                  </ItemText>
                </ItemContainer>
              ) : (
                <React.Fragment key={i}></React.Fragment>
              )
            )}
          </HideView>
        </ContentContainer>
        <ContentContainer>
          <ContentTitleText>실수령액</ContentTitleText>
          <ContentPayText>{comma(bill?.data[52].item)}원</ContentPayText>
        </ContentContainer>
      </ScreenLayout>
    )
  ) : (
    <ScreenLayout loading={loading}></ScreenLayout>
  );
}
