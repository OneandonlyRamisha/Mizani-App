export default function calculateStatGain(
  currentStat: number,
  difficulty: "Easy" | "Medium" | "Hard"
): number {
  const base =
    difficulty === "Easy" ? 0.1 : difficulty === "Medium" ? 0.25 : 0.5;

  const decay = Math.pow(currentStat / 100, 1.5);
  const gain = Math.max(base * (1 - decay), 0.01);

  return gain;
}
