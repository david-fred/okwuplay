import { useState } from "react";
import { words } from "./data/words";
import { tokenize } from "./igbo/tiles";

// Extra letters so the player has to choose, not just rearrange.
const DECOYS = ["a", "e", "i", "o", "u", "n", "m", "r"];

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function newRound() {
  const target = words[Math.floor(Math.random() * words.length)];
  const needed = tokenize(target.igbo);
  const decoys = shuffle(DECOYS).slice(0, 2);
  return { target, rack: shuffle([...needed, ...decoys]) };
}

export default function App() {
  const [round, setRound] = useState(newRound);
  const [picked, setPicked] = useState<number[]>([]); // indexes into round.rack

  const built = picked.map((i) => round.rack[i]).join("");
  const solved = built === round.target.igbo.normalize("NFC").toLowerCase();

  function startNewRound() {
    setRound(newRound());
    setPicked([]);
  }

  return (
    <main style={{ maxWidth: 480, margin: "2rem auto", textAlign: "center" }}>
      <h1>OkwuPlay</h1>
      <p>
        Build the Igbo word for: <strong>{round.target.english}</strong>
      </p>

      <div style={{ fontSize: 32, minHeight: 48, letterSpacing: 4 }}>
        {built || "_"}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", margin: "1.5rem 0" }}>
        {round.rack.map((tile, i) => (
          <button
            key={i}
            disabled={picked.includes(i) || solved}
            onClick={() => setPicked((p) => [...p, i])}
            style={{ fontSize: 24, padding: "8px 14px" }}
          >
            {tile}
          </button>
        ))}
      </div>

      <button onClick={() => setPicked((p) => p.slice(0, -1))} disabled={picked.length === 0 || solved}>
        Undo
      </button>{" "}
      <button onClick={startNewRound}>New word</button>

      {solved && <p><strong>Correct!</strong></p>}
    </main>
  );
}