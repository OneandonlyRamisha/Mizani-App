import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSQLiteContext } from "expo-sqlite";

import { Profile } from "../types/profile";
import { MILESTONES_DATA } from "../lib/milestonesData";
import { persistProfile } from "../lib/profileStorage";

type ProfileContextType = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const initialProfile: Profile = {
  name: "",
  milestones: MILESTONES_DATA,
  level: 1,
  currentXP: 0,
  totalXP: 0,
  age: "18-24",
  paid: false,
  streak: [],
  stats: {
    overall: 0,
    discipline: 0,
    focus: 0,
    wisdom: 0,
    fitness: 0,
    faith: 0,
    finance: 0,
  },
  pointsAwardedDates: [],
};

export function ProfileProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [profile, setProfile] = useState<Profile>(initialProfile);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const row = await db.getFirstAsync<any>("SELECT * FROM profile");
        if (!isMounted) return;

        if (row) {
          setProfile({
            name: row.name ?? initialProfile.name,
            level: row.level ?? initialProfile.level,
            currentXP: row.currentXP ?? initialProfile.currentXP,
            totalXP: row.totalXP ?? initialProfile.totalXP,
            age: row.age ?? initialProfile.age,
            paid: !!row.paid,
            streak: safelyParseJson(row.streak, []),
            stats: safelyParseJson(row.stats, initialProfile.stats),
            milestones: safelyParseJson(row.milestones, MILESTONES_DATA),
            pointsAwardedDates: safelyParseJson(row.pointsAwardedDates, []),
            lastDisciplineUpdate: row.lastDisciplineUpdate || undefined,
            lastUpdateDate: row.lastUpdateDate || undefined,
          });
        } else {
          await persistProfile(db, initialProfile);
          if (isMounted) {
            setProfile(initialProfile);
          }
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [db]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

function safelyParseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error("Failed to parse profile value:", error);
    return fallback;
  }
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
