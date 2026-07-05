// frontend/src/hooks/useAutoResize.js

import { useEffect, useState } from 'react';

export const useAutoResize = (ref, value) => {
  const [dimensions, setDimensions] = useState({ width: 240, height: 90 });

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    // Reset height/width momentarily to get accurate scroll sizes
    const originalWidth = ref.current.style.width;
    const originalHeight = ref.current.style.height;
    ref.current.style.width = 'auto';
    ref.current.style.height = 'auto';

    const scrollWidth = ref.current.scrollWidth;
    const scrollHeight = ref.current.scrollHeight;

    // Restore original inline styles
    ref.current.style.width = originalWidth;
    ref.current.style.height = originalHeight;

    // Account for node padding (horizontal 24px * 2 = 48px + safety) and header (approx 40px)
    const newWidth = Math.max(240, scrollWidth + 60);
    const newHeight = Math.max(100, scrollHeight + 70);

    setDimensions((prev) => {
      if (prev.width === newWidth && prev.height === newHeight) {
        return prev;
      }
      return { width: newWidth, height: newHeight };
    });
  }, [value, ref]);

  return dimensions;
};
