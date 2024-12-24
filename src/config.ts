import { SpotifyAuthService } from './services/spotify-auth';
import { SpotifyApiService } from './services/spotify-api';

export const spotifyAuth = new SpotifyAuthService(
  import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
);

export const spotifyApi = new SpotifyApiService(spotifyAuth);