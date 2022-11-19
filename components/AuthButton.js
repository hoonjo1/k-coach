import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { actuatedNormalize } from "../fontSize";

const Button = styled.TouchableOpacity`
  background-color: ${colors.inBoxBackground};
  padding: 15px 10px;
  border-radius: 10px;
  width: 100%;
  opacity: ${(props) => (props.disable ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  font-family: "Gyunggi-title-Bold";
  color: ${colors.accent};
  font-size: ${actuatedNormalize(16)};
  text-align: center;
`;

export default function AuthButton({ onPress, disabled, text, loading }) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}
