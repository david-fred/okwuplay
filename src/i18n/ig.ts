import en from './en'

// Empty until an Igbo speaker approves each string.
// An empty value falls back to English in t().
export default {
  prompt: '',
  correct: '',
  undo: '',
  newWord: '',
} satisfies Record<keyof typeof en, string>