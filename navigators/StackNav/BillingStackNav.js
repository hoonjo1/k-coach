import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../../colors";
import Billing from "../../screens/Billing";
import BillingDetail from "../../screens/BillingDetail";
import { actuatedNormalize } from "../../fontSize";

const Stack = createStackNavigator();

export default function BillingStackNav(params) {
  return (
    <Stack.Navigator
      initialRouteName="Billing"
      screenOptions={{
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Billing"
        headerMode="screen"
        options={{
          headerStyle: { backgroundColor: colors.header },
          headerTitleStyle: {
            fontSize: 15,
            color: "#FFFFFF",
            fontFamily: "Gyunggi-title-Bold",
          },
          title: "급여명세서",
        }}
        component={Billing}
      ></Stack.Screen>
      <Stack.Screen
        name="BillingDetail"
        options={({ route, navigation }) => ({
          headerStyle: { backgroundColor: colors.header },
          headerTitleStyle: {
            fontSize: 14,
            color: "#FFFFFF",
            fontFamily: "Gyunggi-title-Bold",
          },
          headerTintColor: "#FFFFFF",
          headerBackTitleVisible: false,
          title: `${route.params.date.substring(
            0,
            4
          )}년 ${route.params.date.substring(5, 7)}월 ${route.params.category}`,
        })}
        component={BillingDetail}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
