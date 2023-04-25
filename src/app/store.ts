import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";

import habitReducer, {
  setNewHabit,
  storage,
  toggleDone,
  updateHabitStrength,
  addHabitToTracker,
  toggleTrackerDay,
} from "./features/habit/habitSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(
    setNewHabit,
    toggleDone,
    updateHabitStrength,
    addHabitToTracker,
    toggleTrackerDay
  ),
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

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
