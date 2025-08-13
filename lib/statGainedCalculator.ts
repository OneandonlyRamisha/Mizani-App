export default function calculateStatGain(
  currentStat: number,
  difficulty: "Easy" | "Medium" | "Hard"
): number {
  const maxStat = 100;

  const base =
    difficulty === "Easy" ? 0.1 : difficulty === "Medium" ? 0.25 : 0.5;

  const decay = Math.pow(currentStat / maxStat, 1.5);
  const rawGain = Math.max(base * (1 - decay), 0.01);

  const gain =
    currentStat + rawGain > maxStat ? maxStat - currentStat : rawGain;

  return gain;
}
