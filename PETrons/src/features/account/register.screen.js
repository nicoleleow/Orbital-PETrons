import React, { useState } from "react";
import { Text } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  View,
} from "react-native";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore/lite";

import {
  AccountBackground,
  AccountContainer,
  ProceedButton,
  AuthInput,
  SubTitle,
  SubmitButton,
} from "./account.style";
import { Spacer } from "../../components/spacer/spacer.component";
import { authentication, db } from "../../../firebase/firebase-config";
import { colors } from "../../infrastructure/theme/colors";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const registerUser = async () => {
    const inputs = [email, password, repeatedPassword, username];
    const querySnapshot = await getDocs(collection(db, "userinfo"));
    let repeatedUsername;
    querySnapshot.forEach((doc) => {
      if (doc.data().username === username) {
        repeatedUsername = true;
      }
    });
    if (inputs.includes("") || inputs.includes(undefined)) {
      setErrorMessage("Please fill in all fields");
      setErrorDisplay(true);
    } else if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters!");
      setErrorDisplay(true);
    } else if (password !== repeatedPassword) {
      setErrorMessage("Passwords do not match!");
      setErrorDisplay(true);
    } else if (repeatedUsername) {
      setErrorMessage("Username already taken");
      setErrorDisplay(true);
    } else {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((re) => {
          // console.log(re);
          setIsSignedIn(true);
          navigation.navigate("Login");
          addDoc(collection(db, "userinfo"), {
            username: username,
            email: email,
            profilepic: "default",
            favourites: [],
            likedPosts: [],
          });
        })
        .catch((re) => {
          // console.log(re);
          setErrorDisplay(true);
          setErrorMessage(re.message.slice(22, -2));
        });
    }
  };

  return (
    <DismissKeyboard>
      <AccountBackground>
        <SubTitle>Create An Account</SubTitle>
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
              <ProceedButton
                labelStyle={{ color: colors.button.text }}
                icon="email"
                mode="contained"
                onPress={registerUser}
              >
                Register
              </ProceedButton>
            </Spacer>
            {errorDisplay && (
              <Spacer size="large">
                <Text style={{ color: "red" }}>Error: {errorMessage}</Text>
              </Spacer>
            )}
          </AccountContainer>
          <View style={{ alignItems: "center" }}>
            <Spacer size="large">
              <SubmitButton
                labelStyle={{ color: colors.button.text }}
                mode="contained"
                onPress={() => navigation.goBack()}
              >
                Back
              </SubmitButton>
            </Spacer>
          </View>
        </ScrollView>
      </AccountBackground>
    </DismissKeyboard>
  );
};
