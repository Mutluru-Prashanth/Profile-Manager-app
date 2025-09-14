import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
};

type ProfileState = {
  data: ProfileData | null;
  status: 'idle' | 'loading' | 'success' | 'error';
};

const initialState: ProfileState = {
  data: null,
  status: 'idle',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileData>) {
      state.data = action.payload;
      state.status = 'success';
    },
    clearProfile(state) {
      state.data = null;
      state.status = 'idle';
    },
    setStatus(state, action: PayloadAction<ProfileState['status']>) {
      state.status = action.payload;
    },
  },
});

export const { setProfile, clearProfile, setStatus } = profileSlice.actions;
export default profileSlice.reducer;
