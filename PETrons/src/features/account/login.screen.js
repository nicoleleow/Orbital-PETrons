import React, { useState, useContext } from "react";
import { Text } from "react-native-paper";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  AuthInput,
} from "./account.style";
import { Spacer } from "../../components/spacer/spacer.component";
import { authentication } from "../../../firebase/firebase-config";

export const LoginScreen = ({ navigation }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignInUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        setIsSignedIn(true);
        navigation.navigate("Home");
      })
      .catch((re) => {
        console.log(re);
      });
  };

  const SignOutUser = () => {
    signOut(authentication)
      .then((re) => {
        setIsSignedIn(false);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <AccountBackground>
      <Text>Welcome Back!</Text>
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
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            secure
            onChangeText={(text) => setPassword(text)}
          />
        </Spacer>
        {isSignedIn === true ? (
          <Spacer size="large">
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={SignOutUser}
            >
              Logout
            </AuthButton>
          </Spacer>
        ) : (
          <Spacer size="large">
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={SignInUser}
            >
              Login
            </AuthButton>
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
