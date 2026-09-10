export type LevelGuide = {
  level: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Very Hard" | "Super Hard";
  mechanic: string;
  focus: string;
  steps: string[];
  mistake: string;
  fallback: string;
};

const mechanics = [
  ["timed collapse", "the lower support", "Clear the loose piece nearest the base.", "Wait until the upper stack leans past center.", "Remove the exposed support to finish the collapse."],
  ["chain reaction", "the isolated connector", "Start with the connector holding the side tower.", "Let the first impact settle before tapping again.", "Use the falling block to carry force into the center."],
  ["counterweight", "the lighter side", "Release the small weight to start the swing.", "Watch the crown shift toward the open edge.", "Break the final brace only when the load is above it."],
  ["precision shot", "the narrow joint", "Aim at the smallest visible joint, not the largest block.", "Use one clean hit and let the structure move.", "Correct from the newly opened angle instead of repeating the shot."],
  ["domino fall", "the outer column", "Tip the outer column toward the middle.", "Allow each section to contact the next.", "Clean up the last stable base after the chain stops."],
] as const;

export const guides: LevelGuide[] = Array.from({ length: 80 }, (_, index) => {
  const level = index + 1;
  const m = mechanics[index % mechanics.length];
  const hard = [59, 60, 69, 70, 79, 80].includes(level);
  return {
    level,
    difficulty: level <= 10 ? "Easy" : level <= 30 ? "Medium" : level % 10 === 0 ? "Super Hard" : hard ? "Very Hard" : "Hard",
    mechanic: m[0],
    focus: m[1],
    steps: [m[2], m[3], m[4]],
    mistake: index % 2 ? "Tapping too quickly can stop the moving pieces from transferring their force." : "Removing the largest block first often leaves a small, stable piece behind.",
    fallback: index % 3 ? "Restart and make the first move slightly closer to the support edge." : "If a piece wedges in place, wait for all motion to stop, then restart rather than spending extra moves.",
  };
});

export const getGuide = (level: number) => guides.find((guide) => guide.level === level);
