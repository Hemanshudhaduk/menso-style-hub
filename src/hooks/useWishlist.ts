import { useEffect, useState } from 'react';

const STORAGE_KEY = 'menso-liked-products';
const BUS_EVENT = 'wishlist-updated';

export const useWishlist = () => {
  // Load once from storage on initialization to avoid flicker
  const [likedIds, setLikedIds] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.map((n: any) => Number(n)) : [];
    } catch {
      return [];
    }
  });

  // Helper: persist and broadcast
  const persist = (next: number[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    // Notify other hook instances in this tab
    document.dispatchEvent(new CustomEvent(BUS_EVENT));
  };

  // Subscribe to localStorage updates from other tabs and in-tab updates
  useEffect(() => {
    const syncFromStorage = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        if (Array.isArray(parsed)) {
          const normalized = parsed.map((n: any) => Number(n));
          setLikedIds((prev) => {
            const same = prev.length === normalized.length && prev.every((v, i) => v === normalized[i]);
            return same ? prev : normalized;
          });
        }
      } catch {}
    };

    window.addEventListener('storage', syncFromStorage);
    document.addEventListener(BUS_EVENT, syncFromStorage as EventListener);
    return () => {
      window.removeEventListener('storage', syncFromStorage);
      document.removeEventListener(BUS_EVENT, syncFromStorage as EventListener);
    };
  }, []);

  const isLiked = (productId: number) => likedIds.includes(Number(productId));

  const toggleLike = (productId: number) => {
    setLikedIds((prev) => {
      const idNum = Number(productId);
      const next = prev.includes(idNum) ? prev.filter((id) => id !== idNum) : [...prev, idNum];
      persist(next);
      return next;
    });
  };

  const clearLikes = () => {
    setLikedIds(() => {
      const empty: number[] = [];
      persist(empty);
      return empty;
    });
  };

  return { likedIds, isLiked, toggleLike, clearLikes };
};
