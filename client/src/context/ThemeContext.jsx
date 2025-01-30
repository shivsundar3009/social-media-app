import { createContext, useState, useEffect, useContext } from 'react';

const themeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  // Check if a theme is stored in localStorage, if not default to 'light'
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [themeMode, setThemeMode] = useState(storedTheme);

  // Update the theme in localStorage whenever the theme changes
  useEffect(() => {
    localStorage.setItem('theme', themeMode);
    
    // Apply the theme class to the <html> tag
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [themeMode]);

  return (
    <themeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </themeContext.Provider>
  );
};

export function useThemeMode() {
  return useContext(themeContext);
}
