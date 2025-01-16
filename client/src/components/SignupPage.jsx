import React, { useState, useEffect } from 'react';
import { Instagram, ArrowRight, UserPlus } from 'lucide-react';

export default function SignupPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    number: '',
    fullName: '',
    password: '',
    profilePicture: '',
    username: '',
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

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    alert('Signup completed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Left section */}
      <div className="relative">
        <img src={mockupImage} alt="mockupImage" className="h-[600px]" />
        <img
          src={slides[currentSlide]}
          alt={`slide-${currentSlide}`}
          className="h-[511px] absolute top-6 right-14 transition-opacity duration-5000"
        />
      </div>

      {/* Right section */}
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Instagram className="w-16 h-16 text-pink-500" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">
          {step === 1 ? 'Step 1: Basic Details' : 'Step 2: Profile Setup'}
        </h2>

        {step === 1 && (
          <form className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-3 rounded-md bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center"
            >
              <ArrowRight className="mr-2 h-4 w-4" /> Next
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleChange}
                placeholder="Profile Picture URL"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <button
              type="button"
              onClick={handleBack}
              className="w-full py-3 rounded-md border-2 border-gray-300 text-gray-500 bg-white hover:bg-gray-50 flex items-center justify-center"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center"
            >
              <UserPlus className="mr-2 h-4 w-4" /> Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
