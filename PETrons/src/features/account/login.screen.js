import React, { useState, useContext } from "react";
import { Text } from "react-native-paper";
import {
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Button,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";
import styled from "styled-components/native";

import {
  AccountBackground,
  AccountContainer,
  ProceedButton,
  AuthInput,
  SubTitle,
  PressableText,
} from "./account.style";
import { Spacer } from "../../components/spacer/spacer.component";
import { authentication, db } from "../../../firebase/firebase-config";

export let adoptionList = [];

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ImagePet = styled(Image)`
  height: 130px;
  width: 150px;
`;

export const LoginScreen = ({ navigation }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const SignInUser = async () => {
    const inputs = [email, password];
    signInWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        setIsSignedIn(true);
        navigation.navigate("Homepage");
      })
      .catch((re) => {
        console.log(re);
        setErrorDisplay(true);
        if (inputs.includes("") || inputs.includes(undefined)) {
          setErrorMessage("Please fill in all fields");
        } else {
          setErrorMessage(re.message.slice(22, -2));
        }
      });
    const adoptionListCol = collection(db, "put-up-for-adoption");
    const adoptionListSnapshot = await getDocs(adoptionListCol);
    adoptionList = adoptionListSnapshot.docs.map((doc) => doc.data());
  };

  const SignOutUser = () => {
    signOut(authentication)
      .then((re) => {
        setIsSignedIn(false);
      })
      .catch((re) => {
        console.log(re);
      });
  };

  return (
    <DismissKeyboard>
      <AccountBackground>
        <SubTitle>Welcome Back!</SubTitle>
        <ImagePet source={require("../../../assets/dog.png")} />
        <ScrollView>
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
            {errorDisplay && (
              <Spacer size="large">
                <Text style={{ color: "red" }}>Error: {errorMessage}</Text>
              </Spacer>
            )}
            <View style={{ alignItems: "flex-end" }}>
              <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
                <PressableText>Forgot Password?</PressableText>
              </Pressable>
            </View>
            {isSignedIn === true ? (
              <Spacer size="large">
                <ProceedButton
                  icon="lock-open-outline"
                  mode="contained"
                  onPress={SignOutUser}
                >
                  Logout
                </ProceedButton>
              </Spacer>
            ) : (
              <Spacer size="large">
                <ProceedButton
                  icon="lock-open-outline"
                  mode="contained"
                  onPress={SignInUser}
                >
                  Login
                </ProceedButton>
              </Spacer>
            )}
            <Spacer size="small">
              <View style={{ alignItems: "center" }}>
                <Pressable onPress={() => navigation.navigate("Register")}>
                  <PressableText>Don't have an account? Sign Up</PressableText>
                </Pressable>
              </View>
            </Spacer>
          </AccountContainer>
        </ScrollView>
      </AccountBackground>
    </DismissKeyboard>
  );
};
