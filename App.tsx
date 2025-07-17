import { View } from "react-native";
import { useState } from "react";
import MainScreen from "./screens/mainScreens/mainScreen";
import { StatusBar } from "expo-status-bar";
import { HabitProvider } from "./store/habits";

export default function App() {
  const [paid, setpaid] = useState<boolean>(true);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <HabitProvider>
        <MainScreen />
      </HabitProvider>
    </View>
  );
}
