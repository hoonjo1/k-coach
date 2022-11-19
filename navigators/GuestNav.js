import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Profile from "../screens/Profile";
import TabIcon from "../components/nav/TabIcon";
import { View } from "react-native";
import DetailStackNav from "./DetailStackNav";
import GuestBoard from "../screens/Temp/GuestBoard";
import TimeTable from "../screens/Temp/TimeTable";
import Station from "../screens/Temp/Station";
import GuestBoardNav from "./Temp/GuestBoardNav";
import TimeTableNav from "./Temp/TimeTableNav";
import StationNav from "./Temp/StationNav";

const Tabs = createBottomTabNavigator();

export default function GuestNav() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "black",
        showLabel: false,
        style: {
          borderTopColor: "rgba(0,0,0,0.3)",
          backgroundColor: "white",
        },
      }}
    >
      <Tabs.Screen
        name="Board"
        component={GuestBoardNav}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
          title: "My home",
        }}
      />
      <Tabs.Screen
        name="TimeTable"
        component={TimeTableNav}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"time"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Station"
        component={StationNav}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"bus"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="설정"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
