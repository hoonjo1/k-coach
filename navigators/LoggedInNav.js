import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Schedule from "../screens/Schedule";
import Profile from "../screens/Profile";
import TabIcon from "../components/nav/TabIcon";
import Home from "../screens/Home";
import { colors } from "../colors";
import BillingStackNav from "./StackNav/BillingStackNav";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: colors.accent,
        showLabel: false,
        inactiveTintColor: colors.font,
        style: {
          borderTopColor: "rgba(0,0,0,0.3)",
          backgroundColor: colors.header,
          height: 80,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="안전운행"
        component={Schedule}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"bus"} color={color} focused={focused} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="순위"
        component={Rank}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"trophy"} color={color} focused={focused} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="급여명세서"
        component={BillingStackNav}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"calculator"} color={color} focused={focused} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="배차"
        component={Dispatch}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"calendar"} color={color} focused={focused} />
          ),
        }}
      /> */}
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
