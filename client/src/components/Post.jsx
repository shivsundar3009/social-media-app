import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

// Function to fetch posts from the backend
const fetchPosts = async (pageParam) => {

  console.log("pageParam inside fetchposts ln 14" , pageParam);
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/getAllPosts?page=${pageParam}`
  );
  console.log(" response Inside fetchProducts ln 18",response.data);

  return response.data;
};

// InstagramPost component that renders individual posts
const InstagramPost = ({ post }) => {
  console.log('instapraPOST INSIDE 25',post);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const timeAgo = formatDistanceToNow(new Date(post.createdAt))
  .replace(/^about /, "") .replace(" seconds", "s")
  .replace(" second", "s")
  .replace(" minutes", "m")
  .replace(" minute", "m")
  .replace(" hours", "h")
  .replace(" hour", "h")
  .replace(" days", "d")
  .replace(" day", "d")
  .replace(" weeks", "w")
  .replace(" week", "w")
  .replace(" months", "mo")
  .replace(" month", "mo")
  .replace(" years", "y")
  .replace(" year", "y");;;

  return (
    <div className="max-w-xl bg-white rounded-lg shadow mb-6">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-purple-600 rounded-full p-[2px]">
            <div className="w-full h-full bg-white rounded-full p-[2px]">
              <img
                src={post.owner.profilePicture}
                alt={`${post.owner.userName}'s profile`}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <span className="font-semibold text-sm">{post.owner.userName}</span>
          <span className="text-xs text-gray-400 ml-2">{timeAgo}</span>
        </div>
        <button className="text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Images / Carousel */}
      <div className="relative">
        <Swiper navigation modules={[Navigation]} className="w-full rounded-lg overflow-hidden">
          {post.media.map((mediaItem, index) => (
            <SwiperSlide key={index}>
              {mediaItem.mediaType === 'image' ? (
                <img
                  src={mediaItem.url}
                  alt={`Post media ${index + 1}`}
                  className="w-full h-[450px] object-contain"
                />
              ) : (
                <video src={mediaItem.url} className="w-full h-[450px] object-contain" controls />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`hover:text-gray-600 ${isLiked ? 'text-red-500' : 'text-gray-700'}`}
            >
              <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
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
            <Bookmark size={24} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Likes */}
        <div className={`mb-2 ${post.likedBy.length > 0 ? 'block' : 'hidden'}`}>
          <span className="font-semibold text-sm">{post.likedBy.length} likes</span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <span className="font-semibold text-sm mr-2">{post.owner.userName}</span>
          <span className="text-sm">{post.caption}</span>
        </div>

        {/* Comments */}
        <div className={`text-gray-500 text-sm mb-2 ${post.comments.length > 0 ? 'block' : 'hidden'}`}>
          View all {post.comments.length} comments
        </div>

        {/* Timestamp */}
        {/* <div className="text-gray-400 text-xs uppercase">{new Date(post.createdAt).toLocaleString()}</div> */}
      </div>
    </div>
  );
};

// Feed component that renders multiple posts with Load More button
const InstagramFeed = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    // hasPreviousPage,
    isFetchingNextPage,
    // status,
    isLoading,
    isError,
    ...result
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam), 
    getNextPageParam: (lastPage , allPages) => {
      console.log("lastPage", lastPage);
      console.log("allPages", allPages);
      return lastPage.nextPage ? lastPage.nextPage : null;
    }, // Auto-fetch next page
  });
 
  console.log('130 hsanectPAGE',hasNextPage);
  // console.log(hasPreviousPage);
  // console.log("data returned from infinite",data);
  console.log("result gett",result);

  // const [loading, setLoading] = useState(false);

  // const data = [];

  // Handle Load More Button Click
  const handleLoadMore = () => {
    if (!isFetchingNextPage && data) {
      // setLoading(true);
      fetchNextPage();
      // setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Failed to fetch posts. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      {data?.pages?.map((page, pageIndex) =>
        page.posts.map((post) => (
          <div key={post._id}>
            <InstagramPost post={post} />
          </div>
        ))
      )}

      {/* Load More Button */}
      {hasNextPage && !isFetchingNextPage && (
        <button
          onClick={handleLoadMore}
          className="w-full text-center py-3 bg-blue-500 text-white rounded-full mt-4"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}

      {/* Loading More Indicator */}
      {isFetchingNextPage && (
        <div className="text-center my-4">
          <p>Loading more posts...</p>
        </div>
      )}
    </div>
  );
};

export default InstagramFeed;
