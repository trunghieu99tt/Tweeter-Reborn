import { ISize } from '@type/app.type';
import { useCallback, useEffect, useState } from 'react';

export const useWindowSize = (): ISize => {
  const [windowSize, setWindowSize] = useState<ISize>({
    width: undefined,
    height: undefined,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [window]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
