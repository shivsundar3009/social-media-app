import React from 'react';
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
} from "lucide-react";
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="hidden md:block lg:w-64 bg-white dark:bg-gray-800 shadow-md p-4 h-screen fixed">
      <ul className="space-y-4">
        <li className='hidden lg:flex font-bold lg:items-center lg:p-2 text-gray-700 dark:text-gray-300 rounded-md'>
          Instagram
        </li>
        <li>
          <Link to="/" className="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <Home className="mr-2 hidden md:block" size={20} />
            <span className="hidden lg:block">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/search" className="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <Search className="mr-2 hidden md:block" size={20} />
            <span className="hidden lg:block">Search</span>
          </Link>
        </li>
        <li>
          <Link to="/explore" className="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <Compass className="mr-2 hidden md:block" size={20} />
            <span className="hidden lg:block">Explore</span>
          </Link>
        </li>
        <li>
          <Link to="/videos" className="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <Video className="mr-2 hidden md:block" size={20} />
            <span className="hidden lg:block">Videos</span>
          </Link>
        </li>
        <li>
          <Link to="/messages" className="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <MessageCircle className="mr-2 hidden md:block" size={20} />
            <span className="hidden lg:block">Messages</span>
          </Link>
        </li>
        <li>
          <Link to="/notifications" className="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <Bell className="mr-2 hidden md:block" size={20} />
            <span className="hidden lg:block">Notifications</span>
          </Link>
        </li>
        <li>
          <Link to="/createPost" className="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <PlusCircle className="mr-2 hidden md:block" size={20} />
            <span className="hidden lg:block">Create Post</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <User className="mr-2 hidden md:block" size={20} />
            <span className="hidden lg:block">Profile</span>
          </Link>
        </li>
        <li>
          <Link to='/settings' className='flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md'>
            <MoreHorizontal className="mr-2 hidden md:block" size={20} />
            <span className="hidden lg:block">More</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
