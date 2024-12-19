import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductsState } from "../types/state";
import { fetchCategories, fetchProducts } from "../async/productsAsync";
import { RootState } from "..";

const initialState: ProductsState = {
  products: [],
  categories: [],
  mainCategoriesId: "",
  searchTerm: "",
  categoriesId: "",
  minPrice: undefined,
  maxPrice: undefined,
  sortBy: "",
  sortOrder: "asc",
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCategoriesId: (state, action: PayloadAction<string>) => {
      state.categoriesId = action.payload;
    },
    setMainCategoriesId: (state, action: PayloadAction<string>) => {
      state.mainCategoriesId = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number | undefined>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | undefined>) => {
      state.maxPrice = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      });
  },
});

export const {
  setSearchTerm,
  setCategoriesId,
  setMainCategoriesId,
  setMinPrice,
  setMaxPrice,
  setSortBy,
  setSortOrder,
} = productsSlice.actions;

export const selectCategories = (state: RootState) => state.products.categories;
export default productsSlice.reducer;
