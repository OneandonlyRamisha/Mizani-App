import { View } from "react-native";
import MainScreen from "./screens/mainScreens/mainScreen";
import { StatusBar } from "expo-status-bar";
import { HabitProvider } from "./store/habits";
import IntroScreen from "./screens/introScreens/introScreen";
import { ProfileProvider, useProfile } from "./store/profile";
import { useFonts } from "expo-font";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

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

  const createDbIfNeeded = async (db: SQLiteDatabase) => {
    console.log("creating database");

    // Profile table
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      level INTEGER,
      currentXP INTEGER,
      totalXP INTEGER,
      age TEXT,
      paid INTEGER,
      streak TEXT,          -- JSON stringified array of strings
      stats TEXT,           -- JSON stringified object
      milestones TEXT,      -- JSON stringified array
      lastDisciplineUpdate TEXT,
      lastUpdateDate TEXT,
      pointsAwardedDates TEXT  -- JSON stringified array of strings
    );
  `);

    // Habit table
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS habits (
      id TEXT PRIMARY KEY,
      name TEXT,
      createDate TEXT,
      completed TEXT,       -- JSON stringified array of strings
      streak INTEGER,
      difficulty TEXT,
      repeat TEXT,          -- JSON stringified object
      category TEXT
    );
  `);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <SQLiteProvider databaseName={"appDatabase.db"} onInit={createDbIfNeeded}>
        <ProfileProvider>
          <HabitProvider>
            <AppContent />
          </HabitProvider>
        </ProfileProvider>
      </SQLiteProvider>
    </View>
  );
}

// tasks
// 11. Add SQLite
// 1. Update Milestones For Disicipline
// 2. add notifiactions
// 9. Add Payment shit
// 12. Fix Radar Chart Being Fucked up
// 14. Move Functions into libs and call it to functions from there
