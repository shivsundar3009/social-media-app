import React, { useState } from "react";
import { Grid, Bookmark, Settings, Link2 , Instagram } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const fetchUserData = async (userId) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getUserById/${userId}`);
    
    // return response.json();

    // console.log("data inside fetch data",res?.data?.user);

    return res?.data?.user

  } catch (error) {

    console.log(`error in getting USER DATA` , error);

    return null;
  }
};

const UserProfile = () => {

  
  const { userId } = useParams();

  const [isCurrentUserFollowedByLoggedInUser , setIsCurrentUserFollowedByLoggedInUser] = useState(false);
  
  // console.log('userID from USERprofile',userId);
  
  const loggedInUser = useSelector((state) => state?.User?.loggedInUser);
  
  
 
  
  
  
  
  const [activeTab, setActiveTab] = useState("posts");
  
  const { data: userData, error, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserData(userId),
    enabled: userId !== loggedInUser?._id, // Skip fetching if it's the logged-in user
  });
  
  const currentUser = userId === loggedInUser?._id ? loggedInUser : userData;

  const handleFollowFunc = async () => {

    // console.log("inside handleFollowFunc")
    try {

      // console.log("inside Mutate funct follow" );
  
      const handleFollowUrl = isCurrentUserFollowedByLoggedInUser ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/unFollowUser/${currentUser?._id}` : `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/followUser/${currentUser?._id}`
  
      const res = await axios.post( handleFollowUrl  , {} , {
        withCredentials: true,
      });
  
      return res ;


      
    } catch (error) {

      console.log(`error in handleFollowFunc` , error);
      
    }

  };

  const { mutate: handleFollowMutation , isLoading : isFollowMutationLoading } = useMutation({
    mutationFn: handleFollowFunc,
    onSuccess: (data) => {
      // console.log("data in handleFollow after MUTATION success",data);

      setIsCurrentUserFollowedByLoggedInUser(prev =>!prev);
      // toast.success(data?.data?.message)
    },
    onError: (error) => {
      console.log('error in handleFollowMutation', error);
    }
  });

  useEffect(()=>{

     if(userData) {

      if(loggedInUser &&  currentUser?._id !== loggedInUser?._id){

        // console.log('USERDATA , CURRENT USER' ,currentUser);

        // console.log("logged in user" ,loggedInUser);
        // console.log("current UserID" , userId);
        
        const isFollowing = loggedInUser?.following?.includes(currentUser?._id);
  
        // console.log("isFOLLOWINF" , isFollowing);
        
        setIsCurrentUserFollowedByLoggedInUser(isFollowing);
      };

     }
    
    if(loggedInUser &&  userId !== loggedInUser?._id){

      // console.log("logged in user" ,loggedInUser);
      // console.log("current UserID" , userId);
      
      const isFollowing = loggedInUser?.following?.includes(currentUser?._id);

      // console.log("isFOLLOWINF" , isFollowing);
      
      setIsCurrentUserFollowedByLoggedInUser(isFollowing);
    };
    
  },[userData]);

  if (isLoading) {
    return (
      <div className="mt-10 min-h-screen flex flex-col items-center justify-center">
        <Instagram className="w-12 h-12 text-gray-500 animate-spin" />
        <p className="mt-2 text-lg text-gray-600">Loading user data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="mt-10 min-h-screen flex flex-col items-center justify-center">
        <Instagram className="w-12 h-12 text-red-500" />
        <p className="mt-2 text-2xl text-red-500">Error loading user data</p>
      </div>
    );
  }
  
  if (!currentUser) {
    return (
      <div className="mt-10 min-h-screen flex flex-col items-center justify-center">
        <Instagram className="w-12 h-12 text-gray-500" />
        <p className="mt-2 text-2xl text-gray-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-6">
        <div className="w-24 h-24 md:w-40 md:h-40">
          <img
            src={currentUser?.profilePicture || "/default-profile.png"}
            alt={currentUser?.userName}
            className="w-full h-full rounded-full object-cover border border-gray-200"
          />
        </div>

        {/* Profile Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-lg font-semibold">{currentUser?.userName}</h1>
            {loggedInUser && loggedInUser?._id !== currentUser?._id && (
              <div className="flex gap-2">
                <button className={`${isCurrentUserFollowedByLoggedInUser ? 'bg-slate-500' : "bg-blue-500" } text-white px-4 md:px-6 py-1.5 rounded-lg font-semibold text-sm`}
                onClick={handleFollowMutation}>
                  {isCurrentUserFollowedByLoggedInUser ? "unFollow" : "Follow"}
                </button>
                <button className="bg-gray-100 px-4 md:px-6 py-1.5 rounded-lg font-semibold text-sm">
                  Message
                </button>
              </div>
            )}
            {loggedInUser && loggedInUser?._id === currentUser?._id && (
              <Link to="/settings" className="bg-gray-100 p-2 rounded-lg">
                <Settings size={16} />
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-4">
            <div>
              <span className="font-semibold">{currentUser?.posts?.length || 0}</span> posts
            </div>
            <div>
              <span className="font-semibold">{currentUser?.followers?.length || 0}</span> followers
            </div>
            <div>
              <span className="font-semibold">{currentUser?.following?.length || 0}</span> following
            </div>
          </div>

          {/* Bio */}
          <div className="text-sm">
            <div className="font-semibold mb-1">{currentUser?.fullName}</div>
            <div className="whitespace-pre-line">{currentUser?.bio || "No bio available"}</div>
            {currentUser?.website && (
              <a
                href={`https://${currentUser.website}`}
                className="text-blue-900 font-semibold flex items-center gap-1 mt-1"
              >
                <Link2 size={14} /> {currentUser?.website}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex justify-center border-b border-gray-200 mb-4">
        <button
          className={`flex items-center gap-1 py-2 px-6 text-sm font-semibold ${
            activeTab === "posts" ? "border-b-2 border-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          <Grid size={16} /> Posts
        </button>
        <button
          className={`flex items-center gap-1 py-2 px-6 text-sm font-semibold ${
            activeTab === "saved" ? "border-b-2 border-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("saved")}
        >
          <Bookmark size={16} /> Saved
        </button>
      </div>

      {/* User Posts / Saved Posts */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-4 min-h-96">
        {(activeTab === "posts" ? currentUser?.posts : currentUser?.savedPosts || [])?.length > 0 ? (
          (activeTab === "posts" ? currentUser?.posts : currentUser?.savedPosts).map((post, postIndex) =>
            post?.media?.map((med, mediaIndex) => (
              <div key={`${postIndex}-${mediaIndex}`} className="relative aspect-square group">
                {med?.mediaType === "image" ? (
                  <img src={med?.url} alt="Post" className="w-full h-full object-cover" />
                ) : med?.mediaType === "video" ? (
                  <video controls className="w-full h-full object-cover">
                    <source src={med?.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </div>
            ))
          )
        ) : (
          <div className="text-gray-500 text-lg col-span-2 md:col-span-3 text-center">
            {activeTab === "posts" ? "No posts available" : "No saved posts"}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
