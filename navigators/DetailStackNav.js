import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Schedule from "../screens/Schedule";
import Detail from "../screens/Detail";
import SvgComponent from "../components/SvgComponent";
import { colors } from "../colors";

const Stack = createStackNavigator();

export default function DetailStackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Search"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.background },
          title: <SvgComponent />,
        }}
        component={Search}
      ></Stack.Screen>
      <Stack.Screen name="Detail" component={Detail}></Stack.Screen>
    </Stack.Navigator>
  );
}
