import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { spotifyApi } from '../config';
import { DailyQuote } from '../components/DailyQuote';
import { PreferencesForm } from '../components/PreferencesForm';
import { getDailyQuote } from '../services/quotes';
import { getPreferences, savePreferences, UserPreferences } from '../services/preferences';

interface UserProfile {
  display_name: string;
  images: { url: string }[];
}

export function DashboardPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('spotify_token');
    if (!token) {
      navigate('/login');
      return;
    }

    const loadData = async () => {
      try {
        const [userData, storedPreferences] = await Promise.all([
          spotifyApi.getCurrentUser(),
          getPreferences()
        ]);
        setProfile(userData);
        setPreferences(storedPreferences);
        
        if (!storedPreferences) {
          setShowPreferences(true);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        navigate('/login');
      }
    };

    loadData();
  }, [navigate]);

  const handleSavePreferences = (newPreferences: UserPreferences) => {
    savePreferences(newPreferences);
    setPreferences(newPreferences);
    setShowPreferences(false);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  const dailyQuote = getDailyQuote();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {profile.images?.[0] && (
                <img
                  src={profile.images[0].url}
                  alt={profile.display_name}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <h1 className="text-2xl font-bold">Welcome, {profile.display_name}!</h1>
            </div>
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              {showPreferences ? 'Hide Preferences' : 'Edit Preferences'}
            </button>
          </div>

          {showPreferences ? (
            <PreferencesForm
              initialPreferences={preferences || undefined}
              onSave={handleSavePreferences}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Today's Motivation</h2>
                <DailyQuote quote={dailyQuote} />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Your Daily Song</h2>
                <p className="text-gray-600">Coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}