import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

const useManageTheme = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  // We need this to keep track when other hook instances change localStorage
  const [themeState, setThemeState] = useState(theme);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Need to notify this context
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { newTheme } }));
  }, [setTheme, theme]);

  useEffect(() => {
    const checkThemeData = (event: CustomEvent<{ newTheme: string }>) => {
      const { newTheme } = event.detail;
      setThemeState(newTheme);
    };

    // @ts-ignore CustomEvent
    window.addEventListener('themeChange', checkThemeData);

    return () => {
      // @ts-ignore CustomEvent
      window.removeEventListener('themeChange', checkThemeData);
    };
  }, []);

  return {
    theme: themeState,
    toggleTheme,
  };
};

export default useManageTheme;
