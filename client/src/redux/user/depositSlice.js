import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDeposit: null,
  error: null,
  loading: false,
};

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    depositStart: (state) => {
      state.loading = true;
    },
    depositSuccess: (state, action) => {
      state.userDeposit = action.payload;
      state.loading = false;
      state.error = null;
    },
    depositFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { depositStart, depositSuccess, depositFailure } =
  depositSlice.actions;

export default depositSlice.reducer;
