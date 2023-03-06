import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "../features/favorites/favoritesSlice,js";
import periodSlice from "../features/period/periodSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice,
    period: periodSlice,
  },
});
