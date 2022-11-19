import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar, logUserIn } from "../apollo";
import AuthButton from "../components/AuthButton";
import AuthLayout from "../components/AuthLayout";
import { TextInput } from "../components/AuthShared";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(id: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function LogIn({ route: { params } }) {
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
    }
  };
  const [logInMutation, { loading, error }] = useMutation(LOGIN_MUTATION, {
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

  return (
    <View>
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
        text="Log In"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </View>
  );
}
