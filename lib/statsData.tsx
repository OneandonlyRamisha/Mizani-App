import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { GLOBAL_STYLES } from "./globalStyles";
import React from "react";
import { Profile } from "../types/profile";

export function getStatsData(stats: Profile["stats"]) {
  return [
    // {
    //   color: GLOBAL_STYLES.accentColor,
    //   backgroundColor: [
    //     GLOBAL_STYLES.accentColor10,
    //     GLOBAL_STYLES.accentColor5,
    //   ],
    //   icon: (
    //     <Ionicons name="diamond" size={24} color={GLOBAL_STYLES.accentColor} />
    //   ),
    //   name: "Overall",
    //   stat: stats.overall,
    // },
    {
      color: GLOBAL_STYLES.orange,
      backgroundColor: GLOBAL_STYLES.disciplineCardBgColor,
      icon: (
        <MaterialCommunityIcons
          name="all-inclusive"
          size={24}
          color={GLOBAL_STYLES.accentColor}
        />
      ),
      name: "Discipline",
      stat: stats.discipline,
    },
    {
      color: GLOBAL_STYLES.red,
      backgroundColor: GLOBAL_STYLES.faithCardBgColor,
      icon: (
        <MaterialCommunityIcons
          name="cross-bolnisi"
          size={24}
          color={GLOBAL_STYLES.accentColor}
        />
      ),
      name: "Faith",
      stat: stats.faith,
    },

    {
      color: GLOBAL_STYLES.blue,
      backgroundColor: GLOBAL_STYLES.focusCardBgColor,
      icon: (
        <MaterialCommunityIcons
          name="lock"
          size={24}
          color={GLOBAL_STYLES.accentColor}
        />
      ),
      name: "Focus",
      stat: stats.focus,
    },
    {
      color: GLOBAL_STYLES.green,
      backgroundColor: GLOBAL_STYLES.fitnessCardBgColor,
      icon: (
        <MaterialCommunityIcons
          name="arm-flex"
          size={24}
          color={GLOBAL_STYLES.accentColor}
        />
      ),
      name: "Fitness",
      stat: stats.fitness,
    },
    {
      color: GLOBAL_STYLES.purple,
      backgroundColor: GLOBAL_STYLES.wisdomCardBgColor,
      icon: (
        <MaterialCommunityIcons
          name="head"
          size={24}
          color={GLOBAL_STYLES.accentColor}
        />
      ),

      name: "Wisdom",
      stat: stats.wisdom,
    },
    {
      color: "#00E676",
      backgroundColor: GLOBAL_STYLES.wisdomCardBgColor,
      icon: (
        <MaterialCommunityIcons
          name="finance"
          size={24}
          color={GLOBAL_STYLES.accentColor}
        />
      ),
      name: "Finance",
      stat: stats.finance,
    },
  ];
}
