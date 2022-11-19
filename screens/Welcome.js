import React, { useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { isLoggedInVar, logUserIn } from "../apollo";
import { colors } from "../colors";
import AuthButton from "../components/AuthButton";
import AuthLayout from "../components/AuthLayout";
import { TextInput } from "../components/AuthShared";

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 15px;
  text-align: center;
`;

const LoginBox = styled.View`
  background-color: rgb(25, 31, 44);
  border-color: rgba(207, 207, 207, 0.3);
  border-width: 1px;
  border-radius: 18px;
  box-shadow: rgba(0, 0, 0, 0.04) -1px 1px 1px;
  padding: 20px;
  margin: 30px;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(id: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Welcome({ navigation, route: { params } }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      password: params?.password,
      username: params?.username,
    },
  });
  const passwordRef = useRef();
  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
    } else {
      alert("사원번호 혹은 비밀번호가 잘못됐습니다");
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("username", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);

  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogIn = () => navigation.navigate("LogIn");
  return (
    <AuthLayout>
      {/* <AuthButton text="회원가입" disabled={true} onPress={goToCreateAccount} /> */}
      {/* <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>로그인</LoginLink>
      </TouchableOpacity> */}
      <LoginBox>
        <TextInput
          placeholder="사원번호"
          value={watch("username")}
          returnKeyType="next"
          autoCapitalize="none"
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onSubmitEditing={() => onNext(passwordRef)}
          onChangeText={(text) => setValue("username", text)}
        />
        <TextInput
          value={watch("password")}
          ref={passwordRef}
          placeholder="비밀번호"
          secureTextEntry
          returnKeyType="done"
          lastOne={true}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onSubmitEditing={handleSubmit(onValid)}
          onChangeText={(text) => setValue("password", text)}
        />
        <AuthButton
          text="로그인"
          loading={loading}
          disabled={!watch("username") || !watch("password")}
          onPress={handleSubmit(onValid)}
        />
      </LoginBox>
    </AuthLayout>
  );
}
