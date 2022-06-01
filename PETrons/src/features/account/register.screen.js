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
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const registerUser = () => {
    const inputs = [email, password, repeatedPassword, username];
    if (password !== repeatedPassword) {
      setErrorMessage("Error: Passwords do not match!");
      setErrorDisplay(true);
      return;
    }
    createUserWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        console.log(re);
        setIsSignedIn(true);
        navigation.navigate("Homepage");
      })
      .catch((re) => {
        console.log(re);
        setErrorDisplay(true);
        if (inputs.includes("") || inputs.includes(undefined)) {
          setErrorMessage("Error: Please fill in all fields");
        }
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
            autoCapitalize="none"
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
        {errorDisplay && (
          <Spacer size="large">
            <Text style={{ color: "red" }}>{errorMessage}</Text>
          </Spacer>
        )}
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
