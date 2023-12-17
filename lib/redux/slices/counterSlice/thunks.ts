/* Instruments */
import { createAsyncThunk } from "@reduxjs/toolkit";

export const incrementIfOddAsync = createAsyncThunk("increment/odd", async (amount: number) => {
  //Promise to achieve aync behavior
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  if(amount%2 !== 0) {
    return amount;
  }
  return 0;
})
