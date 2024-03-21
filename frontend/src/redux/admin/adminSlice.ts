import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// creating interface with state
interface AdminState {
  currentAdmin: any;
  loading: boolean;
  error: { message: string } | null;
  userDetails: {};
}

// creating the initial state
const initialState: AdminState = {
  currentAdmin: null,
  loading: false,
  error: null,
  userDetails: {},
};

// creating the admin slice
const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = null;
      state.userDetails = action.payload;
    },
    loginFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminLogout: (state) => {
      state.currentAdmin = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentAdmin.userDetails = state.currentAdmin.userDetails.filter(
        (user: any) => user._id !== action.payload
      );
    },
    userUpdateSuccessAdmin: (state, action: PayloadAction<any>) => {
      console.log(action);
      state.currentAdmin.userDetails = state.currentAdmin.userDetails.map(
        (user: any) => {
          console.log(user);
          if (user._id === action.payload._id) {
            return {
              ...action.payload,
            };
          }

          return user;
        }
      );

      state.loading = false;
      state.error = null;
    },
    userAddedSuccessAdmin: (state, action: PayloadAction<any>) => {
      console.log(action);
      state.currentAdmin.userDetails = [
        ...state.currentAdmin.userDetails,
        action.payload,
      ];

      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = { message: action.payload };
    },
  },
});

// exporting the functions that are required
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  adminLogout,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  userUpdateSuccessAdmin,
  userAddedSuccessAdmin,
} = adminSlice.actions;

// exporting the reducer functions also
export default adminSlice.reducer;
