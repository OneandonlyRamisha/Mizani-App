// import React, {
//   createContext,
//   useReducer,
//   useContext,
//   ReactNode,
//   useState,
// } from "react";
// import { Habit } from "../types/habit";
// import { Profile } from "../types/profile";
// import { MILESTONES_DATA } from "../lib/milestonesData";

// const ProfileContext = createContext<ProfileContextType | undefined>(undefined);
// const initialProfile = {
//   name: "",
//   milestones: MILESTONES_DATA,
//   level: 1,
//   currentXP: 0,
//   totalXP: 0,
//   age: "18-24",
//   paid: false,
//   streak: [],
//   stats: {
//     overall: 0,
//     discipline: 0,
//     focus: 0,
//     wisdom: 0,
//     fitness: 0,
//     faith: 0,
//     finance: 0,
//   },
// };

// type ProfileContextType = {
//   profile: Profile;
//   setProfile: React.Dispatch<React.SetStateAction<Profile>>;
// };

// export function ProfileProvider({ children }: { children: ReactNode }) {
//   const [profile, setProfile] = useState<Profile>(initialProfile);
//   return (
//     <ProfileContext.Provider value={{ profile, setProfile }}>
//       {children}
//     </ProfileContext.Provider>
//   );
// }

// export function useProfile() {
//   const context = useContext(ProfileContext);
//   if (!context) {
//     throw new Error("useProfile must be used within a ProfileProvider");
//   }
//   return context;
// }

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Profile } from "../types/profile";
import { MILESTONES_DATA } from "../lib/milestonesData";

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
};

type ProfileContextType = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
};

export function ProfileProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [profile, setProfile] = useState<Profile>(initialProfile);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const row = await db.getFirstAsync<any>("SELECT * FROM profile");
        if (row) {
          setProfile({
            ...row,
            paid: !!row.paid,
            milestones: row.milestones
              ? JSON.parse(row.milestones)
              : MILESTONES_DATA,
            streak: row.streak ? JSON.parse(row.streak) : [],
            stats: row.stats ? JSON.parse(row.stats) : initialProfile.stats,
          });
        } else {
          // insert default if none exists
          await db.runAsync(
            `INSERT INTO profile (name, level, currentXP, totalXP, age, paid, milestones, streak, stats) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              initialProfile.name,
              initialProfile.level,
              initialProfile.currentXP,
              initialProfile.totalXP,
              initialProfile.age,
              initialProfile.paid ? 1 : 0,
              JSON.stringify(initialProfile.milestones),
              JSON.stringify(initialProfile.streak),
              JSON.stringify(initialProfile.stats),
            ]
          );
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    loadProfile();
  }, [db]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfile must be used within a ProfileProvider");
  return context;
}
