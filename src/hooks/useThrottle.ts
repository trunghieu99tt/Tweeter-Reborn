import _ from 'lodash';
import { useCallback, useEffect, useRef } from 'react';

// Source: https://stackoverflow.com/questions/54666401/how-to-use-throttle-or-debounce-with-react-hook
export const useThrottle = (cb, delay, additionalDeps) => {
  const options = { leading: true, trailing: false }; // pass custom lodash options
  const cbRef = useRef(cb);
  const throttledCb = useCallback(
    _.throttle((...args) => cbRef.current(...args), delay, options),
    [delay],
  );
  useEffect(() => {
    cbRef.current = cb;
  });
  // set additionalDeps to execute effect, when other values change (not only on delay change)
  useEffect(throttledCb, [throttledCb, ...additionalDeps]);

  return throttledCb;
};
