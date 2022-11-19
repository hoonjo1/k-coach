import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../../screens/Home";
import TabIcon from "../../components/nav/TabIcon";
import { colors } from "../../colors";

const Tabs = createMaterialTopTabNavigator();

export default function HomeTabNav() {
  const dateFormatter = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return `${year}년 ${month}월`;
  };
  const paramsFormatter = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (month < 10) {
      return `${year}0${month}`;
    } else {
      return `${year}${month}`;
    }
  };

  const date = new Date();
  const editDay = new Date(date.setDate(1));
  const dateArray = [
    dateFormatter(new Date(editDay.setMonth(editDay.getMonth()))),
    dateFormatter(new Date(editDay.setMonth(editDay.getMonth() - 1))),
    dateFormatter(new Date(editDay.setMonth(editDay.getMonth() - 1))),
  ];
  const params = [
    paramsFormatter(new Date(editDay.setMonth(editDay.getMonth() + 2))),
    paramsFormatter(new Date(editDay.setMonth(editDay.getMonth() - 1))),
    paramsFormatter(new Date(editDay.setMonth(editDay.getMonth() - 1))),
  ];
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        showLabel: true,
        style: {
          borderTopColor: "rgba(255,255,255,0.1)",
          backgroundColor: colors.background,
          justifyContent: "flex-end",
          height: 50,
        },
        indicatorStyle: {
          backgroundColor: colors.accent,
        },
      }}
    >
      {dateArray.map((d, i) => (
        <Tabs.Screen
          key={i}
          name={d}
          component={Home}
          initialParams={{ date: params[i] }}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon iconName={"home"} color={color} focused={focused} />
            ),
          }}
        />
      ))}
    </Tabs.Navigator>
  );
}
