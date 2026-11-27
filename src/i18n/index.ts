import en from './en'
import ig from './ig'

const dictionaries = { en, ig }

export type Locale = keyof typeof dictionaries
export type Key = keyof typeof en

export function t(locale: Locale, key: Key): string {
  return dictionaries[locale][key] || en[key]
}