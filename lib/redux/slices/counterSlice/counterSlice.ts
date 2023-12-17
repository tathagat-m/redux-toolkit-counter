/* Core */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { incrementIfOddAsync } from "./thunks";

const initialState: CounterSliceState = {
  value: 0,
  status: "idle",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // increment, decreament, incrementByAmount logic here
    increment: (state: CounterSliceState) => {
      state.value += 1;
    },
    decrement: (state: CounterSliceState) => {
      state.value -= 1;
    },
    incrementByAmount: (state: CounterSliceState, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(incrementIfOddAsync.pending, (state: CounterSliceState) => {
      state.status = "loading"
    })
    .addCase(incrementIfOddAsync.fulfilled, (state: CounterSliceState, action: PayloadAction<number>) => {
      state.status = "idle"
      state.value += action.payload
    })
    .addCase(incrementIfOddAsync.rejected, (state: CounterSliceState) => {
      state.status = "failed"
    })
  },
});

/* Types */
export interface CounterSliceState {
  value: number;
  status: "idle" | "loading" | "failed";
}

/* Exporting Actions & Reducers */
export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer