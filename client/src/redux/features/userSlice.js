import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";


// Async thunk to fetch user data
export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { rejectWithValue }) => {
  try {
    // const token = Cookies.get("token");

    // console.log('token INSIDE asyncTHunk', token);
    
    // if (!token) return rejectWithValue("No token found");

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/updateOnRefresh`, {
      withCredentials: true, //
    });

    console.log("response in async THUNK", response);

    return response?.data?.user; // Return fetched user
  } catch (error) {



     console.log("error in asyncTHUNNK" , error);
     toast.error(error?.response?.data?.error);
    return rejectWithValue(error?.response?.data || "Failed to fetch user");
  }
});

export const UserSlice = createSlice({
    name: 'User',
    initialState: { 
        loggedInUser: null
    },
    reducers: {
      login: (state, action) => {
        state.loggedInUser = action.payload;
      },
      logout: (state) => {
        state.loggedInUser = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.loggedInUser = action.payload;
          state.status = "succeeded";
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.loggedInUser = null;
          state.status = "failed";
          state.error = action.payload;
        });
    },
  });
  
  export const { login, logout } = UserSlice.actions;
  
  export default UserSlice.reducer;