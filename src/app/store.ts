import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";

import habitReducer, {
  setNewHabit,
  storage,
  toggleDone,
} from "./features/habit/habitSlice";
import { HabitSlice } from "./features/habit/habitTypes";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(setNewHabit, toggleDone),
  effect: (action, listenerApi) => {
    console.log("Todo added: ", action.payload, listenerApi.getState());
    const state = listenerApi.getState();
    storage.updateStorage(state as { habit: HabitSlice });
  },
});

export const store = configureStore({
  reducer: {
    habit: habitReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
