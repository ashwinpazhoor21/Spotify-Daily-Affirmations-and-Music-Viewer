import React from 'react';
import { spotifyAuth } from '../config';

export function LoginPage() {
  const handleLogin = () => {
    window.location.href = spotifyAuth.getAuthUrl();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Daily Motivation & Music</h1>
        <p className="text-gray-600 mb-6 text-center">
          Get daily motivational quotes paired with personalized music recommendations
        </p>
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
        >
          Login with Spotify
        </button>
      </div>
    </div>
  );
}