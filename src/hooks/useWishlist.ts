import { useEffect, useState } from 'react';

const STORAGE_KEY = 'menso-liked-products';

export const useWishlist = () => {
  const [likedIds, setLikedIds] = useState<number[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLikedIds(parsed);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likedIds));
  }, [likedIds]);

  const isLiked = (productId: number) => likedIds.includes(productId);

  const toggleLike = (productId: number) => {
    setLikedIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const clearLikes = () => setLikedIds([]);

  return { likedIds, isLiked, toggleLike, clearLikes };
};
