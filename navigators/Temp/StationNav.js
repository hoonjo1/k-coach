import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GuestBoard from "../../screens/Temp/GuestBoard";
import HeaderLogo from "../../components/HeaderLogo";
import Station from "../../screens/Temp/Station";

const Stack = createStackNavigator();

export default function StationNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: true,
        // headerTitle: true,
        // headerTransparent: true,
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Station"
        options={{
          headerShown: true,
          headerTitle: (props) => <HeaderLogo {...props} />,
          headerStyle: {
            backgroundColor: "#f1f1f1",
            borderBottomWidth: "1",
          },
        }}
        component={Station}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
