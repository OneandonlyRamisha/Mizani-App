import { View } from "react-native";
import MainScreen from "./screens/mainScreens/mainScreen";
import { StatusBar } from "expo-status-bar";
import { HabitProvider } from "./store/habits";
import IntroScreen from "./screens/introScreens/introScreen";
import { ProfileProvider, useProfile } from "./store/profile";
import { useFonts } from "expo-font";
import * as SQLite from "expo-sqlite";
import { DatabaseProvider } from "./lib/SQLite/databaseProvider";

function AppContent() {
  const { profile } = useProfile();

  return profile.paid ? <MainScreen /> : <IntroScreen />;
}
export default function App() {
  const [fontsLoaded] = useFonts({
    "Cinzel-Regular": require("./assets/fonts/Cinzel-Regular.ttf"),
    "Cinzel-Medium": require("./assets/fonts/Cinzel-Medium.ttf"),
    "Cinzel-Semi-Bold": require("./assets/fonts/Cinzel-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <DatabaseProvider>
        <ProfileProvider>
          <HabitProvider>
            <AppContent />
          </HabitProvider>
        </ProfileProvider>
      </DatabaseProvider>
    </View>
  );
}

// tasks
// 1. Update Milestones For Disicipline
// 2. add notifiactions
// 9. Add Payment shit
// 12. Fix Radar Chart Being Fucked up
// 14. Move Functions into libs and call it to functions from there
