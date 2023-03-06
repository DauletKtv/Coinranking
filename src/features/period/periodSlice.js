import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  period: "24h",
};

export const periodSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setPeriod: (state, action) => {
      state.period = action.payload;
    },
  },
});

export const { setPeriod } = periodSlice.actions;
export default periodSlice.reducer;
