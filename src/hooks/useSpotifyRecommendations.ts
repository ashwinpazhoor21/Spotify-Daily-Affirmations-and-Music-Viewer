import { useState, useEffect, useCallback } from 'react';
import { Track } from '../services/spotify-api';
import { spotifyApi } from '../config';

export function useSpotifyRecommendations(genres: string[]) {
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tracks = await spotifyApi.getRecommendations(genres);
      
      // Ensure we only store serializable data
      const serializedTracks = tracks.map(track => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map(artist => ({ name: artist.name })),
        album: {
          name: track.album.name,
          images: track.album.images.map(image => ({ url: image.url }))
        }
      }));
      
      setRecommendations(serializedTracks);
    } catch (err) {
      setError('Failed to load recommendations');
      console.error('Error in useSpotifyRecommendations:', err);
    } finally {
      setLoading(false);
    }
  }, [genres]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return { recommendations, loading, error };
}