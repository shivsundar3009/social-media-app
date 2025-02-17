import React from 'react';
import { 
  Bell, 
  Lock, 
  User, 
  Shield, 
  HelpCircle, 
  Info, 
  Moon, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {logout} from "../redux/features/userSlice"

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: <User size={20} />, label: "Personal Information", hasChevron: true },
        { icon: <Lock size={20} />, label: "Security", hasChevron: true },
        { icon: <Bell size={20} />, label: "Notifications", hasChevron: true },
        { icon: <Shield size={20} />, label: "Privacy", hasChevron: true }
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: <Moon size={20} />, label: "Dark Mode", hasChevron: false },
        { icon: <HelpCircle size={20} />, label: "Help", hasChevron: true },
        { icon: <Info size={20} />, label: "About", hasChevron: true }
      ]
    }
  ];

  const handleLogout = () => {
    // Add logout logic here
    // console.log("Logging out...");
  dispatch(logout())
    navigate("/"); // Redirect to login page

  };

  return (
    <div className="w-full bg-gray-50">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>

      {settingsGroups?.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-6">
          <h2 className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase">
            {group?.title}
          </h2>
          <div className="border-t border-b">
            {group?.items?.map((item, itemIndex) => (
              <button
                key={itemIndex}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                onClick={() => console.log(`Clicked ${item?.label}`)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600">{item?.icon}</span>
                  <span className="text-sm font-medium">{item?.label}</span>
                </div>
                {item?.hasChevron && (
                  <ChevronRight size={20} className="text-gray-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Logout Button */}
      <div className="px-4 py-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Log Out</span>
        </button>
      </div>

      {/* Version Info */}
      <div className="px-4 py-4 text-center">
        <p className="text-sm text-gray-400">Version 1.0.0</p>
      </div>
    </div>
  );
};

export default Settings;