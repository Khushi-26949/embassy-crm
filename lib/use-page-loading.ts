'use client';

import { useEffect, useState } from 'react';

export function usePageLoading(delayMs = 1000) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  return loading;
}
