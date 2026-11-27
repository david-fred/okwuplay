import { useState } from 'react'
import { words } from './data/words'
import { tokenize } from './igbo/tiles'
import { t, isComplete, type Locale } from './i18n'

// Extra letters so the player has to choose, not just rearrange.
const DECOYS = ['a', 'e', 'i', 'o', 'u', 'n', 'm', 'r']

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = copy[i]
    copy[i] = copy[j]
    copy[j] = tmp
  }
  return copy
}

function newRound() {
  const target = words[Math.floor(Math.random() * words.length)]
  const needed = tokenize(target.igbo)
  const decoys = shuffle(DECOYS).slice(0, 2)
  return { target, rack: shuffle([...needed, ...decoys]) }
}

export default function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const [round, setRound] = useState(newRound)
  const [picked, setPicked] = useState<number[]>([]) // indexes into round.rack
  const [score, setScore] = useState(0)

  const targetText = round.target.igbo.normalize('NFC').toLowerCase()
  const built = picked.map((i) => round.rack[i]).join('')
  const solved = built === targetText

  const prompt = t(locale, 'prompt').replace('{meaning}', round.target.english)
  const scoreLine = t(locale, 'score').replace('{count}', String(score))

  // Count the score in the click handler, so a word can only score once.
  function pickTile(i: number) {
    const nextPicked = [...picked, i]
    const nextBuilt = nextPicked.map((j) => round.rack[j]).join('')
    setPicked(nextPicked)
    if (nextBuilt === targetText) {
      setScore((s) => s + 1)
    }
  }

  function startNewRound() {
    setRound(newRound())
    setPicked([])
  }

  return (
    <main style={{ maxWidth: 480, margin: '2rem auto', textAlign: 'center' }}>
      <h1>OkwuPlay</h1>

      <div>
        <button onClick={() => setLocale('en')} disabled={locale === 'en'}>
          English
        </button>{' '}
        {isComplete('ig') && (
          <button onClick={() => setLocale('ig')} disabled={locale === 'ig'}>
            Igbo
          </button>
        )}
      </div>

      <p>{scoreLine}</p>
      <p>{prompt}</p>

      <div style={{ fontSize: 32, minHeight: 48, letterSpacing: 4 }}>
        {built || '_'}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', margin: '1.5rem 0' }}>
        {round.rack.map((tile, i) => (
          <button
            key={i}
            disabled={picked.includes(i) || solved}
            onClick={() => pickTile(i)}
            style={{ fontSize: 24, padding: '8px 14px' }}
          >
            {tile}
          </button>
        ))}
      </div>

      <button onClick={() => setPicked((p) => p.slice(0, -1))} disabled={picked.length === 0 || solved}>
        {t(locale, 'undo')}
      </button>{' '}
      <button onClick={startNewRound}>{t(locale, 'newWord')}</button>

      {solved && <p><strong>{t(locale, 'correct')}</strong></p>}
    </main>
  )
}