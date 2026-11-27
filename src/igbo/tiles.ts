// Igbo digraphs that behave as one sound and one tile.
// Longest match first, so "kw" is never split into "k" + "w".
const DIGRAPHS = ["gb", "gh", "gw", "kp", "kw", "nw", "ny", "ch", "sh"];

export function tokenize(word: string): string[] {
  // NFC makes dotted letters like ọ and ụ a single character,
  // whichever way the keyboard sent them.
  const text = word.normalize("NFC").toLowerCase();
  const tiles: string[] = [];
  let i = 0;

  while (i < text.length) {
    const pair = text.slice(i, i + 2);
    if (DIGRAPHS.includes(pair)) {
      tiles.push(pair);
      i += 2;
    } else {
      tiles.push(text[i]);
      i += 1;
    }
  }
  return tiles;
}