import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Report {
  id: string;
  location: { lat: number; lng: number };
  description: string;
  photos: string[];
  anonymous: boolean;
  verified: boolean;
  timestamp: string;
}

interface ReportState {
  reports: Report[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  reports: [],
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<Report[]>) => {
      state.reports = action.payload;
    },
    addReport: (state, action: PayloadAction<Report>) => {
      state.reports.push(action.payload);
    },
    verifyReport: (state, action: PayloadAction<string>) => {
      const report = state.reports.find(r => r.id === action.payload);
      if (report) {
        report.verified = true;
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

export const { setReports, addReport, verifyReport, setLoading, setError } = reportSlice.actions;
export default reportSlice.reducer;
