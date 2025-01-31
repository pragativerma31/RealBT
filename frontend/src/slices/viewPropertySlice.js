import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  propertyDetails: {},
  LoanOfferDetails:[],
  totalInterested: 0,
  totalLoanOffers: 0,
}

const viewPropertySlice = createSlice({
  name: "viewProperty",
  initialState,
  reducers: {
    setpropertyDetails: (state, action) => {
      state.propertyDetails= action.payload
    },
    setLoanOfferDetails: (state, action) => {
      state.LoanOfferDetails = action.payload
    },
    settotalLoanOffers: (state, action) => {
      state.totalLoanOffers = action.payload
    },
    settotalInterested: (state, action) => {
      state.totalInterested = action.payload
    },
  },
})

export const {
  setpropertyDetails,
  setLoanOfferDetails,
  settotalInterested,
  settotalLoanOffers,
} = viewPropertySlice.actions

export default viewPropertySlice.reducer