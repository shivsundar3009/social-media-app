import React, { useState } from 'react';
import { Search, MessageCircle } from 'lucide-react';

const MessagingScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample users data - replace with your actual data
  const users = [
    { 
      id: 1, 
      username: "johndoe", 
      fullName: "John Doe", 
      profilePic: "/api/placeholder/48/48", 
      isMutualFollower: true,
      hasConversation: true,
      lastMessage: "Hey, how's it going?",
      lastMessageTime: "2h ago"
    },
    { 
      id: 2, 
      username: "janedoe", 
      fullName: "Jane Doe", 
      profilePic: "/api/placeholder/48/48", 
      isMutualFollower: true,
      hasConversation: false
    },
    { 
      id: 3, 
      username: "marksmith", 
      fullName: "Mark Smith", 
      profilePic: "/api/placeholder/48/48", 
      isMutualFollower: false,
      hasConversation: true,
      lastMessage: "The project looks great!",
      lastMessageTime: "1d ago"
    },
    { 
      id: 4, 
      username: "sarahjohnson", 
      fullName: "Sarah Johnson", 
      profilePic: "/api/placeholder/48/48", 
      isMutualFollower: true,
      hasConversation: false
    },
    { 
      id: 5, 
      username: "mikebrown", 
      fullName: "Mike Brown", 
      profilePic: "/api/placeholder/48/48", 
      isMutualFollower: false,
      hasConversation: true,
      lastMessage: "Thanks for the help!",
      lastMessageTime: "5h ago"
    },
    { 
      id: 6, 
      username: "emilywhite", 
      fullName: "Emily White", 
      profilePic: "/api/placeholder/48/48", 
      isMutualFollower: true,
      hasConversation: false
    },
  ];

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get mutual followers without conversations
  const mutualFollowers = filteredUsers.filter(user => 
    user.isMutualFollower && !user.hasConversation
  );

  // Get users with existing conversations
  const usersWithConversations = filteredUsers.filter(user => 
    user.hasConversation
  );

  return (
    <div className=" bg-white shadow-lg rounded-lg ">
      {/* Header */}
      <div className="px-4 py-3 border-b">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      
      {/* Search Bar */}
      <div className="p-3 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for people..."
            className="w-full pl-10 pr-4 py-2 rounded-full border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {/* Conversations Section */}
        {usersWithConversations.length > 0 && (
          <div className="p-4 border-b">
            <h3 className="text-sm font-medium text-gray-500 mb-2">CONVERSATIONS</h3>
            <div className="space-y-3">
              {usersWithConversations.map(user => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={user.profilePic}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{user.fullName}</h4>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                      {user.lastMessage && (
                        <p className="text-xs text-gray-400 mt-1">
                          {user.lastMessage} · {user.lastMessageTime}
                        </p>
                      )}
                    </div>
                  </div>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <MessageCircle size={20} className="text-blue-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mutual Followers Section */}
        {mutualFollowers.length > 0 && (
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">MUTUAL FOLLOWERS</h3>
            <div className="space-y-3">
              {mutualFollowers.map(user => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={user.profilePic}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{user.fullName}</h4>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                  <button className="px-4 py-1 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600 transition">
                    Hi!
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {filteredUsers.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No users found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingScreen;