import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useState,
} from "react";
import { Habit } from "../types/habit";
import { Profile } from "../types/profile";
import { MILESTONES_DATA } from "../lib/milestonesData";

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);
const initialProfile = {
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
  const [profile, setProfile] = useState<Profile>(initialProfile);
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
