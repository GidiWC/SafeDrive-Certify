import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Rating {
  id: string;
  tripId: string;
  driverId: string;
  passengerId: string;
  score: number;
  comment: string;
  timestamp: string;
}

interface RatingState {
  ratings: Rating[];
  loading: boolean;
  error: string | null;
}

const initialState: RatingState = {
  ratings: [],
  loading: false,
  error: null,
};

const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    setRatings: (state, action: PayloadAction<Rating[]>) => {
      state.ratings = action.payload;
    },
    addRating: (state, action: PayloadAction<Rating>) => {
      state.ratings.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setRatings, addRating, setLoading, setError } = ratingSlice.actions;
export default ratingSlice.reducer;
