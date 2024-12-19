import { API } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const products = response.data;

      return products;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/categories", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
