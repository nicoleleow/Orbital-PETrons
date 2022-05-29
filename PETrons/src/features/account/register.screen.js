import React, { useState } from "react";
import { Text } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";

import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  AuthInput,
  SubTitle,
} from "./account.style";

import { Spacer } from "../../components/spacer/spacer.component";
import { authentication } from "../../../firebase/firebase-config";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const registerUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        console.log(re);
        setIsSignedIn(true);
        navigation.navigate("Home");
      })
      .catch((re) => {
        console.log(re);
      });
  };

  return (
    <AccountBackground>
      <SubTitle>Create An Account</SubTitle>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <Spacer size="large">
          <AuthInput
            label="Username"
            value={username}
            textContentType="username"
            secureTextEntry
            autoCapitalize="none"
            secure
            onChangeText={(text) => setUsername(text)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            secure
            onChangeText={(text) => setPassword(text)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            secure
            onChangeText={(text) => setRepeatedPassword(text)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthButton icon="email" mode="contained" onPress={registerUser}>
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
