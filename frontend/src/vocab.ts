export interface VocabItem {
  id: string;
  image: string;
  en: { word: string; sentence: string };
  hi: { word: string; sentence: string };
}

export const vocabulary: VocabItem[] = [
  {
    id: 'apple',
    image: '/images/apple.svg',
    en: { word: 'Apple', sentence: 'This is an apple.' },
    hi: { word: 'सेब', sentence: 'यह एक सेब है।' },
  },
  {
    id: 'ball',
    image: '/images/ball.svg',
    en: { word: 'Ball', sentence: 'I play with a ball.' },
    hi: { word: 'गेंद', sentence: 'मैं गेंद से खेलता हूँ।' },
  },
  {
    id: 'cat',
    image: '/images/cat.svg',
    en: { word: 'Cat', sentence: 'The cat is sleeping.' },
    hi: { word: 'बिल्ली', sentence: 'बिल्ली सो रही है।' },
  },
];
