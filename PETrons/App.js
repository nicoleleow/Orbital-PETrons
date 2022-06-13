import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Text, View, Platform } from "react-native";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { NavigationContainer } from "@react-navigation/native";

import { Mainpage } from "./src/features/mainpage/mainpage.screen";
import { theme } from "./src/infrastructure/theme";
import { AppNavigator } from "./src/infrastructure/navigation/app.navigation";
import { AccountNavigator } from "./src/infrastructure/navigation/account.navigation";
import { Navigation } from "./src/infrastructure/navigation";

import { PetInfoScreen } from "./src/features/mainpage/adopt/screens/pet-info.screen";
import { AdoptPage } from "./src/features/mainpage/adopt/adopt.screen";

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
        {/* <AppNavigator>
          <Mainpage />
        </AppNavigator> */}

        {/* <PetInfoScreen /> */}
        <Navigation />
      
      
        {/* <NavigationContainer>
          <AppNavigator />
        </NavigationContainer> */}
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
