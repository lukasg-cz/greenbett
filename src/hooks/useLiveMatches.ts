'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Match } from '@/types';

export function useLiveMatches(initialMatches: Match[], pollInterval = 30000) {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [loading, setLoading] = useState(false);

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/matches');
      if (response.ok) {
        const data: Match[] = await response.json();
        setMatches(data);
      }
    } catch {
      // Keep existing data on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchMatches, pollInterval);
    return () => clearInterval(interval);
  }, [fetchMatches, pollInterval]);

  return { matches, loading, refetch: fetchMatches };
}
