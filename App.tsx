import { View } from "react-native";
import { useState } from "react";
import MainScreen from "./screens/mainScreens/mainScreen";
import { StatusBar } from "expo-status-bar";
import { HabitProvider } from "./store/habits";
import IntroScreen from "./screens/introScreens/introScreen";
import { ProfileProvider, useProfile } from "./store/profile";

export default function App() {
  // const [paid, setPaid] = useState<boolean>(false);

  function AppContent() {
    const { profile } = useProfile();

    return profile.paid ? <MainScreen /> : <IntroScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <ProfileProvider>
        <HabitProvider>
          <AppContent />
        </HabitProvider>
      </ProfileProvider>
    </View>
  );
}
