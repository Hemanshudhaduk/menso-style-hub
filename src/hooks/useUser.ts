import { useCallback, useEffect, useState } from 'react';

export interface LocalUserProfile {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  state: string;
  city?: string;
  pincode: string;
  avatarDataUrl?: string; // base64 data URL for uploaded avatar
}

const STORAGE_KEY = 'menso-user-profile';

export function useUser() {
  const [user, setUser] = useState<LocalUserProfile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const saveUser = useCallback((profile: LocalUserProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setUser(profile);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return { user, saveUser, logout };
}


