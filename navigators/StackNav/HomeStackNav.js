import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SvgComponent from "../../components/SvgComponent";
import Home from "../../screens/Home";
import DriveTopNav from "../DriveTopNav";
import HomeTabNav from "../TabsNav/HomeTabNav";
import { colors } from "../../colors";

const Stack = createStackNavigator();

export default function HomeStackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Search"
        options={{
          headerStyle: { backgroundColor: colors.header },
          title: <SvgComponent />,
        }}
        component={HomeTabNav}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
