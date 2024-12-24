import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { spotifyAuth } from '../config';

export function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        try {
          const token = await spotifyAuth.handleCallback(code);
          localStorage.setItem('spotify_token', token);
          navigate('/dashboard');
        } catch (error) {
          console.error('Authentication failed:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-xl">Authenticating...</div>
    </div>
  );
}