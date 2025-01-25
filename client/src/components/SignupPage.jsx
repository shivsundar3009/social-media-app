import React, { useState, useEffect } from "react";
import { Instagram, ArrowRight, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignupPage() {

  const navigate = useNavigate();

  const checkIfUserExists = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/checkIfUserExists`,
        data,
        {}
      );

      return res;
    } catch (error) {
      return "error in checkIfUsesExists:", error;
    }
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    fullName: "",
    age: 0,
    gender: "",
    password: "",
    userName: "",
    profilePicture: "",
  });

  const stepSchemas = [
    z.object({
      email: z
        .string()
        .email({ message: "Please enter a valid email address." })
        .nonempty({ message: "Email is required." }),
      phoneNumber: z
        .string()
        .regex(/^\d{10}$/, {
          message: "Phone number must be exactly 10 digits.",
        })
        .nonempty({ message: "Phone number is required." }),
      fullName: z
        .string()
        .min(3, { message: "Full name must be at least 3 characters long." })
        .max(50, { message: "Full name must not exceed 50 characters." })
        .nonempty({ message: "Full name is required." }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(50, { message: "Password must not exceed 50 characters." })
        .nonempty({ message: "Password is required." }),
      age: z
        .string()
        .transform((val) => parseInt(val, 10)) // Convert string to number
        .refine((val) => !isNaN(val), {
          message: "Age must be a valid number.",
        }) // Ensure valid number
        .refine((val) => val >= 18, { message: "Age must be at least 18." }) // Ensure minimum age
        .refine((val) => val <= 99, { message: "Age must not exceed 99." }), // Ensure maximum age
      gender: z
         .enum(["male", "female", "other"], { message: "Gender is required." }),  
    }),
    z.object({
      profilePicture: z
        .string()
        .url({ message: "Profile picture must be a valid URL." })
        .nonempty({ message: "Profile picture URL is required." }),
      userName: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(20, { message: "Username must not exceed 20 characters." })
        .nonempty({ message: "Username is required." }),
    }),
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(stepSchemas[step - 1]),
    defaultValues: {
      profilePicture: "",
    },
  });

  const { mutate : checkUser } = useMutation({
    mutationFn: checkIfUserExists,
  });

  const createUser = async (data) => {

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/createUser`,
        data,
        {}
      );
      
      return res;
      
    } catch (error) {

      return error
      
    }
   
  }

  const { mutate : registerUser } = useMutation({
    mutationFn: createUser,
  });

  const handleSubmitStep1 = (data) => {

    setFormData({
      email: data.email,
      phoneNumber: data.phoneNumber,
      fullName: data.fullName,
      age: data.age,
      gender: data.gender,
      password: data.password,

    })
    // console.log("formData in handleSubmit",formData);
    console.log(data);

    const checkData = {
      email: data.email,
      phoneNumber: data.phoneNumber,
    };

         checkUser(checkData, {
      onSuccess: (data) => {
        console.log(data);
        
        // console.log("formData in mutationSuccess",formData);
        // if(data.d)

        // alert('mutate working')

        if (data?.data?.success) {

          // console.log("data is successfully saved in formData object" , formData);
          setStep(2);
        } else {
          setFormData({
            email: "",
            number: "",
            fullName: "",
            age: 0,
            gender: "",
            password: "",
          })
          toast.error(data?.data?.message);
          // alert(data.data.message);
        }


      },
      onError: (error) => {
   
        setFormData({
          email: "",
          number: "",
          fullName: "",
          age: 0,
          gender: "",
          password: "",
        })
        // console.log("formData in mutationFailed",formData);
        // alert(`alert in mutation : ${error.message}`);
      },
    });
    // setStep(2);

    // console.log(data);
    // // console.log('Submitted data:', formData);
    // alert('Signup completed successfully! step 1');
  };

  // useEffect(() => {
  //   console.log("Updated formData useEFFECT:", formData);
  // }, [formData]);

  const handleSubmitStep2 = (data) => {

    console.log(formData);

    setFormData({
      ...formData,
      profilePicture: data.profilePicture,
      userName: data.userName,
    });
    
    console.log('data from step2' , data);

    registerUser({
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      fullName: formData.fullName,
      age: formData.age,
      gender: formData.gender,
      password: formData.password,
      profilePicture: data.profilePicture,
      userName: data.userName,
    }, {
       
      onSuccess : (data) => {
           
        console.log(data); 
        
        if(data?.data?.success){ 

          toast.success('Signup completed successfully!');

          // alert('mutate working')
          navigate('/')

 
        } else {

          console.log(`success failed error ` , data);
          toast.error(data?.response?.data?.message);
          // alert(data.data.message);
        }


      },
      onError : (error) => {
        // console.log("formData in mutationFailed",formData);
        alert(`alert in mutation : ${error.message}`);
      }
    })
       

  };

  // const handleSubmit = () => {
  //   // console.log('Submitted data:', formData);
  //   alert('Signup completed successfully!');
  // }

  const [profilePictures, setProfilePictures] = useState([]);

  const [slides, setSlides] = useState([]);

  const [profileOption, setProfileOption] = useState(
    "selectYourProfilePicture"
  );

  const mockupImage =
    "https://res.cloudinary.com/shivsundar/image/upload/v1736787607/social-media/loginPage/u5aflmybzxigtnrz2x2i.png";

  useEffect(() => {
    // Fetch the profile pictures only once when the component mounts
    setProfilePictures([
      "https://res.cloudinary.com/shivsundar/image/upload/v1737042591/social-media/profileIconsPre/dgqbzxvbbz1lkhtc2mzb.png",
      "https://res.cloudinary.com/shivsundar/image/upload/v1737042589/social-media/profileIconsPre/fcidkvtqvrfzgn5ppvbg.png",
      "https://res.cloudinary.com/shivsundar/image/upload/v1737042585/social-media/profileIconsPre/me58p5hdn0si9jtvdjzu.png",
      "https://res.cloudinary.com/shivsundar/image/upload/v1737042581/social-media/profileIconsPre/rhaynovssea4b8jc9mot.png",
      "https://res.cloudinary.com/shivsundar/image/upload/v1737042579/social-media/profileIconsPre/vr32eclnzwtzqh6piumc.png",
      "https://res.cloudinary.com/shivsundar/image/upload/v1737042574/social-media/profileIconsPre/ehnzd1wmn7x7do0swrxp.png",
    ]);

    setSlides([
      "https://res.cloudinary.com/shivsundar/image/upload/v1736787617/social-media/loginPage/gxaemgxookuq5ovfw91p.png",
      "https://res.cloudinary.com/shivsundar/image/upload/v1736787619/social-media/loginPage/mso7jr6ir4swoluqxo3g.png",
      "https://res.cloudinary.com/shivsundar/image/upload/v1736787619/social-media/loginPage/nmkv4n4lqk13g2mjyyx5.png",
      "https://res.cloudinary.com/shivsundar/image/upload/v1736787619/social-media/loginPage/mxa9dtahp4braqu5owrl.png",
    ]);
  }, []); // Empty dependency array means this effect runs only once after the initial render.

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3200);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Submitted data:', formData);
  //   alert('Signup completed successfully!');
  // };

  const [selectedProfilePicture, setSelctedProfilePicture] = useState("");

  const handleClick = (image) => {
    console.log("clicked image", image);

    setValue("profilePicture", image);

    setSelctedProfilePicture(image);
  };

  // const backendURL = import.meta.env.VITE_BACKEND_URL
  //  console.log("this is backend URL",backendURL);

  // const [selectedGender, setSelctedGender] = useState("male");

  // const handleGenderChange = (e) => {
  //   setSelctedGender(e.target.value);
  // };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
      {/* Left section */}
      <div className="relative">
        <img src={mockupImage} alt="mockupImage" className="xlCustom:h-[600px] xlCustom:block hidden"  />
        <img
          src={slides[currentSlide]}
          alt={`slide-${currentSlide}`}
          className="h-[511px] absolute top-6 right-14 transition-opacity duration-5000"
        />
      </div>

      {/* Right section */}
      <div className="bg-white dark:bg-black dark:border dark:border-gray-500 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8 dark:text-gray-400">
          {step === 1 ? "Step 1: Basic Details" : "Step 2: Profile Setup"}
        </h2>

        {step === 1 && (
          <form
            className="space-y-6"
            onSubmit={handleSubmit(handleSubmitStep1)}
          >
            <div>
              <input
                type="email"
                name="email"
                // value={formData.email}
                // onChange={handleChange}
                {...register("email")}
                placeholder="Email address"
                className="w-full p-3 border dark:text-gray-300 border-gray-300 dark:bg-[#121212] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              {/* {console.log(errors)} */}
            </div>

            <div>
              <input
                type="text"
                name="phoneNumber"
                // value={formData.number}
                // onChange={handleChange}
                {...register("phoneNumber")}
                placeholder="Phone Number"
                className="w-full p-3 border dark:text-gray-300 border-gray-300 dark:bg-[#121212] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-transparent"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="fullName"
                // value={formData.fullName}
                // onChange={handleChange}
                {...register("fullName")}
                placeholder="Full Name"
                className="w-full p-3 border dark:text-gray-300 border-gray-300 dark:bg-[#121212] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-transparent"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="number"
                name="age"
                placeholder="Age"
                {...register("age")}
                className="w-full p-3 border dark:text-gray-300 border-gray-300 dark:bg-[#121212] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-transparent"
              />
              {errors.age && (
                <p className="text-red-500 text-sm">{errors.age.message}</p>
              )}
            </div>

            <div>
              <div className="flex gap-5 items-center">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    // checked={selectedGender === "male"}
                    // onChange={handleGenderChange}
                    {...register("gender")}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    // checked={selectedGender === "female"}
                    // onChange={handleGenderChange}
                    {...register("gender")}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    // checked={selectedGender === "other"}
                    // onChange={handleGenderChange}
                    {...register("gender")}
                  />
                  Other
                </label>

              </div>
                {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
              {/* <p>Selected Gender: {selectedGender}</p> */}
            </div>

            <div>
              <input
                type="password"
                name="password"
                // value={formData.password}
                // onChange={handleChange}
                {...register("password")}
                placeholder="Password"
                className="w-full p-3 border dark:text-gray-300 border-gray-300 dark:bg-[#121212] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-transparent"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center"
            >
              <ArrowRight className="mr-2 h-4 w-4" /> Next
            </button>
            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-medium text-pink-500 hover:text-pink-600"
              >
                Log In
              </Link>
            </p>
          </form>
        )}

        {step === 2 && (
          <form
            className="space-y-6"
            onSubmit={handleSubmit(handleSubmitStep2)}
          >
            <div>
              <input
                type="text"
                name="userName"
                // value={formData.username}
                // onChange={handleChange}
                // {...register("userName")}
                {...register("userName")}
                placeholder="Userame"
                className="w-full p-3 border dark:text-gray-300 border-gray-300 dark:bg-[#121212] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-transparent"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Selection Option */}
            <div className="space-y-3 mt-4">
              <label className="text-sm text-gray-600 dark:text-gray-300 block">
                Choose Profile Picture Option:
              </label>
              <div className="flex items-center space-x-4">
                {/* Pre-selected Profile Option */}
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="profileOption"
                    value="predefined"
                    checked={profileOption === "selectYourProfilePicture"}
                    onChange={() => {
                      setProfileOption("selectYourProfilePicture");
                      setSelctedProfilePicture("");
                    }}
                    className="form-radio text-pink-500"
                  />
                  <span className="text-gray-600 dark:text-gray-300">
                    Select Profile Picture
                  </span>
                </label>

                {/* Upload Profile Option */}
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="profileOption"
                    value="upload"
                    checked={profileOption === "uploadYourProfilePicture"}
                    onChange={() => {
                      setProfileOption("uploadYourProfilePicture");
                      setSelctedProfilePicture("");
                    }}
                    className="form-radio text-pink-500"
                  />
                  <span className="text-gray-600 dark:text-gray-300">
                    Upload Your Own
                  </span>
                </label>
              </div>
            </div>

            {/* Predefined Profile Pictures */}
            {profileOption === "selectYourProfilePicture" && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {profilePictures.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`profile-${index}`}
                    className={`h-24 cursor-pointer rounded-full ${
                      selectedProfilePicture === image
                        ? "border-4 border-pink-500"
                        : "border-4 border-transparent"
                    }`}
                    onClick={() => handleClick(image)}
                  />
                ))}
              </div>
            )}

            {/* Upload Profile Picture */}
            {profileOption === "uploadYourProfilePicture" && (
              <div className="mt-4 text-center">
                <label className="text-sm text-gray-600 dark:text-gray-300">
                  Upload Your Profile Picture
                </label>
                <input
                  type="file"
                  name="profilePictureUpload"
                  className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-500 dark:bg-[#121212] rounded-md text-gray-200"
                  onChange={(e) => handleProfilePictureUpload(e)} // Handle upload later
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-6 space-y-4">
              <button
                type="button"
                onClick={handleBack}
                className="w-full py-3 rounded-md border-2 border-gray-300 text-gray-500 bg-white hover:bg-gray-50 dark:bg-[#121212] dark:text-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-full py-3 rounded-md bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center"
              >
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
