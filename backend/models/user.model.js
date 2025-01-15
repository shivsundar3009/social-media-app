import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

     fullName : {

        type: String,
        required : true,
        trim : true

   },
     userName : {
        type: String,
        required : true,
        unique : true,
        trim : true

     },
     email : {

      type: String,
       unique : true,
       required : true,
       trim : true,
       lowercase : true,
        
     },
     phoneNumber : {

      type : Number,
      unique : true,
      match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']

     },
     age : {
      type : Number,
      required : true,
      min : 18,
      max : 99

     },
     gender : {
      type : String,
      required : true,
      enum : ['male' , 'female' , 'other']

     },
     profilePic : {
      type : String,
      default : ""
     },
     bio : {
      type : String,
      default : ""

     },
     posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
      default: []  // Empty array as default
    },
    
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: []
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: []
    }

} ,{
    timestamps: true
});

const User  = mongoose.model('User' , UserSchema);

export default User;