import React from "react";
import { ActivityIndicator, View, ScrollView } from "react-native";
import { colors } from "../colors";

export default function ScreenLayout({ loading, children }) {
  return (
    <ScrollView
      style={{
        backgroundColor: colors.background,
        flexGrow: 1,
        padding: 30,
        paddingTop: 50,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        paddingBottom: 50,
      }}
    >
      {loading ? (
        <ActivityIndicator color={colors.accent} size="large" />
      ) : (
        children
      )}
    </ScrollView>
  );
}
