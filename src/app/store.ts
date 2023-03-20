import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./features/habit/habitSlice";

export const store = configureStore({
  reducer: {
    habit: habitReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
