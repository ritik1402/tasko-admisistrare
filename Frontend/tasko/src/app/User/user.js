import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const LOCAL_STORAGE_KEY = 'usersData';

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
  // if (cached) {
  //   return JSON.parse(cached); 
  // }

  const token = localStorage.getItem('token');
  if (!token) throw new Error("No auth token");

  const response = await axios.get('http://localhost:8000/api/user/getusers', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data)); // Save in cache
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
