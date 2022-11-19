import React from "react";
import {
  Keyboard,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import { colors } from "../colors";

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.background};
  /* align-items: center; */
  /* padding: 0px 20px; */
`;

const Logo = styled.Image`
  max-width: 70%;
  width: 100%;
  height: 100px;
  margin: 0 auto;
  margin-bottom: 60%;
  margin-top: 30%;
`;

export default function AuthLayout({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === "web"}
    >
      <Container>
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <Logo
            resizeMode="contain"
            source={require("../assets/loginlogo.png")}
          ></Logo>
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
