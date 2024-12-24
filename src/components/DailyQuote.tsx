import React from 'react';
import { Quote } from '../services/quotes';

interface DailyQuoteProps {
  quote: Quote;
}

export function DailyQuote({ quote }: DailyQuoteProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <blockquote className="text-xl italic text-gray-800 mb-4">
        "{quote.text}"
      </blockquote>
      <cite className="text-gray-600 block">— {quote.author}</cite>
      <span className="text-sm text-gray-500 mt-2 inline-block capitalize">
        Mood: {quote.mood}
      </span>
    </div>
  );
}