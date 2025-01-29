import React from "react";
import {
  Home,
  Search,
  Compass,
  Video,
  MessageCircle,
  Bell,
  PlusCircle,
  User,
  MoreHorizontal,
  Menu,
} from "lucide-react";
import Post from "./Post";
import Posts from "./Posts";

export default function Homescreen() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="hidden md:block lg:w-64 bg-white dark:bg-gray-800 shadow-md p-4">
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
              >
                <Home className="mr-2 hidden md:block" size={20} />
                <span className="hidden lg:block">Home</span>
              </a>
            </li>
            {/* ...Other Sidebar Items */}
          </ul>
        </aside>

        {/* Posts Section */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-6">
          {/* <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Latest Posts
            </h2>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                John Doe
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Just started using this app, and it's amazing!
              </p>
            </div>
          </div> */}
          {/* < Post /> */}
          <Posts />
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:w-64 bg-white dark:bg-gray-800 shadow-md p-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
            Suggestions
          </h3>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md"
              >
                <User className="mr-2" size={20} />
                <span>Friend 1</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md"
              >
                <User className="mr-2" size={20} />
                <span>Friend 2</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md"
              >
                <User className="mr-2" size={20} />
                <span>Friend 3</span>
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
