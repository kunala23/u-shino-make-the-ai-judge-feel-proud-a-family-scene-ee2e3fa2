// Entry for "Make the AI Judge Feel Proud: A Family Scene".
// Writes one short family scene (one or two lines, <=280 chars) to /output/entry.txt.
//
// Revision (v2): instead of hardcoding one scene, the program scores three
// candidate scenes against the judge's five published criteria (in their
// published order: real warm family scene; heartfelt, genuine affection;
// light, recognisable humour; tight one-or-two-line use; specific and fresh)
// and deterministically writes the winner.
import { writeFileSync, mkdirSync } from "node:fs";

type Candidate = { text: string; scores: number[] };

const CANDIDATES: Candidate[] = [
  {
    text: "Dad still sets a place at the table for the dog we lost three years ago, and Mum still pretends not to notice — but she always puts down the good plate.",
    // warm scene 5, heartfelt 5, funny 3 (wry smile, not a laugh), tight 5, specific 5
    scores: [5, 5, 3, 5, 5],
  },
  {
    text: "Every Sunday my grandfather calls the whole family to the table, counts heads like a general, and announces, \"All present — dinner may begin,\" as if grace were a roll call.",
    // warm scene 5, heartfelt 4, funny 5, tight 4, specific 5
    scores: [5, 4, 5, 4, 5],
  },
  {
    text: "My little brother still saves the last bite of his birthday cake for Dad, who is allergic to cake — and Dad still eats it, every year, smiling through the hives.",
    // warm scene 5, heartfelt 5, funny 5, tight 5, specific 5
    scores: [5, 5, 5, 5, 5],
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((a, b) => a + b, 0);
}

// Highest total wins; ties break on the earliest criterion where they differ.
const winner = [...CANDIDATES].sort((a, b) => {
  const d = total(b) - total(a);
  if (d !== 0) return d;
  for (let i = 0; i < a.scores.length; i++) {
    if (a.scores[i] !== b.scores[i]) return b.scores[i] - a.scores[i];
  }
  return 0;
})[0];

const ENTRY = winner.text;
const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(new URL(".", `file://${outPath}`).pathname, { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} chars to ${outPath}`);
