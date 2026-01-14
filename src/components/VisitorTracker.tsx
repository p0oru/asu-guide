'use client';

import { useEffect } from 'react';

const STORAGE_KEY = 'has_visited_asu_guide';

export default function VisitorTracker() {
  useEffect(() => {
    // Check if this is a new visitor
    const hasVisited = localStorage.getItem(STORAGE_KEY);

    if (!hasVisited) {
      // New visitor - track the visit
      fetch('/api/analytics', { method: 'POST' })
        .then(() => {
          // Mark as visited after successful tracking
          localStorage.setItem(STORAGE_KEY, 'true');
        })
        .catch((error) => {
          console.error('Failed to track visit:', error);
        });
    }
  }, []);

  // This component renders nothing - it just tracks silently
  return null;
}
