import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const serialized = localStorage.getItem(key);

  const [state, setState] = useState<T>(serialized ? JSON.parse(serialized) : defaultValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
