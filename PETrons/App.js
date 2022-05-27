import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Text, View, Platform } from "react-native";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { Mainpage } from "./src/features/mainpage/mainpage";
import { theme } from "./src/infrastructure/theme";
import { AppNavigator } from "./src/infrastructure/navigation/app.navigation";

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppNavigator>
          <Mainpage />
        </AppNavigator>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
