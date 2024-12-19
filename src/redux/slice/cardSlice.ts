import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCards } from "../async/cardAsync";

interface CardState {
  cards: ICards;
  status: "idle" | "loading" | "failed";
}

const initialState: CardState = {
  cards: {} as ICards,
  status: "idle",
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchCards
    builder.addCase(fetchCards.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchCards.fulfilled,
      (state, action: PayloadAction<ICards>) => {
        state.status = "idle";
        state.cards = action.payload;
      }
    );
    builder.addCase(fetchCards.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default cardSlice.reducer;
