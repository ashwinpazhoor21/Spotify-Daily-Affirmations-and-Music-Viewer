import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Track } from '../services/spotify-api';
import { spotifyApi } from '../config';

export function TrackDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    if (id) {
      loadTrackDetails(id);
    }
  }, [id]);

  async function loadTrackDetails(trackId: string) {
    try {
      const trackData = await spotifyApi.getTrackDetails(trackId);
      setTrack(trackData);
    } catch (error) {
      console.error('Error loading track details:', error);
    }
  }

  if (!track) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <img 
          src={track.album.images[0].url} 
          alt={track.name}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <h1 className="text-3xl font-bold mt-6">{track.name}</h1>
        <p className="text-xl text-gray-600 mt-2">
          {track.artists.map(a => a.name).join(', ')}
        </p>
        <p className="text-gray-500 mt-2">
          Album: {track.album.name}
        </p>
      </div>
    </div>
  );
}