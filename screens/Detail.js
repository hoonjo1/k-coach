import React from "react";
import { Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function Detail() {
  return (
    <WebView
      source={{
        uri: "https://kjbus-group.com/dashboard/20210515/41008007/1154/1/181462",
      }}
      style={{ marginTop: 20 }}
    />
  );
}
