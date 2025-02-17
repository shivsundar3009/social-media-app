import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, XCircle, Instagram } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useSelector , useDispatch} from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { login } from '../redux/features/userSlice';

export default function CreatePost() {
  const [caption, setCaption] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state?.User?.loggedInUser);
 
  const createPostFunc =  async (formData) => {

    try {

      return axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/createPost`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );  
      
    } catch (error) {

      console.error('Error creating post:', error);
      
    }

  }
   
  // Correctly destructured useMutation
  const { mutate: createPost ,isPending: isLoading } = useMutation({mutationFn : createPostFunc});

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + mediaFiles.length > 10) {
      toast.error('You can upload up to 10 media files only.');
      return;
    }
    const newMedia = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setMediaFiles((prev) => [...prev, ...newMedia]);
  };

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (mediaFiles?.length === 0) {
      toast.error('Please select at least one media file.');
      return;
    }

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('owner', loggedInUser?._id);
    formData.append('userName', loggedInUser?.userName);
    mediaFiles.forEach(({ file }) => formData.append('media', file));

    createPost(formData , {
      onSuccess: (data) => {

        console.log("data in MUTATIO",data)

        if(data?.data?.success){
          toast.success('Post created successfully!');
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getUserById/${loggedInUser?._id}`).then((data) => {
            
            dispatch(login(data?.data?.user))
            
          } ).catch((error) => toast.error(error));
          navigate('/');
        }else{
          toast.error('Failed to create post');
        }
        // toast.success('Post created successfully!');
        // navigate('/');
      },
      onError: (error) => {
        toast.error('Error creating post: ' + error?.message);
      },
    });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-black p-6 min-h-screen relative">
      {isLoading && (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 z-50">
          <p className="text-white text-lg font-semibold mb-4">
            Please wait, uploading your post...
          </p>
          <Instagram size={60} className="text-white animate-spin-slow" />
        </div>
      )}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Create a New Post
        </h2>
        <form onSubmit={handleCreatePost}>
          <input
            type="text"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-3 text-lg"
            disabled={isLoading}
          />
          <div className="mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="media-upload"
              multiple
              accept="image/*,video/*"
              disabled={isLoading}
            />
            <label
              htmlFor="media-upload"
              className={`block text-center py-3 bg-blue-600 text-white rounded-lg cursor-pointer text-lg ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              Select Media
            </label>
          </div>
          {mediaFiles?.length > 0 && (
            <Swiper
              navigation
              modules={[Navigation]}
              className="w-full rounded-lg overflow-hidden"
            >
              {mediaFiles?.map((media, index) => (
                <SwiperSlide key={index} className="relative">
                  {media?.file?.type.startsWith('image') ? (
                    <img
                      src={media?.preview}
                      alt="Preview"
                      className="w-full h-96 object-contain rounded-lg"
                    />
                  ) : (
                    <video
                      src={media?.preview}
                      className="w-full h-96 object-contain rounded-lg"
                      controls
                    />
                  )}
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                    onClick={() => removeMedia(index)}
                  >
                    <XCircle size={22} className="text-white" />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <button
            type="submit"
            className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-lg py-3 rounded-lg ${
              mediaFiles?.length === 0 || isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700'
            }`}
            disabled={isLoading || mediaFiles.length === 0}
          >
            <PlusCircle size={22} />
            {isLoading ? 'Uploading...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );

}

