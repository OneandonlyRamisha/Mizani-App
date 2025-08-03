import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { GLOBAL_STYLES } from "./globalStyles";

export const PAYWALL_BENEFITS_DATA = [
  {
    header: "Battle-Tested Habit System",
    subHeader: "Ancient wisdom meets modern science",
    icon: <Feather name="target" size={24} color={GLOBAL_STYLES.accentColor} />,
  },
  {
    header: "Warrior Leaderboards",
    subHeader: "Compete with fellow spartans globally",
    icon: (
      <MaterialCommunityIcons
        name="crown-outline"
        size={24}
        color={GLOBAL_STYLES.accentColor}
      />
    ),
  },
  {
    header: "Streak Multipliers",
    subHeader: "Exponential rewards for consistency",
    icon: <Feather name="clock" size={24} color={GLOBAL_STYLES.accentColor} />,
  },
  {
    header: "Elite Community Access",
    subHeader: "Private brotherhood of discipline",
    icon: <Feather name="shield" size={24} color={GLOBAL_STYLES.accentColor} />,
  },
];
