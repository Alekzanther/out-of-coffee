import { useEffect, useCallback, useState, useRef } from 'react';

export const useToggle = (initialState: boolean) => {
  const [isToggled, setIsToggled] = useState(initialState);
  const isToggledRef = useRef(isToggled);

  const toggle = useCallback(
    () => setIsToggled(!isToggledRef.current),
    [isToggledRef, setIsToggled],
  );

  useEffect(() => {
    isToggledRef.current = isToggled;
  }, [isToggled]);

  return [isToggled, toggle] as const;
};
