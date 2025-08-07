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
    fitness: number;
    faith: number;
    finance: number;
  };
  milestones: Milestone[];
};
