import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderLogo from "../../components/HeaderLogo";
import TimeTable from "../../screens/Temp/TimeTable";

const Stack = createStackNavigator();

export default function TimeTableNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerBackTitleVisible: true,
        // headerTitle: true,
        // headerTransparent: true,
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="TimeTable"
        options={{
          headerShown: true,
          headerTitle: (props) => <HeaderLogo {...props} />,
          headerStyle: {
            backgroundColor: "#f1f1f1",
            borderBottomWidth: "1",
          },
        }}
        component={TimeTable}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
