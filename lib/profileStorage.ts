import { type SQLiteDatabase } from "expo-sqlite";
import { Profile } from "../types/profile";

export async function persistProfile(
  db: SQLiteDatabase,
  profile: Profile
): Promise<void> {
  await db.runAsync(
    `INSERT OR REPLACE INTO profile
      (id, name, level, currentXP, totalXP, age, paid, streak, stats, milestones, pointsAwardedDates, lastDisciplineUpdate, lastUpdateDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      1,
      profile.name,
      profile.level,
      profile.currentXP,
      profile.totalXP,
      profile.age,
      profile.paid ? 1 : 0,
      JSON.stringify(profile.streak ?? []),
      JSON.stringify(profile.stats),
      JSON.stringify(profile.milestones),
      JSON.stringify(profile.pointsAwardedDates ?? []),
      profile.lastDisciplineUpdate ?? "",
      profile.lastUpdateDate ?? "",
    ]
  );
}
