import { NavigationContainer } from "@react-navigation/native";

import { AccountNavigator } from "./account.navigation";
import { AppNavigator } from "./app.navigation";

export const Navigation = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
