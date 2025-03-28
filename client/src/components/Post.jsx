import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal , Instagram } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import {Link} from "react-router-dom"
import { useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

// Function to fetch posts from the backend
const fetchPosts = async (pageParam) => {

  // console.log("pageParam inside fetchposts ln 14" , pageParam);
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/getAllPosts?page=${pageParam}`
  );
  // console.log(" response Inside fetchProducts ln 18",response.data);

  return response?.data;
};

// InstagramPost component that renders individual posts
const InstagramPost = ({ post }) => {
  const [isPostSaved , setIsPostSaved] = useState(false);
  const [isPostLiked , setIsPostLiked] = useState(false);

  const testRef = useRef();

  // console.log(`postIDDDDDDD` , post._id);

  const loggedInUser = useSelector( (state) => state?.User?.loggedInUser );

  // console.log('savedPOSTS' , loggedInUser.savedPosts);

  // console.log(`loggedInUser` , loggedInUser);


  const isLoggedInUserOwner = loggedInUser?._id === post?.owner?._id ;

  const isPostBookMarked = !isLoggedInUserOwner && loggedInUser?.savedPosts?.some((savedPost => savedPost?._id === post?._id));
  
  // console.log("isPostBookMarked" , isPostBookMarked);
  const isPostLikedCheck = post?.likedBy?.includes(loggedInUser?._id);

  // console.log("posttTTT" ,post)

  // console.log(`isPostLiked ${post._id}`,isPostLiked);

  // console.log('isPostBookMarked', isPostBookMarked);


 
  useEffect(() => {

    // console.log('isPostSaved', isPostSaved);

    setIsPostSaved(isPostBookMarked);

    setIsPostLiked(isPostLikedCheck);

  }, []);


  const handleClickBookMark = () => {

    // console.log(`inside handle CLICK`);

    
    // setIsPostSaved( prev => !prev);

    handleBookMarkMutation();
    
  };

  const handleClickLike = () => {

    
    console.log(`inside handle CLICK LIKE`);

    handleLikeMutation();

    // setIsPostLiked(prev =>!prev);
  };

 const handleLikeFunc = async ( ) => {

  try {

    console.log("inside Mutate funct like" , post?._id);

    const handleLikeUrl = isPostLiked ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/unLikePost/${post?._id}` : `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/likePost/${post?._id}`

    const res = await axios.post( handleLikeUrl   , {} , {
      withCredentials: true,
    });

    return res ;
    
  } catch (error) {

    console.log('error in likePostFunc', error);

    toast.error("error in likePostFunc", error);
    
  }



 };

  const handleBookMarkFunc = async ( ) => {

    try {

      console.log("inside Mutate funct like" , post?._id);
  
      const handleBookMarkUrl = isPostSaved ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/unBookMarkPost/${post?._id}` : `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/bookMarkPost/${post?._id}`
  
      const res = await axios.post( handleBookMarkUrl  , {} , {
        withCredentials: true,
      });
  
      return res ;
      
    } catch (error) {
  
      console.log('error in bookmarkFunc', error);
  
      toast.error("error in bookmarkFunc", error);
      
    }

 };
 
 const { mutate: handleLikeMutation} = useMutation({
  mutationFn: handleLikeFunc,
  onSuccess: (data) => {

    console.log("data in handleLikePost after MUTATION success",data)

    toast.success(data?.data?.message)

    setIsPostLiked(prev =>!prev);


  },
  onError: (error) => {

    console.log('error in after likePostMutation', error);

  }
});

 const { mutate: handleBookMarkMutation } = useMutation({
  mutationFn: handleBookMarkFunc,
  onSuccess: (data) => {

    console.log("data in handleBookMark after MUTATION success",data)

    toast.success(data?.data?.message)

    setIsPostSaved(prev =>!prev);


  },
  onError: (error) => {

    console.log('error in after bookMarkMutation', error);

  }
});

  
  const timeAgo = formatDistanceToNow(new Date(post?.createdAt))
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
                src={post?.owner?.profilePicture}
                alt={`${post?.owner?.userName}'s profile`}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <Link to={`/userProfile/${post?.owner?._id}`} className="font-semibold text-sm underline">{post?.owner?.userName}</Link>
          <span className="text-xs text-gray-400 ml-2">{timeAgo}</span>
        </div>
        <button className="text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Images / Carousel */}
      <div className="relative">
        <Swiper navigation modules={[Navigation]} className="w-72 sm:w-full overflow-hidden">
          {post?.media?.map((mediaItem, index) => (
            <SwiperSlide key={index}>
              {mediaItem?.mediaType === 'image' ? (
                <img
                  src={mediaItem?.url}
                  alt={`Post media ${index + 1}`}
                  className=" h-52 sm:h-[400px] w-full  object-cover"
                />
              ) : (
                <video src={mediaItem?.url} className="w-full sm:h-[400px] object-contain" controls />
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
              onClick={handleClickLike}
              className={`hover:text-gray-600 ${isPostLiked ? 'text-red-500' : 'text-gray-700'}`}
            >
              <Heart size={24} fill={isPostLiked ? 'currentColor' : 'none'} />
            </button>
            <button className="text-gray-700 hover:text-gray-600">
              <MessageCircle size={24} />
            </button>
            <button className="text-gray-700 hover:text-gray-600">
              <Share2 size={24} />
            </button>
          </div>
          {!isLoggedInUserOwner && <button
            onClick={handleClickBookMark}
            className={`text-gray-700 hover:text-gray-600 ${isPostSaved ? 'text-black' : ''}`}
          >
            <Bookmark size={24} fill={isPostSaved ? 'currentColor' : 'none'} />
          </button>
}
        </div>

        {/* Likes */}
        <div className={`mb-2 ${post?.likedBy?.length > 0 ? 'block' : 'hidden'}`}>
          <span className="font-semibold text-sm">{post?.likedBy?.length} likes</span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <span className="font-semibold text-sm mr-2">{post?.owner?.userName}</span>
          <span className="text-sm">{post?.caption}</span>
        </div>

        {/* Comments */}
        <div className={`text-gray-500 text-sm mb-2 ${post?.comments?.length > 0 ? 'block' : 'hidden'}`}>
          View all {post?.comments?.length} comments
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
      // console.log("lastPage", lastPage);
      // console.log("allPages", allPages);
      return lastPage?.nextPage ? lastPage?.nextPage : null;
    }, // Auto-fetch next page
  });
 
  // console.log('130 hsanectPAGE',hasNextPage);
  // console.log(hasPreviousPage);
  // console.log("data returned from infinite",data);
  // console.log("result gett",result);

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

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex justify-center items-center">
  //       <p>Loading posts... ISLOADING</p>
  //     </div>
  //   );
  // }

  if (isLoading) {
    return (
      <div className="mt-10 min-h-screen flex flex-col items-center justify-center">
        <Instagram className="w-12 h-12 text-gray-500 animate-spin" />
        <p className="mt-2 text-lg text-gray-600">Loading Posts...</p>
      </div>
    );
  }

  // if (isError) {
  //   return (
  //     <div className="min-h-screen flex justify-center items-center">
  //       <p>Failed to fetch posts. Please try again later.</p>
  //     </div>
  //   );
  // }

  if (isError) {
    return (
      <div className="mt-10 min-h-screen flex flex-col items-center justify-center">
        <Instagram className="w-12 h-12 text-red-500" />
        <p className="mt-2 text-2xl text-red-500">Error loading posts</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      {data?.pages?.map((page, pageIndex) =>
        page?.posts?.map((post) => (
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
