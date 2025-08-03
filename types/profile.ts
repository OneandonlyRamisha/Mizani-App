import { Milestone } from "./milestones";

export type Profile = {
  name: string;
  level: number;
  currentXP: number;
  totalXP: number;
  age: string;
  paid: boolean;
  stats: {
    overall: number;
    discipline: number;
    focus: number;
    wisdom: number;
    health: number;
    faith: number;
  };
  milestones: Milestone[];
};
