import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import driverReducer from './slices/driverSlice';
import ratingReducer from './slices/ratingSlice';
import reportReducer from './slices/reportSlice';
import rewardReducer from './slices/rewardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    driver: driverReducer,
    rating: ratingReducer,
    report: reportReducer,
    reward: rewardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
