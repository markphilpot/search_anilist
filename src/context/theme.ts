import React, { useState, useEffect, useCallback } from 'react';

type ColorSchemeType = 'light' | 'dark';
type ThemeContextType = {
  theme: ColorSchemeType;
  isOverride: boolean;
};

const ThemeContext = React.createContext<ThemeContextType>({ theme: 'light', isOverride: false });

const useTheme = (): ThemeContextType => React.useContext(ThemeContext);

// Only use this at the root of the application
const useWatchColorScheme = (): ThemeContextType => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [prefersColorScheme, setPrefersColorScheme] = useState<ColorSchemeType>(defaultDark ? 'dark' : 'light');

  const [themeOverride, setThemeOverride] = useState<ColorSchemeType | null>(
    window.localStorage.getItem('theme') as ColorSchemeType | null
  );

  const [theme, setTheme] = useState<ColorSchemeType>(themeOverride ?? prefersColorScheme);

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      const colorScheme = e.matches ? 'dark' : 'light';
      setPrefersColorScheme(colorScheme);
      setTheme(themeOverride ?? colorScheme);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleChange);

    const handleOverride = (event: CustomEvent<{ newTheme: ColorSchemeType }>) => {
      const { newTheme } = event.detail;
      if (newTheme == null) {
        window.localStorage.removeItem('theme');
        setTheme(prefersColorScheme);
      } else {
        window.localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
      }
      setThemeOverride(newTheme);
    };

    // @ts-ignore CustomEvent
    window.addEventListener('themeChange', handleOverride);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleChange);
      // @ts-ignore CustomEvent
      window.removeEventListener('themeChange', handleOverride);
    };
  }, [prefersColorScheme, setThemeOverride, themeOverride]);

  return {
    theme,
    isOverride: themeOverride != null,
  };
};

const useManageTheme = () => {
  const setTheme = useCallback((theme: ColorSchemeType | null) => {
    // Need to notify this context
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { newTheme: theme } }));
  }, []);

  return {
    setTheme,
  };
};

export { ThemeContext, useTheme, useWatchColorScheme, useManageTheme };
