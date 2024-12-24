import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrackCard } from '../components/TrackCard';
import { useSpotifyRecommendations } from '../hooks/useSpotifyRecommendations';

export function RecommendationsPage() {
  const navigate = useNavigate();
  const { recommendations, loading, error } = useSpotifyRecommendations(['pop', 'rock', 'indie']);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Music Recommendations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map(track => (
          <TrackCard
            key={track.id}
            track={track}
            onClick={() => navigate(`/track/${track.id}`)}
          />
        ))}
      </div>
    </div>
  );
}