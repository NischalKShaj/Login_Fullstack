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
  },
});

// exporting the functions that are required
export const { loginStart, loginSuccess, loginFailure, adminLogout } =
  adminSlice.actions;

// exporting the reducer functions also
export default adminSlice.reducer;
