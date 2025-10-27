import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Driver {
  id: string;
  name: string;
  email: string;
  licenseNumber: string;
  rating: number;
  isCertified: boolean;
  incidents: number;
  trips: number;
}

interface DriverState {
  drivers: Driver[];
  currentDriver: Driver | null;
  loading: boolean;
  error: string | null;
}

const initialState: DriverState = {
  drivers: [],
  currentDriver: null,
  loading: false,
  error: null,
};

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setDrivers: (state, action: PayloadAction<Driver[]>) => {
      state.drivers = action.payload;
    },
    setCurrentDriver: (state, action: PayloadAction<Driver>) => {
      state.currentDriver = action.payload;
    },
    updateDriver: (state, action: PayloadAction<Partial<Driver>>) => {
      if (state.currentDriver) {
        state.currentDriver = { ...state.currentDriver, ...action.payload };
      }
    },
    certifyDriver: (state) => {
      if (state.currentDriver) {
        state.currentDriver.isCertified = true;
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

export const { setDrivers, setCurrentDriver, updateDriver, certifyDriver, setLoading, setError } = driverSlice.actions;
export default driverSlice.reducer;
