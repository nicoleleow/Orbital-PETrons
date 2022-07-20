import React from "react";
import { Spacer } from "../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountContainer,
  ProceedButton,
  Title,
  SubTitle,
  Caption,
} from "./account.style";
import { colors } from "../../infrastructure/theme/colors";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <Title>PETrons</Title>
      <Caption>No Better Option Than Adoption</Caption>
      <AccountContainer>
        <ProceedButton
          labelStyle={{ color: colors.button.text }}
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </ProceedButton>
        <Spacer size="large">
          <ProceedButton
            labelStyle={{ color: colors.button.text }}
            icon="email"
            color="black"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </ProceedButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
