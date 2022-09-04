import { useCallback, useState } from 'react';

type useToggleReturnType = {
  visible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
};

export const useToggle = (): useToggleReturnType => {
  const [visible, setVisible] = useState<boolean>(false);

  const show = useCallback(() => setVisible(true), []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const toggle = useCallback(() => {
    setVisible((value) => !value);
  }, []);

  return {
    visible,
    show,
    hide,
    toggle,
  };
};
