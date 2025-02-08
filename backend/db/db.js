import mongoose from "mongoose";
import User from "../models/user.model.js"; // Adjust path if needed
import bcrypt from "bcrypt";

const profilePics = [
  "https://res.cloudinary.com/shivsundar/image/upload/v1737042591/social-media/profileIconsPre/dgqbzxvbbz1lkhtc2mzb.png",
  "https://res.cloudinary.com/shivsundar/image/upload/v1737042589/social-media/profileIconsPre/fcidkvtqvrfzgn5ppvbg.png",
  "https://res.cloudinary.com/shivsundar/image/upload/v1737042585/social-media/profileIconsPre/me58p5hdn0si9jtvdjzu.png",
  "https://res.cloudinary.com/shivsundar/image/upload/v1737042581/social-media/profileIconsPre/rhaynovssea4b8jc9mot.png",
  "https://res.cloudinary.com/shivsundar/image/upload/v1737042579/social-media/profileIconsPre/vr32eclnzwtzqh6piumc.png",
  "https://res.cloudinary.com/shivsundar/image/upload/v1737042574/social-media/profileIconsPre/ehnzd1wmn7x7do0swrxp.png",
];

const getRandomProfilePic = () => profilePics[Math.floor(Math.random() * profilePics.length)];

const createDemoUsers = async () => {
  const existingUsers = await User.countDocuments();
  if (existingUsers > 0) {
    console.log("Demo users already exist. Skipping creation.");
    return;
  }

  const users = [];
  for (let i = 1; i <= 50; i++) {
    users.push({
      userName: `shiv${i}`,
      fullName: `shiv w${i}`,
      email: `shiv${i}@gmail.com`,
      phoneNumber: `99999999${i.toString().padStart(2, "0")}`,
      age: Math.floor(Math.random() * (58 - 18 + 1)) + 18,
      gender: i % 2 === 0 ? "male" : "female",
      password: await bcrypt.hash(`Shiv${i}@123`, 10),
      profilePicture: getRandomProfilePic(),
    });
  }

  await User.insertMany(users);
  console.log("✅ 50 Demo Users Created!");
};

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected...");
    
    // Auto-create 50 demo users after connection
    await createDemoUsers();
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};
