import { View } from "react-native";
import MainScreen from "./screens/mainScreens/mainScreen";
import { StatusBar } from "expo-status-bar";
import { HabitProvider } from "./store/habits";
import IntroScreen from "./screens/introScreens/introScreen";
import { ProfileProvider, useProfile } from "./store/profile";
import { useFonts } from "expo-font";

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
      <ProfileProvider>
        <HabitProvider>
          <AppContent />
        </HabitProvider>
      </ProfileProvider>
    </View>
  );
}

// Tasks
// 1. Update Streak logic that when you remove todays completed and redo it still has to keep the streak
// 2. Update streak for custom dates
// 3. Update Modal to make it look better
// 4. Add SQLite
// 5. Add Local Notifications
// 6. Add Payments
// bonus: when milestone is acheived make it apprear as a pop up
