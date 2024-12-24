import React, { useState } from 'react';
import { UserPreferences } from '../services/preferences';

interface PreferencesFormProps {
  initialPreferences?: UserPreferences;
  onSave: (preferences: UserPreferences) => void;
}

export function PreferencesForm({ initialPreferences, onSave }: PreferencesFormProps) {
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences || {
    genres: [],
    mood: 'happy',
    emailNotifications: true
  });

  const genres = ['pop', 'rock', 'indie', 'classical', 'jazz', 'electronic'];
  const moods = ['energetic', 'calm', 'happy', 'reflective'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Favorite Genres
        </label>
        <div className="grid grid-cols-2 gap-2">
          {genres.map(genre => (
            <label key={genre} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.genres.includes(genre)}
                onChange={(e) => {
                  const newGenres = e.target.checked
                    ? [...preferences.genres, genre]
                    : preferences.genres.filter(g => g !== genre);
                  setPreferences({ ...preferences, genres: newGenres });
                }}
                className="rounded text-green-500 focus:ring-green-500"
              />
              <span className="capitalize">{genre}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Mood
        </label>
        <select
          value={preferences.mood}
          onChange={(e) => setPreferences({ ...preferences, mood: e.target.value as any })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          {moods.map(mood => (
            <option key={mood} value={mood} className="capitalize">
              {mood}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={preferences.emailNotifications}
            onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
            className="rounded text-green-500 focus:ring-green-500"
          />
          <span className="text-sm text-gray-700">Receive daily email notifications</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
      >
        Save Preferences
      </button>
    </form>
  );
}