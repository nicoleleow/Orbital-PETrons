import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { authentication, db } from "../../../firebase/firebase-config";
// import { AccountContainer } from "./account.style";
import { colors } from "../../infrastructure/theme/colors";

const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../assets/home_bg.jpg"),
})`
  flex: 1;
  align-items: center;
`;

const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
  align-items: center;
`;

const Title = styled(Text)`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.monospace};
  margin-top: ${(props) => props.theme.space[8]};
`;

const Instructions = styled(Text)`
  color: black;
  padding: ${(props) => props.theme.space[5]};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

const FieldInput = styled(TextInput)`
  margin-top: ${(props) => props.theme.space[5]};
  margin-bottom: ${(props) => props.theme.space[6]};
  border-bottom-width: 1px;
  border-bottom-color: black;
  padding-bottom: 5px;
  width: 300px;
`;

const AuthButton = styled(Button).attrs({ color: colors.button.primary })`
  padding: ${(props) => props.theme.space[2]};
  margin-top: ${(props) => props.theme.space[2]};
`;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export const ForgetPasswordPage = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const forgetPassword = () => {
    sendPasswordResetEmail(authentication, email)
      .then(() => {
        Alert.alert("Email sent to " + email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(error.message.slice(22, -2));
      });
  };
  return (
    <DismissKeyboard>
      <AccountBackground>
        <Title>Forgot Password?</Title>
        <AccountContainer>
          <Instructions>
            Enter your email and we'll send you a link to reset your password.
          </Instructions>
          <FieldInput
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor="black"
            onChangeText={(text) => setEmail(text)}
          ></FieldInput>
        </AccountContainer>
        <AuthButton
          icon="sticker-check-outline"
          mode="contained"
          onPress={forgetPassword}
        >
          Submit
        </AuthButton>
        <AuthButton
          icon="account-arrow-left"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Back to login
        </AuthButton>
      </AccountBackground>
    </DismissKeyboard>
  );
};
