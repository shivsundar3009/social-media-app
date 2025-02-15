import React, { useState } from 'react';
import { Send, MoreVertical, Phone, Video, Info } from 'lucide-react';

const ConversationComponent = () => {
  const [message, setMessage] = useState('');
  
  // Sample conversation data - replace with your actual data
  const conversation = {
    participants: [
      { id: 1, username: "johndoe", profilePic: "/api/placeholder/40/40", isOnline: true },
      { id: 2, username: "yourUsername", profilePic: "/api/placeholder/40/40", isOnline: true }
    ],
    messages: [
      { id: 1, sender: 1, text: "Hey there! How's it going?", timestamp: "10:15 AM" },
      { id: 2, sender: 2, text: "Not bad, just working on my new app. How about you?", timestamp: "10:17 AM" },
      { id: 3, sender: 1, text: "That's awesome! What kind of app are you building?", timestamp: "10:18 AM" },
      { id: 4, sender: 2, text: "It's a social media app with messaging features, kind of like this conversation!", timestamp: "10:20 AM" },
      { id: 5, sender: 1, text: "Sounds cool! Let me know if you need any beta testers.", timestamp: "10:22 AM" }
    ]
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Add logic to send the message
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Conversation Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src={conversation.participants[0].profilePic} 
              alt={conversation.participants[0].username} 
              className="w-10 h-10 rounded-full"
            />
            {conversation.participants[0].isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            )}
          </div>
          <div>
            <h3 className="font-semibold">{conversation.participants[0].username}</h3>
            <p className="text-xs text-gray-500">Active now</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">
            <Phone size={20} />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <Video size={20} />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <Info size={20} />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="flex flex-col space-y-4">
          {conversation.messages.map((msg) => {
            const isCurrentUser = msg.sender === conversation.participants[1].id;
            return (
              <div 
                key={msg.id} 
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-end space-x-2">
                  {!isCurrentUser && (
                    <img 
                      src={conversation.participants[0].profilePic} 
                      alt={conversation.participants[0].username}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div>
                    <div 
                      className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg ${
                        isCurrentUser 
                          ? 'bg-blue-500 text-white rounded-br-none' 
                          : 'bg-white text-gray-800 rounded-bl-none border'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">{msg.timestamp}</span>
                  </div>
                  {isCurrentUser && (
                    <img 
                      src={conversation.participants[1].profilePic} 
                      alt={conversation.participants[1].username}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            type="submit"
            className="p-2 rounded-full bg-blue-500 text-white"
            disabled={!message.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConversationComponent;