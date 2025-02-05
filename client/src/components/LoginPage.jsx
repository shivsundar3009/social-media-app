import React, { useState, useEffect } from 'react';
import { Instagram, LogIn, Eye, EyeOff, LeafyGreen } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Navbar} from "./index"
import { useSelector , useDispatch} from 'react-redux'
import { login } from '../redux/features/userSlice';

export default function Login() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const loggedInUser = useSelector((state) => state.User.loggedInUser);

  // if(loggedInUser) {
  //   navigate('/homescreen');
  // }

  const loginSchema = z.object({
    identifier: z.string().nonempty("This field is required"),
    password: z.string().nonempty("Password is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const LoginFunc = async (data) => {
    // Replace with your API endpoint
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/userLogin`,
        data,
        {
          withCredentials:true
        }
      );
       
      // console.log(res)

      return res
      
    } catch (error) {

      console.log(error)

      toast.error(error.response.data.message)

      console.log(`error in axios ${error}`);
      
    }
   

  
  }


  const handleLogin = (data) =>  {

    // console.log(data);

    loginUser( data , {

      onSuccess: (data) => {



        if(data?.data?.success) {
          // console.log(`login success after dat`,data);

         dispatch(login(data?.data?.userData)) 

          toast.success('Login successful!');

          navigate('/homescreen') // Redirect to a dashboard or homepage
        } else {
          toast.error('error in logging in user')
        }
        // toast.success("Login successful!");
        // navigate('/dashbo'); // Redirect to a dashboard or homepage
      },
      onError: (error) => {

        if( import.meta.env.MODE === 'development') {

          console.log(`error in loginMutateFn ${error}`);
          console.log(error)
        }
        // toast.error(error)
        // toast.error(error.message || "Something went wrong!");
      } }
    )


  }
  

  const { mutate: loginUser , isLoading } = useMutation({
    mutationFn: LoginFunc
  });


  const slides = [
    'https://res.cloudinary.com/shivsundar/image/upload/v1736787617/social-media/loginPage/gxaemgxookuq5ovfw91p.png',
    'https://res.cloudinary.com/shivsundar/image/upload/v1736787619/social-media/loginPage/mso7jr6ir4swoluqxo3g.png',
    'https://res.cloudinary.com/shivsundar/image/upload/v1736787619/social-media/loginPage/nmkv4n4lqk13g2mjyyx5.png',
    'https://res.cloudinary.com/shivsundar/image/upload/v1736787619/social-media/loginPage/mxa9dtahp4braqu5owrl.png',
  ];

  const mockupImage =
    'https://res.cloudinary.com/shivsundar/image/upload/v1736787607/social-media/loginPage/u5aflmybzxigtnrz2x2i.png';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
      {/* Left section */}
      <div className="relative">
        <img src={mockupImage} alt="mockup" className="xlCustom:h-[600px] xlCustom:block hidden" />
        <img
          src={slides[currentSlide]}
          alt={`slide-${currentSlide}`}
          className="h-[511px] absolute top-6 right-14 transition-opacity duration-5000"
        />
      </div>

      {/* Right section */}
      <div className="bg-white dark:bg-black dark:border dark:border-gray-500 p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Instagram className="w-16 h-16 text-pink-500" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8 dark:text-gray-400">Log in to your account</h2>
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <input
              type="text"
              placeholder="Enter your Email / userName / Phone"
              {...register('identifier')}
              className="w-full p-3 border dark:text-gray-300 border-gray-300 dark:bg-[#121212] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.identifier && <p className="text-sm text-red-500 mt-1">{errors.identifier.message}</p>}
          </div>
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              {...register('password')}
              className="w-full p-3 border dark:text-gray-300 border-gray-300 dark:bg-[#121212] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {passwordVisible ? (
                <Eye className="text-gray-400 dark:text-gray-300" />
              ) : (
                <EyeOff className="text-gray-400 dark:text-gray-300" />
              )}
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-md bg-pink-500 hover:bg-pink-600 text-gray-200 flex items-center justify-center"
          >
            {isLoading ? 'Loading...' : <><LogIn className="mr-2 h-4 w-4" /> Log In</>}
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-black dark:text-gray-200 text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full py-3 rounded-md border-2 border-pink-500 text-pink-500 dark:bg-pink-500 dark:text-white bg-white hover:bg-pink-50 flex items-center justify-center dark:hover:bg-pink-600">
              <svg
                className="mr-2 h-4 w-4 dark:text-gray-200"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-pink-500 hover:text-pink-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>

    </>
  );
}
