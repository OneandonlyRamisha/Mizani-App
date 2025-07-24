import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { GLOBAL_STYLES } from "./globalStyles";
import React from "react";
import { Profile } from "../types/profile";

export function getStatsData(stats: Profile["stats"]) {
  return [
    {
      color: GLOBAL_STYLES.accentColor,
      backgroundColor: [
        GLOBAL_STYLES.accentColor10,
        GLOBAL_STYLES.accentColor5,
      ],
      icon: (
        <Ionicons name="diamond" size={34} color={GLOBAL_STYLES.accentColor} />
      ),
      name: "Overall",
      stat: stats.overall,
    },
    {
      color: GLOBAL_STYLES.red,
      backgroundColor: GLOBAL_STYLES.faithCardBgColor,
      icon: (
        <MaterialCommunityIcons
          name="cross-bolnisi"
          size={34}
          color={GLOBAL_STYLES.red}
        />
      ),
      name: "Faith",
      stat: stats.faith,
    },

    {
      color: GLOBAL_STYLES.orange,
      backgroundColor: GLOBAL_STYLES.disciplineCardBgColor,
      icon: (
        <Ionicons
          name="infinite-sharp"
          size={34}
          color={GLOBAL_STYLES.orange}
        />
      ),
      name: "Discipline",
      stat: stats.discipline,
    },
    {
      color: GLOBAL_STYLES.blue,
      backgroundColor: GLOBAL_STYLES.focusCardBgColor,
      icon: <Fontisto name="locked" size={34} color={GLOBAL_STYLES.blue} />,
      name: "Focus",
      stat: stats.focus,
    },
    {
      color: GLOBAL_STYLES.green,
      backgroundColor: GLOBAL_STYLES.healthCardBgColor,
      icon: <Ionicons name="fitness" size={34} color={GLOBAL_STYLES.green} />,
      name: "Health",
      stat: stats.health,
    },
    {
      color: GLOBAL_STYLES.purple,
      backgroundColor: GLOBAL_STYLES.wisdomCardBgColor,
      icon: (
        <MaterialCommunityIcons
          name="brain"
          size={34}
          color={GLOBAL_STYLES.purple}
        />
      ),
      name: "Wisdom",
      stat: stats.wisdom,
    },
  ];
}
