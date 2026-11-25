import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = process.argv[2] ?? "/output/entry.txt";
const MAX_CHARS = 200;

const LOADING_SCREEN_TIP =
  'Stop asking "are you sure?" Neither of you knows, and one of you will lie in bullet points.';

function validateTip(tip: string): string {
  const chars = Array.from(tip);
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`Tip length ${chars.length} out of bounds (1..${MAX_CHARS})`);
  }
  if (tip.trim().length === 0) {
    throw new Error("Tip must not be whitespace-only");
  }
  if (/[\r\n]/.test(tip)) {
    throw new Error("Tip must be a single line without line breaks");
  }
  if (Buffer.byteLength(tip, "utf8") !== chars.length) {
    throw new Error("Tip must be pure ASCII for deterministic byte minimization");
  }
  return tip;
}

function main(): void {
  const tip = validateTip(LOADING_SCREEN_TIP);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, tip, { encoding: "utf8" });
}

main();
