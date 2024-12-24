import axios from 'axios';

export class SpotifyAuthService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private tokenEndpoint = 'https://accounts.spotify.com/api/token';
  private authorizeEndpoint = 'https://accounts.spotify.com/authorize';
  private accessToken: string | null = null;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = `${window.location.origin}/callback`;
  }

  getAuthUrl(): string {
    const scope = 'user-read-private user-read-email user-top-read';
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      scope,
      redirect_uri: this.redirectUri,
    });
    return `${this.authorizeEndpoint}?${params.toString()}`;
  }

  async handleCallback(code: string): Promise<string> {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectUri,
    });

    const auth = btoa(`${this.clientId}:${this.clientSecret}`);
    const response = await axios.post(this.tokenEndpoint, params.toString(), {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    this.accessToken = response.data.access_token;
    return this.accessToken;
  }

  async getAccessToken(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken;
    }
    throw new Error('No access token available. User must authenticate first.');
  }
}