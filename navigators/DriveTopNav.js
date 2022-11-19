import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Search from "../screens/Schedule";
import TabIcon from "../components/nav/TabIcon";
import Rank from "../screens/Rank";

const Tabs = createMaterialTopTabNavigator();

export default function DriveTopNav() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        showLabel: true,
        style: {
          borderTopColor: "rgba(255,255,255,0.3)",
          backgroundColor: "black",
          justifyContent: "flex-end",
          height: "10%",
        },
      }}
    >
      <Tabs.Screen
        name="일일 운행내역"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="월간 운행내역"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"bus"} color={color} focused={focused} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="순위"
        component={Rank}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"calendar"} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
