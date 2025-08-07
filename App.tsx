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
    console.log("creteing database");
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
      stats TEXT,           -- JSON stringified object
      milestones TEXT       -- JSON stringified array
    );
  `);

    // Habit table
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS habits (
      id TEXT PRIMARY KEY,
      name TEXT,
      createDate TEXT,
      completed TEXT,       -- JSON stringified array
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
// 1. Update Milestones For Disicipline
// 2. Update Discipline logic so that it gets poisnts based on streak for if user completes all the tasks he gets streaks and based on that streaks discipline updates and if they break streak then they loose discipline
// 4. Add Important Details to intro Screens take it form pillar arise and others
// 5. Make so that from calendar people cant mark habits as completed
// 6. add Finances to loading page
// 7. Update so you use same button for everything and same progressbar make it resuable
// 8. After loading page fix stats page
// 9. Add Payment shit
// 11. Add SQLite
// 12. Fix Radar Chart Being Fucked up
// 13. Improve design of btn make it better
// 14. Move Functions into libs and call it to functions from there
// 16. Add Animations
