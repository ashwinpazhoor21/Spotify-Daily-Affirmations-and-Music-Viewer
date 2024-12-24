export interface Quote {
  text: string;
  author: string;
  mood: 'energetic' | 'calm' | 'happy' | 'reflective';
}

// For now, we'll use a small set of quotes. In production, this would come from an API
export const quotes: Quote[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    mood: "energetic"
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    mood: "calm"
  },
  {
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
    mood: "happy"
  },
  {
    text: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    mood: "reflective"
  }
];

export function getDailyQuote(): Quote {
  const today = new Date();
  const index = (today.getFullYear() + today.getMonth() + today.getDate()) % quotes.length;
  return quotes[index];
}