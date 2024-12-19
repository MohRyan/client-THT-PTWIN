import { API } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(`/cards/findCards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
