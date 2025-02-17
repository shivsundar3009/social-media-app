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
    Instagram
} from "lucide-react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Sidebar() {

  const loggedInUser = useSelector((state) => state?.User?.loggedInUser);

  return (
    <aside className="md:h-screen md:w-1/12 md:fixed w-full xl:w-1/6  md:block dark:bg-gray-800 shadow-md ">
      <ul className=" flex w-full md:flex-col md:h-screen md:justify-around justify-around items-center h-11 xl:items-start ">
        
        <li>
          <Link to="/homescreen" className="xl:ml-10 flex items-center md:justify-center lg:p-2  text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <Instagram className="mr-2 md:block" size={20} />
            <span className="hidden xl:block">Instagram</span>
          </Link>
        </li>
        <li className=''>
          <Link to="/homescreen" className="xl:ml-10  flex items-center md:justify-center xl: lg:p-2  text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <Home className="mr-2 md:block" size={20} />
            <span className="hidden xl:block">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/search" className="xl:ml-10  flex items-center lg:p-2 md:justify-center  text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <Search className="mr-2 md:block" size={20} />
            <span className="hidden xl:block">Search</span>
          </Link>
        </li>
        <li>
          <Link to="/explore" className="xl:ml-10  flex items-center lg:p-2 md:justify-center  text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <Compass className="mr-2 md:block" size={20} />
            <span className="hidden xl:block">Explore</span>
          </Link>
        </li>
        <li>
          <Link to="/videos" className="xl:ml-10  flex items-center lg:p-2 md:justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <Video className="mr-2 md:block" size={20} />
            <span className="hidden xl:block">Videos</span>
          </Link>
        </li>
        <li>
          <Link to="/messagingScreen" className="xl:ml-10  flex items-center lg:p-2 md:justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <MessageCircle className="mr-2 md:block" size={20} />
            <span className="hidden xl:block">Messages</span>
          </Link>
        </li>
        <li>
          <Link to="/notifications" className="xl:ml-10  flex items-center lg:p-2 md:justify-center  text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <Bell className="mr-2 md:block" size={20} />
            <span className="hidden xl:block">Notifications</span>
          </Link>
        </li>
        <li>
          <Link to="/createPost" className="xl:ml-10  flex items-center lg:p-2 md:justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <PlusCircle className="mr-2 md:block" size={20} />
            <span className="hidden xl:block">Create Post</span>
          </Link>
        </li>
        <li>
          <Link to={`/userProfile/${loggedInUser?._id}`} className="xl:ml-10  flex items-center lg:p-2 md:justify-center  text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            <User className="mr-2 md:block" size={20} />
            <span className="hidden xl:block">Profile</span>
          </Link>
        </li>
        <li>
          <Link to='/settings' className='xl:ml-10  flex items-center lg:p-2 md:justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md'>
            <MoreHorizontal className="mr-2 md:block" size={20} />
            <span className="hidden xl:block">More</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
