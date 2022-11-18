'use client';
import { useEffect, useState } from 'react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  const [time, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setTime((prev) => prev + 1),
      1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        height: '50px',
        width: '50px',
        backgroundColor: 'whitesmoke',
      }}
    >
      Loading... {time}
    </div>
  );
}
