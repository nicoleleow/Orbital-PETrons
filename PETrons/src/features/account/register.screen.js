import React, { useState } from "react";
import { Text } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
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
  AuthButton,
  AuthInput,
  SubTitle,
} from "./account.style";
import { Spacer } from "../../components/spacer/spacer.component";
import { authentication, db } from "../../../firebase/firebase-config";

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
              <Text style={{ color: "red" }}>Error: {errorMessage}</Text>
            </Spacer>
          )}
        </AccountContainer>
        <Spacer size="large">
          <AuthButton mode="contained" onPress={() => navigation.goBack()}>
            Back
          </AuthButton>
        </Spacer>
      </AccountBackground>
    </DismissKeyboard>
  );
};
