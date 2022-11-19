import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar, Text } from "react-native";
let customFonts = {
  "Gyunggi-batang-Bold": require("./assets/fonts/ggbatangOTF_Bold.otf"),
  "Gyunggi-batang-Regular": require("./assets/fonts/ggbatangOTF_Regular.otf"),
  "Gyunggi-title-Bold": require("./assets/fonts/ggtitleOTF_Bold.otf"),
  "Gyunggi-title-Light": require("./assets/fonts/ggtitleOTF_Light.otf"),
};
export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preloadAssets = () => {
    const fontToLoad = [Ionicons.font, customFonts];
    const fontPromises = fontToLoad.map((font) => Font.loadAsync(font));

    const imagesToLoad = [];

    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));

    return Promise.all([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAssets();
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  } else {
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          style="dark"
        />
      </ApolloProvider>
    );
  }
}
