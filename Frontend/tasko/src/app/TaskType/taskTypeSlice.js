import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

export const fetchTaskTypes = createAsyncThunk(
  "taskTypes/fetchTaskTypes",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(
      "http://localhost:8000/api/task/taskType",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const taskTypeSlice = createSlice({
  name: "taskTypes",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskTypes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTaskTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTaskTypes.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default taskTypeSlice.reducer;
