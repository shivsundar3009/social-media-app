import React from "react";
import { User } from "lucide-react";
import Post from "./Post";
import Sidebar from "./Sidebar";

export default function Homescreen() {
  return (

        <div className="w-full flex justify-between bg-gray-50">

           {/* Posts Section */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-6">
      
          < Post />
        

        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:w-64 bg-blue-500 dark:bg-gray-800 shadow-md p-4 h-96">
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
       

  );
}
