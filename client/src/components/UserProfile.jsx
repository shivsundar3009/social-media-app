import React, { useState } from 'react';
import { Grid, Camera, Settings, Bookmark, Layout } from 'lucide-react';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const profileData = {
    username: "johndoe",
    fullName: "John Doe",
    posts: 342,
    followers: 15300,
    following: 891,
    bio: "📸 Photography enthusiast\n🌎 Travel lover\n🎨 Digital creator",
    profileImage: "/api/placeholder/150/150"
  };

  const posts = Array(9).fill(null).map((_, index) => ({
    id: index,
    image: `/api/placeholder/300/300`
  }));

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white">
      {/* Profile Header */}
      <div className="flex items-center p-4 border-b">
        <div className="flex-shrink-0">
          <img
            src={profileData.profileImage}
            alt={profileData.username}
            className="w-20 h-20 rounded-full border"
          />
        </div>
        
        <div className="ml-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">{profileData.username}</h2>
            <button className="px-4 py-1 bg-gray-100 rounded-md text-sm font-semibold">
              Edit Profile
            </button>
            <Settings className="w-6 h-6 text-gray-600" />
          </div>
          
          <div className="flex space-x-8 my-4">
            <span><strong>{profileData.posts}</strong> posts</span>
            <span><strong>{formatNumber(profileData.followers)}</strong> followers</span>
            <span><strong>{formatNumber(profileData.following)}</strong> following</span>
          </div>
          
          <div>
            <h1 className="font-semibold">{profileData.fullName}</h1>
            <p className="whitespace-pre-line text-sm">{profileData.bio}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-around border-t">
        <button
          className={`flex items-center px-4 py-2 border-t-2 ${
            activeTab === 'posts' ? 'border-black' : 'border-transparent'
          }`}
          onClick={() => setActiveTab('posts')}
        >
          <Grid className="w-4 h-4 mr-1" />
          POSTS
        </button>
        <button
          className={`flex items-center px-4 py-2 border-t-2 ${
            activeTab === 'saved' ? 'border-black' : 'border-transparent'
          }`}
          onClick={() => setActiveTab('saved')}
        >
          <Bookmark className="w-4 h-4 mr-1" />
          SAVED
        </button>
        <button
          className={`flex items-center px-4 py-2 border-t-2 ${
            activeTab === 'tagged' ? 'border-black' : 'border-transparent'
          }`}
          onClick={() => setActiveTab('tagged')}
        >
          <Layout className="w-4 h-4 mr-1" />
          TAGGED
        </button>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-1">
        {posts.map((post) => (
          <div key={post.id} className="relative aspect-square">
            <img
              src={post.image}
              alt={`Post ${post.id}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 hover:bg-black hover:bg-opacity-20 transition-all duration-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;