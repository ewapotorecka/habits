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

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(setNewHabit, toggleDone),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as ReturnType<typeof store.getState>;

    storage.updateStorage(state.habit);
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
