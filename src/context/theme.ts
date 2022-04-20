import React, { useState, useEffect, useCallback } from 'react';

type ColorSchemeType = 'light' | 'dark';

const PrefersColorSchemeContext = React.createContext<ColorSchemeType>('light');

const useTheme = (): ColorSchemeType => React.useContext(PrefersColorSchemeContext);

// Only use this at the root of the application
const useWatchColorScheme = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [prefersColorScheme, setPrefersColorScheme] = useState<ColorSchemeType>(defaultDark ? 'dark' : 'light');
  const [themeOverride, setThemeOverride] = useState<ColorSchemeType | null>(
    window.localStorage.getItem('theme') as ColorSchemeType | null
  );

  const [colorScheme, setColorScheme] = useState<ColorSchemeType>(themeOverride ?? prefersColorScheme);

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      const colorScheme = e.matches ? 'dark' : 'light';
      setPrefersColorScheme(colorScheme);
      setColorScheme(themeOverride ?? colorScheme);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleChange);

    const handleOverride = (event: CustomEvent<{ newTheme: ColorSchemeType }>) => {
      const { newTheme } = event.detail;
      window.localStorage.setItem('theme', newTheme);
      setThemeOverride(newTheme);
      setColorScheme(newTheme);
    };

    // @ts-ignore CustomEvent
    window.addEventListener('themeChange', handleOverride);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleChange);
      // @ts-ignore CustomEvent
      window.removeEventListener('themeChange', handleOverride);
    };
  }, [setThemeOverride, themeOverride]);

  return {
    colorScheme,
  };
};

const useManageTheme = () => {
  const theme = useTheme();

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    // Need to notify this context
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { newTheme } }));
  }, [theme]);

  return {
    toggleTheme,
  };
};

export { PrefersColorSchemeContext, useTheme, useWatchColorScheme, useManageTheme };
