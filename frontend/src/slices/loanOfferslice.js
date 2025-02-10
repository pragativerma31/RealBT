import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  loanOffer: null,
  editLoanOffer: false,
};

const loanOfferSlice = createSlice({
  name: "loanOffer",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setLoanOffer: (state, action) => {
      state.loanOffer = action.payload;
    },
    setEditLoanOffer: (state, action) => {
      state.editLoanOffer = action.payload;
    },
    resetLoanOfferState: (state) => {
      state.step = 1;
      state.loanOffer = null;
      state.editLoanOffer = false;
    },
  },
});

export const {
  setStep,
  setLoanOffer,
  setEditLoanOffer,
  resetLoanOfferState,
} = loanOfferSlice.actions;

export default loanOfferSlice.reducer;
