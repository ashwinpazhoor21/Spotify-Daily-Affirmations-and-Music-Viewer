export interface UserPreferences {
  genres: string[];
  mood: 'energetic' | 'calm' | 'happy' | 'reflective';
  emailNotifications: boolean;
}

export function savePreferences(preferences: UserPreferences): void {
  localStorage.setItem('user_preferences', JSON.stringify(preferences));
}

export function getPreferences(): UserPreferences | null {
  const stored = localStorage.getItem('user_preferences');
  return stored ? JSON.parse(stored) : null;
}