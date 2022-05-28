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
        <Spacer size="large">
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Login
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
