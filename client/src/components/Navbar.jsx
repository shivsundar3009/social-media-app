import React from "react";
import { Instagram } from "lucide-react";
import ThemeToggle from "./ThemeToggle"; // Import ThemeToggle component

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-black shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <Instagram className="text-pink-500" />
          <span className="font-semibold text-lg text-pink-500 dark:text-white">Instagram</span>
        </div>

        {/* Theme Toggle Button */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
