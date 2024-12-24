import React from 'react';
import { Track } from '../services/spotify-api';

interface TrackCardProps {
  track: Track;
  onClick: () => void;
}

export function TrackCard({ track, onClick }: TrackCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <img 
        src={track.album.images[0].url} 
        alt={track.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="mt-2 text-lg font-semibold">{track.name}</h3>
      <p className="text-gray-600">{track.artists.map(a => a.name).join(', ')}</p>
    </div>
  );
}