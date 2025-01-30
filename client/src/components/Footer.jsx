import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-black text-gray-500 dark:text-gray-400 py-6 text-xs">
      <div className="container mx-auto text-center space-y-4">
        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-3">
          <a href="#" className="hover:underline dark:hover:text-white">Meta</a>
          <a href="#" className="hover:underline dark:hover:text-white">About</a>
          <a href="#" className="hover:underline dark:hover:text-white">Blog</a>
          <a href="#" className="hover:underline dark:hover:text-white">Jobs</a>
          <a href="#" className="hover:underline dark:hover:text-white">Help</a>
          <a href="#" className="hover:underline dark:hover:text-white">API</a>
          <a href="#" className="hover:underline dark:hover:text-white">Privacy</a>
          <a href="#" className="hover:underline dark:hover:text-white">Terms</a>
          <a href="#" className="hover:underline dark:hover:text-white">Locations</a>
          <a href="#" className="hover:underline dark:hover:text-white">Instagram Lite</a>
          <a href="#" className="hover:underline dark:hover:text-white">Threads</a>
          <a href="#" className="hover:underline dark:hover:text-white">
            Contact Uploading & Non-Users
          </a>
          <a href="#" className="hover:underline dark:hover:text-white">Meta Verified</a>
        </div>

        {/* Language Selector and Copyright */}
        <div className="flex gap-5 justify-center">
          {/* Language Selector */}
          <button className="text-gray-500 hover:underline dark:hover:text-white">English</button>

          {/* Copyright */}
          <span className="text-gray-400 dark:text-gray-500">
            &copy; 2025 Instagram from Meta
          </span>
        </div>
      </div>
    </footer>
  );
}
