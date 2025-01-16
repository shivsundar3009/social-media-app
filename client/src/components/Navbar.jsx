import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeMode } from '../context/ThemeContext'; // Import the custom hook
import { Instagram } from 'lucide-react';

export default function Navbar() {
  const { themeMode, setThemeMode } = useThemeMode();

  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme); // Update the theme in context, which will also update localStorage
  };

  return (
    <nav className="bg-white dark:bg-black shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
        <Instagram className=" text-pink-500" />
          <span className="font-semibold text-lg text-pink-500 dark:text-white">Instagram</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="text-gray-700 hover:text-pink-500 focus:outline-none dark:text-white dark:hover:text-pink-400"
        >
          {themeMode === 'light' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
}
