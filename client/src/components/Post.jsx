import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

const Post = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState('');

  // Sample data - in a real app, this would come from props or an API
  const post = {
    username: 'johndoe',
    userAvatar: '/api/placeholder/32/32',
    location: 'New York, NY',
    image: 'https://plus.unsplash.com/premium_photo-1679397743946-ef0f12e366c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 1234,
    caption: 'Beautiful day in the city! 🌆 #nyc #citylife',
    comments: [
      { username: 'jane_smith', text: 'Amazing view! 😍' },
      { username: 'mike_wilson', text: 'Where exactly is this?' }
    ],
    timePosted: '2 HOURS AGO'
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // In a real app, this would send the comment to an API
      console.log('New comment:', comment);
      setComment('');
    }
  };

  return (
    <div className="max-w-xl bg-white border rounded-lg shadow-sm mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <img 
            src={post.userAvatar} 
            alt={post.username} 
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">{post.username}</p>
            <p className="text-xs text-gray-500">{post.location}</p>
          </div>
        </div>
        <button className="text-gray-500">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Image */}
      <img 
        src={post.image} 
        alt="Post content" 
        className="w-full object-cover"
      />

      {/* Action Buttons */}
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button onClick={handleLike}>
              <Heart 
                size={24} 
                className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
              />
            </button>
            <button>
              <MessageCircle size={24} className="text-gray-700" />
            </button>
            <button>
              <Send size={24} className="text-gray-700" />
            </button>
          </div>
          <button onClick={handleSave}>
            <Bookmark 
              size={24} 
              className={`${isSaved ? 'fill-black text-black' : 'text-gray-700'}`}
            />
          </button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mb-2">
          {post.likes.toLocaleString()} likes
        </p>

        {/* Caption */}
        <p className="text-sm mb-2">
          <span className="font-semibold mr-2">{post.username}</span>
          {post.caption}
        </p>

        {/* Comments */}
        <div className="space-y-1 mb-2">
          {post.comments.map((comment, index) => (
            <p key={index} className="text-sm">
              <span className="font-semibold mr-2">{comment.username}</span>
              {comment.text}
            </p>
          ))}
        </div>

        {/* Timestamp */}
        <p className="text-xs text-gray-500 uppercase mb-2">
          {post.timePosted}
        </p>

        {/* Comment Input */}
        <form onSubmit={handleComment} className="flex items-center border-t pt-3">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 text-sm outline-none"
          />
          <button 
            type="submit"
            disabled={!comment.trim()}
            className={`text-blue-500 font-semibold text-sm ${!comment.trim() ? 'opacity-50' : ''}`}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;