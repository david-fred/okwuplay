import en from './en'

// Empty until an Igbo speaker approves each string.
// An empty value falls back to English in t().
export default {
  prompt: 'Rụọ okwu Igbo maka: {meaning}',
  correct: 'Ọ dị mma!',
  undo: 'Kwụghachi',
  newWord: 'Okwu ọhụrụ',
} satisfies Record<keyof typeof en, string>