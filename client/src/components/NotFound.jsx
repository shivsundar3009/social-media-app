import React from 'react';
import { Camera, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleReturnToHome = () => {
      navigate('/');
    };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Main Content Container */}
      <div className="max-w-md w-full text-center space-y-6">
        {/* Camera Icon in a Circle */}
        <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
          <Camera className="w-12 h-12 text-gray-400" />
        </div>

        {/* Error Messages */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-gray-500">
            Sorry, this page isn't available. The link you followed may be broken, 
            or the page may have been removed.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button 
            onClick={handleReturnToHome}
            className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
        </div>

        {/* Additional Links */}
        <div className="pt-8 space-y-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Here are some helpful links instead:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button className="text-blue-500 hover:underline">About</button>
            <button className="text-blue-500 hover:underline">Help</button>
            <button className="text-blue-500 hover:underline">Privacy</button>
            <button className="text-blue-500 hover:underline">Terms</button>
          </div>
        </div>

        {/* Instagram Logo Text */}
        <div className="pt-8">
          <p className="text-sm font-semibold text-gray-400">INSTAGRAM</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;