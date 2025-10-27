import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Reward {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  type: 'badge' | 'discount' | 'priority';
}

interface RewardState {
  rewards: Reward[];
  loading: boolean;
  error: string | null;
}

const initialState: RewardState = {
  rewards: [],
  loading: false,
  error: null,
};

const rewardSlice = createSlice({
  name: 'reward',
  initialState,
  reducers: {
    setRewards: (state, action: PayloadAction<Reward[]>) => {
      state.rewards = action.payload;
    },
    unlockReward: (state, action: PayloadAction<string>) => {
      const reward = state.rewards.find(r => r.id === action.payload);
      if (reward) {
        reward.unlocked = true;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setRewards, unlockReward, setLoading, setError } = rewardSlice.actions;
export default rewardSlice.reducer;
