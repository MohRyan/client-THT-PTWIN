import { API } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

export const fetchCartItems = createAsyncThunk(
  "cards/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/cards", {
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

export const addToCart = createAsyncThunk(
  "cards/addToCart",
  async (cart: ICartItems, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const state = getState() as RootState;
      const userId = state.auth.user.sub;

      const response = await API.post(
        "/cards",
        { ...cart, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const updateCartItems = createAsyncThunk(
  "cards/updateCartItems",
  async (
    { Id, quantity }: { Id: string; quantity: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      const state = getState() as RootState;
      const userId = state.auth.user.sub;

      const response = await API.put(
        `/cards/${Id}`,
        { quantity, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCartItems = createAsyncThunk(
  "cards/deleteCartItems",
  async (Id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/cards/${Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return Id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (
    { cardsId, prices }: { cardsId: string; prices: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      const state = getState() as RootState;
      const userId = state.auth.user.sub;

      const response = await API.put(
        `/cards/updateCards/${cardsId}`,
        { prices, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
