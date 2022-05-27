import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

import { Spacer } from "../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountContainer,
  AuthButton,
} from "./account.style";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="email"
            color="black"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
