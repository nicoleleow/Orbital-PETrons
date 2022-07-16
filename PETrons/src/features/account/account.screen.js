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

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <Title>PETrons</Title>
      <Caption>No Better Option Than Adoption</Caption>
      <AccountContainer>
        <ProceedButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </ProceedButton>
        <Spacer size="large">
          <ProceedButton
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
