import { createAsyncThunk } from '@reduxjs/toolkit';
import useUserService from 'services/user.service';

export const fetchMe = createAsyncThunk('users/me', async () => {
  return [];
});
