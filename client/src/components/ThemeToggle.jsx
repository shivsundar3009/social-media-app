import React from "react";
import { Sun, Moon } from "lucide-react";
import { useThemeMode } from "../context/ThemeContext"; // Import theme hook

const ThemeToggle = () => {
  const { themeMode, setThemeMode } = useThemeMode();

  const toggleTheme = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-gray-700 hover:text-pink-500 focus:outline-none dark:text-white dark:hover:text-pink-400"
    >
      {themeMode === "light" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
};

export default ThemeToggle;
