import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';

const InstagramPost = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="max-w-xl bg-white rounded-lg shadow mb-6">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-purple-600 rounded-full p-[2px]">
            <div className="w-full h-full bg-white rounded-full p-[2px]">
              <img
                src="/api/placeholder/32/32"
                alt={`${post.username}'s profile`}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <span className="font-semibold text-sm">{post.username}</span>
        </div>
        <button className="text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1738070593158-9e84a49e7e60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-[600px] object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`hover:text-gray-600 ${isLiked ? 'text-red-500' : 'text-gray-700'}`}
            >
              <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button className="text-gray-700 hover:text-gray-600">
              <MessageCircle size={24} />
            </button>
            <button className="text-gray-700 hover:text-gray-600">
              <Share2 size={24} />
            </button>
          </div>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`text-gray-700 hover:text-gray-600 ${isSaved ? 'text-black' : ''}`}
          >
            <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <span className="font-semibold text-sm">{post.likes.toLocaleString()} likes</span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <span className="font-semibold text-sm mr-2">{post.username}</span>
          <span className="text-sm">{post.caption}</span>
        </div>

        {/* Comments */}
        <div className="text-gray-500 text-sm mb-2">
          View all {post.commentCount} comments
        </div>

        {/* Timestamp */}
        <div className="text-gray-400 text-xs uppercase">
          {post.timestamp}
        </div>
      </div>
    </div>
  );
};

// Feed component that renders multiple posts
const InstagramFeed = () => {
  const samplePosts = [
    {
      id: 1,
      username: "johndoe",
      likes: 1234,
      caption: "Beautiful sunset at the beach! 🌅 #nature #photography",
      commentCount: 42,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      username: "janedoe",
      likes: 856,
      caption: "Perfect morning with coffee ☕️ #coffeetime",
      commentCount: 23,
      timestamp: "4 hours ago"
    }
  ];

  return (
    <div className="max-w-xl mx-auto p-4">
      {samplePosts.map(post => (
        <InstagramPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default InstagramFeed;