import axios from 'axios';
import { SpotifyAuthService } from './spotify-auth';

export class SpotifyApiService {
  private authService: SpotifyAuthService;
  private baseUrl = 'https://api.spotify.com/v1';

  constructor(authService: SpotifyAuthService) {
    this.authService = authService;
  }

  private async request<T>(endpoint: string): Promise<T> {
    try {
      const token = await this.authService.getAccessToken();
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Spotify API error:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    return this.request('/me');
  }

  async getTopTracks() {
    return this.request('/me/top/tracks?limit=5');
  }

  async getTopArtists() {
    return this.request('/me/top/artists?limit=5');
  }
}