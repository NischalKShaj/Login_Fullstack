// importing the modules required for creating the user slice
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// creating interface with the state
interface UserState {
  currentUser: any;
  loading: boolean;
  error: string;
}

// creating the initial state
const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: "",
};

// creating the user Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = "";
    },
    loginFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    userUpdateStart: (state) => {
      state.loading = true;
    },
    userUpdateSuccess: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = "";
    },
    userUpdateFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = "";
    },
  },
});

// exporting the functions that are required
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  userUpdateFailure,
  userUpdateStart,
  userUpdateSuccess,
  userLogout,
} = userSlice.actions;
// exporting the reducer function as well
export default userSlice.reducer;
