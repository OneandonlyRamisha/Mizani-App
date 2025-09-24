import React, { ReactNode, useEffect } from "react";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";

export function DatabaseProvider({ children }: { children: ReactNode }) {
  return (
    <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
      {children}
    </SQLiteProvider>
  );
}

async function migrateDbIfNeeded(db: any) {
  // Create Habits table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS habits (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      createDate TEXT,
      completed TEXT,
      streak INTEGER,
      difficulty TEXT,
      repeat TEXT,
      category TEXT
    );
  `);

  // Create Profile table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      level INTEGER,
      currentXP INTEGER,
      totalXP INTEGER,
      age TEXT,
      paid INTEGER,
      streak TEXT,
      stats TEXT,
      milestones TEXT,
      lastDisciplineUpdate TEXT,
      lastUpdateDate TEXT,
      pointsAwardedDates TEXT
    );
  `);
}
