import React from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import styled from "styled-components/native";
import TextContainer from "../components/TextContainer";
import ScreenLayout from "../components/ScreenLayout";
import { Svg, Text as TextSVG } from "react-native-svg";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { tokenVar } from "../apollo";
import { LineChart } from "react-native-chart-kit";
import TabIcon from "../components/nav/TabIcon";
import { useState } from "react";
import { colors } from "../colors";
import { actuatedNormalize } from "../fontSize";

const WarningContainer = styled.View`
  background-color: rgb(25, 31, 44);
  border-color: rgba(207, 207, 207, 0.3);
  border-width: 1px;
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.04) -1px 1px 1px;
  padding: 30px;
  margin-top: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const WarningText = styled.Text`
  font-family: "Gyunggi-title-Bold";
  font-size: ${actuatedNormalize(16)};
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
  text-align: center;
  color: #ffffff;
  margin-bottom: 10px;
`;

const RouteSummaryContainer = styled.View`
  padding-left: 10%;
  padding-right: 10%;
  align-items: center;
  background-color: ${colors.inBoxBackground};
  border-radius: 10px;
  flex-direction: row;
  margin-top: 15px;
  flex-wrap: wrap;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const RouteNameText = styled.Text`
  color: ${colors.red2};
  font-family: "Gyunggi-title-Bold";
  font-size: ${actuatedNormalize(14)};
  font-weight: bold;
  margin-left: 5px;
  flex: 1 1 60%;
`;
const RouteCountText = styled.Text`
  font-family: "Gyunggi-title-Bold";
  color: ${colors.scoreNotBad};
  font-size: ${actuatedNormalize(14)};
  font-weight: bold;
  text-align: right;
  flex: 1 1 10%;
`;

const SummaryContainer = styled.View`
  background-color: rgb(25, 31, 44);
  border-color: rgba(207, 207, 207, 0.3);
  border-width: 1px;
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.04) -1px 1px 1px;
  padding: 20px;
  margin-top: 20px;
`;

const GraphContainer = styled.View`
  background-color: rgb(25, 31, 44);
  border-color: rgba(207, 207, 207, 0.3);
  border-width: 1px;
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.04) -1px 1px 1px;
  margin-top: 15px;
  align-items: center;
`;
const DetailContainer = styled.View`
  background-color: rgb(25, 31, 44);
  border-color: rgba(207, 207, 207, 0.3);
  border-width: 1px;
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.04) -1px 1px 1px;
  margin-top: 15px;
`;

const WelcomeSubText = styled.Text`
  font-family: "Gyunggi-title-Bold";
  font-size: ${actuatedNormalize(18)};
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
  text-align: center;
  color: #ffffff;
  margin-bottom: 10px;
`;
const WelcomeScoreText = styled.Text`
  font-family: "Gyunggi-title-Bold";
  font-size: ${actuatedNormalize(25)};
  width: 100%;
  padding-top: 10px;
  padding-left: 10%;
  padding-right: 10%;
  text-align: right;
  color: ${(props) =>
    props.score > 90
      ? colors.scoreGood
      : props.score > 50
      ? colors.scoreNotBad
      : colors.scoreBad};
`;
const RecentContent = styled.TouchableOpacity`
  /* flex: 1; */
  height: 100px;
  padding-left: 10%;
  padding-right: 10%;
  flex-direction: row;
  align-items: center;
`;

const FirstEventText = styled.Text`
  font-family: "Gyunggi-title-Bold";
  flex: 1;
  flex-direction: row;
  font-size: ${actuatedNormalize(17)};
  margin-left: 3%;
  color: #ffffff;
`;

const FirstEventScore = styled.Text`
  font-family: "Gyunggi-title-Bold";
  color: #ffffff;
  flex: 1;
  flex-direction: row;
  text-align: right;
  font-size: ${actuatedNormalize(17)};
`;

const HideView = styled.View`
  /* flex: 1; */
  /* background: rgba(255, 255, 255, 0.3); */
  /* height: 75px; */
  padding-left: 10%;
  padding-right: 10%;
  flex-direction: column;
  align-items: center;
  display: none;
`;

const LOAD_HOME_DATA = gql`
  query home($token: String!) {
    home(token: $token) {
      titleSummary {
        name
        month
        score
        count
      }
      recentDrive {
        overDrive {
          carNumber
          route
          eventName
          date
          time
          eventMsg
          addressName
        }
        rapidDrive {
          carNumber
          route
          eventName
          date
          time
          eventMsg
          addressName
        }
        overRPMDrive {
          carNumber
          route
          eventName
          date
          time
          eventMsg
          addressName
        }
      }
      fine {
        route
        id
        name
        category
        date
        carNumber
        address
        price
        addDate
        addName
      }
    }
  }
`;
export default function Home() {
  const token = tokenVar();
  const { data, error, loading } = useQuery(LOAD_HOME_DATA, {
    variables: { token: token },
  });
  const [overSpeed, setOverSpeed] = useState(false);
  const [rapidDrive, setRapidDrive] = useState(false);
  const [overRPMDrive, setOverRPMDrive] = useState(false);
  const titleSummary = data?.home.titleSummary;
  const recentDrive = data?.home.recentDrive;
  const fine = data?.home.fine;
  const eventSort = (a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  };

  const sortedOverDriveArray = recentDrive?.overDrive.slice().sort(eventSort);
  const sortedRapidDriveArray = recentDrive?.rapidDrive.slice().sort(eventSort);
  const sortedOverRPMDriveArray = recentDrive?.overRPMDrive
    .slice()
    .sort(eventSort);
  const countReduce = titleSummary?.count.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});
  // const sortRouteName = recentDrive.map((d) => d.route);
  return (
    <ScreenLayout loading={loading}>
      {titleSummary?.count.length > 0 ? (
        <>
          <SummaryContainer>
            <WelcomeSubText>2021년 {titleSummary?.month[2]}</WelcomeSubText>
            <WelcomeScoreText score={titleSummary?.score[2]}>
              {titleSummary?.score[2]} 점
            </WelcomeScoreText>
            {countReduce ? (
              Object.entries(countReduce).map((d, i) => (
                <RouteSummaryContainer key={i}>
                  <TabIcon iconName={"bus"} color={colors.red2} size={18} />
                  <RouteNameText>{d[0]}</RouteNameText>
                  <RouteCountText>{d[1]}회</RouteCountText>
                </RouteSummaryContainer>
              ))
            ) : (
              <></>
            )}
          </SummaryContainer>
          <GraphContainer>
            <LineChart
              data={{
                labels: titleSummary?.month,
                datasets: [
                  {
                    data: titleSummary?.score,
                  },
                ],
              }}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              fromZero={true}
              yAxisSuffix="점"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(96, 111, 228, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "5",
                  strokeWidth: "2",
                  stroke: "rgb(255, 255, 255)",
                },
              }}
              bezier
              withInnerLines={false}
              withOuterLines={false}
              withHorizontalLabels={false}
              renderDotContent={({ x, y, index, indexData }) => (
                <TextSVG
                  key={index}
                  x={x - 5}
                  y={y - 10}
                  fill="rgb(255, 255, 255)"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {indexData}점
                </TextSVG>
              )}
              style={{
                marginVertical: 0,
                paddingTop: 25,
                paddingLeft: 50,
                marginBottom: 10,
              }}
            />
            {/* {recentDrive?.map((d) => (
            <RecentContent key={d.startDate}>
              20210514 / {d.startDate} ~ {d.endDate} / {d.score}점
            </RecentContent>
          ))} */}
          </GraphContainer>
          <DetailContainer>
            <RecentContent onPress={() => setOverSpeed(!overSpeed)}>
              <TabIcon iconName={"rocket"} color={"#FFFFFF"} />
              <FirstEventText>과속</FirstEventText>
              <FirstEventScore>
                {recentDrive?.overDrive.length}회
              </FirstEventScore>
            </RecentContent>
            <HideView style={{ display: overSpeed ? "flex" : "none" }}>
              {sortedOverDriveArray?.map((d, i) => (
                <TextContainer
                  key={i}
                  car={d.carNumber}
                  date={d.date}
                  time={d.time}
                  addressName={d.addressName}
                  eventMsg={d.eventMsg}
                  route={d.route}
                  isLast={i === sortedOverDriveArray.length - 1 ? true : false}
                />
              ))}
            </HideView>

            <RecentContent onPress={() => setRapidDrive(!rapidDrive)}>
              <TabIcon iconName={"arrow-up-circle"} color={"#FFFFFF"} />
              <FirstEventText>급가속</FirstEventText>
              <FirstEventScore>
                {recentDrive?.rapidDrive.length}회
              </FirstEventScore>
            </RecentContent>
            <HideView style={{ display: rapidDrive ? "flex" : "none" }}>
              {sortedRapidDriveArray?.map((d, i) => (
                <TextContainer
                  key={i}
                  car={d.carNumber}
                  date={d.date}
                  time={d.time}
                  addressName={d.addressName}
                  eventMsg={d.eventMsg}
                  route={d.route}
                  isLast={i === sortedRapidDriveArray.length - 1 ? true : false}
                />
              ))}
            </HideView>
            <RecentContent onPress={() => setOverRPMDrive(!overRPMDrive)}>
              <TabIcon iconName={"cloud-upload"} color={"#FFFFFF"} />
              <FirstEventText>RPM 초과</FirstEventText>
              <FirstEventScore>
                {recentDrive?.overRPMDrive.length}회
              </FirstEventScore>
            </RecentContent>
            <HideView style={{ display: overRPMDrive ? "flex" : "none" }}>
              {sortedOverRPMDriveArray?.map((d, i) => (
                <TextContainer
                  key={i}
                  car={d.carNumber}
                  date={d.date}
                  time={d.time}
                  addressName={d.addressName}
                  eventMsg={d.eventMsg}
                  route={d.route}
                  isLast={
                    i === sortedOverRPMDriveArray.length - 1 ? true : false
                  }
                />
              ))}
            </HideView>
            <RecentContent>
              <TabIcon iconName={"skull"} color={"#FFFFFF"} />
              <FirstEventText>과태료</FirstEventText>
              <FirstEventScore>{fine?.length}건</FirstEventScore>
            </RecentContent>
          </DetailContainer>
        </>
      ) : (
        <WarningContainer>
          <TabIcon iconName={"warning"} color={colors.red2} size={30}></TabIcon>
          <WarningText>운행 데이터가 없습니다!</WarningText>
        </WarningContainer>
      )}
    </ScreenLayout>
  );
}
// 첫 화면 -  / 월별 평균점수, 순위 /, 휴무일정표 chart.js
// 공지사항, 알림,
// 차량 일보 대체
