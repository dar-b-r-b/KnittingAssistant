import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Counter } from "./Counter";
import { Home } from "./Home";
import { Tools } from "./Tools";
import { Yarns } from "./Yarns";
import { DensityCalc } from "./DensityCalc";
import { theme } from "./theme";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Главная" component={Home}></Stack.Screen>
          <Stack.Screen name="Счетчик" component={Counter} />
          <Stack.Screen name="Калькулятор" component={DensityCalc} />
          <Stack.Screen name="Инструменты" component={Tools}></Stack.Screen>
          <Stack.Screen name="Пряжа" component={Yarns}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
