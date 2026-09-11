export type LevelGuide = {
  level: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Very Hard" | "Super Hard";
  mechanic: string;
  focus: string;
  summary: string;
  stepTitles: string[];
  steps: string[];
  mistake: string;
  fallback: string;
};

const boardFamilies = [
  {
    mechanic: "base-collapse puzzle",
    focus: "the lower-center support",
    stepTitles: ["Open the base", "Let the weight transfer", "Clear the last support"],
    opening: "Make your opening hit on the low piece that carries the middle of the stack.",
    timing: "Pause after the first movement and watch which side becomes heavier.",
    finish: "Use the newly exposed base rather than returning to the original target.",
    mistake: "Hitting the tallest piece first can leave the entire base locked in place.",
    fallback: "Restart and place the first hit a little closer to the center of the lower support.",
  },
  {
    mechanic: "side-connector chain reaction",
    focus: "the connector joining the side tower",
    stepTitles: ["Release the connector", "Follow the chain", "Use the opening"],
    opening: "Tap the small connector that links the outside column to the main structure.",
    timing: "Allow the first falling piece to touch the next section before making another move.",
    finish: "When the chain opens a gap, remove the piece that is now carrying the remaining load.",
    mistake: "A second tap too early can interrupt the chain before it reaches the center.",
    fallback: "Wait until every moving piece has settled, then retry with one deliberate opening hit.",
  },
  {
    mechanic: "counterweight puzzle",
    focus: "the lighter-side weight",
    stepTitles: ["Free the light side", "Read the lean", "Break the final brace"],
    opening: "Release the small weight on the lighter side to begin the swing.",
    timing: "Track the direction of the top stack instead of chasing the first piece that falls.",
    finish: "Break the brace only after the heavier section has moved above it.",
    mistake: "Removing the heavier side too soon takes away the momentum you need.",
    fallback: "Restart and use the outside light piece first so the structure can lean naturally.",
  },
  {
    mechanic: "precision-joint puzzle",
    focus: "the narrow visible joint",
    stepTitles: ["Find the joint", "Use one clean hit", "Correct from the gap"],
    opening: "Aim for the smallest visible joint, not the biggest block on the screen.",
    timing: "Make one clean hit, then wait for the structure to reveal its next weak point.",
    finish: "Work from the open angle created by the first hit to remove the last stable piece.",
    mistake: "Repeated taps on the same large block waste the opening and leave a stubborn survivor.",
    fallback: "Restart and target the edge of the joint rather than its center.",
  },
  {
    mechanic: "outer-column domino puzzle",
    focus: "the outside column facing the center",
    stepTitles: ["Tip the first column", "Keep the line moving", "Finish the base"],
    opening: "Push the outside column toward the middle so it can start a controlled domino fall.",
    timing: "Let each section make contact with the next before you touch the board again.",
    finish: "After the chain stops, clear the small base piece that kept the last column upright.",
    mistake: "Starting from the center often sends the outer pieces away from the chain.",
    fallback: "Restart from the column furthest from the center and let the fall travel inward.",
  },
  {
    mechanic: "under-rail brace puzzle",
    focus: "the brace below the horizontal rail",
    stepTitles: ["Release the brace", "Watch the rail drop", "Remove the anchor"],
    opening: "Target the support tucked beneath the horizontal rail instead of the rail itself.",
    timing: "Give the rail time to drop and expose the anchor holding the remaining pieces.",
    finish: "Remove that anchor when it is no longer protected by the upper stack.",
    mistake: "Hitting the rail directly can scatter pieces without loosening the structure.",
    fallback: "Restart and use a lower hit so gravity does the work for you.",
  },
  {
    mechanic: "canister-row balance puzzle",
    focus: "the inner canister in the side row",
    stepTitles: ["Open the side row", "Balance the center", "Clear the leftover canister"],
    opening: "Start with the inner canister of the side row to loosen the balance point.",
    timing: "Wait for the center stack to settle before deciding which side has become exposed.",
    finish: "Use the clear side to remove the final canister without disturbing the new balance.",
    mistake: "Picking an outside canister first can make the row collapse away from the main stack.",
    fallback: "Restart from the canister closest to the center and keep the first move controlled.",
  },
  {
    mechanic: "arch-shoulder collapse puzzle",
    focus: "the shoulder under the center arch",
    stepTitles: ["Open the arch", "Let the shoulder slide", "Close out the collapse"],
    opening: "Tap the shoulder supporting the center arch rather than the top decoration.",
    timing: "Let the shoulder slide before choosing a follow-up target.",
    finish: "Once the arch opens, clear the exposed support that is holding the final pieces.",
    mistake: "Breaking the top first can leave both shoulders stable and harder to reach.",
    fallback: "Restart and begin below the arch so the upper pieces fall into the opening.",
  },
] as const;

const chapterAngles = [
  { label: "opening fundamentals", note: "This early board rewards a simple first move and a patient pause." },
  { label: "timing practice", note: "The important detail here is reading the first shift before using a second move." },
  { label: "angle control", note: "Use the opening animation to choose the safer side instead of forcing the first target." },
  { label: "support reading", note: "Look for the piece carrying the most weight, not the largest visible object." },
  { label: "chain setup", note: "A clean setup matters more than speed in this section of the guide." },
  { label: "mid-game balance", note: "The board opens when you preserve momentum and avoid disrupting the lean." },
  { label: "late-game accuracy", note: "Small target choices make a larger difference as these layouts become tighter." },
  { label: "advanced recovery", note: "If the first motion is imperfect, wait for a new opening instead of repeating it." },
] as const;

const finishingNotes = [
  "Finish only after the remaining piece is no longer supported from both sides.",
  "Use the pause after the motion to spot the one piece that is still doing the structural work.",
  "The final move is easier from the newly opened side than from the original camera angle.",
  "Let gravity complete as much of the board as possible before making the clean-up tap.",
  "A single precise follow-up is usually safer than several quick corrections.",
] as const;

export const MAX_LEVEL = 370;

export const guides: LevelGuide[] = Array.from({ length: MAX_LEVEL }, (_, index) => {
  const level = index + 1;
  const family = boardFamilies[index % boardFamilies.length];
  const chapter = chapterAngles[Math.floor(index / 10) % chapterAngles.length];
  const finish = finishingNotes[index % finishingNotes.length];
  const hard = level % 10 === 9;
  const difficulty = level <= 10 ? "Easy" : level <= 30 ? "Medium" : level % 10 === 0 ? "Super Hard" : hard ? "Very Hard" : "Hard";

  return {
    level,
    difficulty,
    mechanic: `${family.mechanic} · ${chapter.label}`,
    focus: family.focus,
    summary: `Royal Smash! - Physics Puzzle Level ${level} is a ${difficulty.toLowerCase()} ${family.mechanic}. ${chapter.note}`,
    stepTitles: [...family.stepTitles],
    steps: [
      `Level ${level}: ${family.opening} ${chapter.note}`,
      `Level ${level}: ${family.timing} This is the key timing decision for this layout.`,
      `Level ${level}: ${family.finish} ${finish}`,
    ],
    mistake: `Level ${level}: ${family.mistake}`,
    fallback: `Level ${level}: ${family.fallback}`,
  };
});

export const getGuide = (level: number) => guides.find((guide) => guide.level === level);
