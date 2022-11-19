import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import styled from "styled-components";
import { tokenVar } from "../apollo";
import { colors } from "../colors";
import OperationalContainer from "../components/OperationalConatiner";
import ScreenLayout from "../components/ScreenLayout";
import Detail from "../components/DetailContainer";
import { actuatedNormalize } from "../fontSize";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";
const DAILY_DATA = gql`
  query schedule($token: String!, $date: String!) {
    schedule(token: $token, date: $date) {
      haveDataList
      data {
        ID
        date
        score
        carNumber
        route
        cycle
        start
        end
        active
        tachoStatus
        eventList {
          eventName
          date
          time
          beforeKmh
          nowKmh
          rpm
          isBreak
          latitude
          longitude
          addressName
          eventMsg
        }
        overSpeedCount
        overRapidAccelCount
        idlingTime
        total
      }
    }
  }
`;

const CalendarContainer = styled.View`
  background-color: ${colors.boxBackground};
  border-color: rgba(207, 207, 207, 0.3);
  border-width: 1px;
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.04) -1px 1px 1px;
  margin-top: 30px;
  align-items: center;
`;

const Container = styled.ScrollView`
  width: 100%;
`;

const DriveContainer = styled.View`
  background-color: ${colors.boxBackground};
  border-color: rgba(207, 207, 207, 0.3);
  border-width: 1px;
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.04) -1px 1px 1px;
  margin-top: 15px;
  padding: 15px;
  align-items: center;
`;

const NoneData = styled.Text`
  color: #ffffff;
  font-size: ${actuatedNormalize(14)};
`;

export default function Schedule({ navigation }) {
  const today = new Date();
  const dateFomatter = (d) => {
    if (d < 10) {
      return "0" + d;
    }
    return d;
  };
  const yyyymmdd =
    today.getFullYear() +
    "-" +
    dateFomatter(today.getMonth() + 1) +
    "-" +
    dateFomatter(today.getDate());
  const token = tokenVar();
  const [date, setDate] = useState(yyyymmdd);
  const [press, setPress] = useState([false, false]);
  const [cycle, setCycle] = useState();
  const onPress = (e) => {
    console.log(i);
  };
  const { data, error, loading } = useQuery(DAILY_DATA, {
    variables: { token: token, date: date },
  });

  const markerArray = data?.schedule?.haveDataList;
  const markerObj = {};
  markerArray?.map((d) => {
    markerObj[d] = {
      selected: d === date ? true : false,
      marked: true,
      selectedColor: d === date ? "lightblue" : "",
    };
  });
  const recentDrive = data?.schedule.data;
  useEffect(() => {
    console.log("re-rendering");
  }, [date]);
  return (
    <ScreenLayout loading={loading}>
      <CalendarContainer>
        <Calendar
          current={date}
          markedDates={markerObj}
          minDate={"2021-01-01"}
          maxDate={"2021-12-31"}
          onDayPress={(day) => {
            setDate(day.dateString);
          }}
          onDayLongPress={(day) => {
            console.log("selected day", day);
          }}
          monthFormat={"yyyy MM"}
          onMonthChange={(month) => {
            setDate(month.dateString);
          }}
          // hideArrows={true}
          // renderArrow={(direction) => <Arrow />}
          hideExtraDays={true}
          disableMonthChange={true}
          firstDay={1}
          hideDayNames={false}
          showWeekNumbers={false}
          onPressArrowLeft={(substractMonth) => substractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          disableArrowLeft={false}
          disableArrowRight={false}
          disableAllTouchEventsForDisabledDays={true}
          style={{
            width: Dimensions.get("window").width - 80,
          }}
          theme={{
            arrowColor: colors.accent,
            backgroundColor: colors.background,
            calendarBackground: colors.boxBackground,
            textSectionTitleColor: colors.accent,
            textSectionTitleDisabledColor: "#84817a",
            selectedDayTextColor: "#8d8d8d",
            todayTextColor: colors.accent,
            textMonthFontWeight: "bold",
            dayTextColor: colors.font,
            monthTextColor: colors.font,
          }}
        />
      </CalendarContainer>
      <Container>
        <DriveContainer>
          {recentDrive?.length > 0 ? (
            recentDrive.map((d, i) => (
              <TouchableOpacity
                key={`TO${i}`}
                // onPress={() => navigation.navigate("Detail", { screen: "Detail" })}
              >
                <OperationalContainer
                  data={d}
                  isLast={i === recentDrive.length - 1 ? true : false}
                />
                <Detail data={d} />
              </TouchableOpacity>
            ))
          ) : (
            <NoneData>데이터가 없습니다. 😢</NoneData>
          )}
        </DriveContainer>
      </Container>
    </ScreenLayout>
  );
}
