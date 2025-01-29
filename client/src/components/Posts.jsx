import React from 'react';

const Posts = () => {
  // Sample data for posts
  const posts = [
    {
      id: 1,
      username: 'john_doe',
      avatar: 'https://via.placeholder.com/40',
      content: 'This is a sample post. Tailwind CSS makes styling so easy!',
      likes: 10,
      comments: 3,
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      username: 'jane_smith',
      avatar: 'https://via.placeholder.com/40',
      content: 'Building a social media clone with React and Tailwind is fun!',
      likes: 15,
      comments: 5,
      timestamp: '4 hours ago',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded-lg p-6 mb-6">
          {/* Post Header */}
          <div className="flex items-center mb-4">
            <img
              src={post.avatar}
              alt={`${post.username}'s avatar`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-gray-800">{post.username}</p>
              <p className="text-sm text-gray-500">{post.timestamp}</p>
            </div>
          </div>

          {/* Post Content */}
          <p className="text-gray-700 mb-4">{post.content}</p>

          {/* Post Actions (Likes, Comments) */}
          <div className="flex items-center text-gray-600">
            <button className="flex items-center mr-4 hover:text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{post.likes} Likes</span>
            </button>
            <button className="flex items-center hover:text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{post.comments} Comments</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;