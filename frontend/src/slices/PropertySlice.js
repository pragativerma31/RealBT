import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  property: null,
  editProperty: false,
  paymentLoading: false,
}

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setProperty: (state, action) => {
      state.property = action.payload
    },
    setEditProperty: (state, action) => {
      state.editProperty = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetPropertyState: (state) => {
      state.step = 1
      state.property = null
      state.editProperty = false
    },
  },
})

export const {
  setStep,
  setProperty,
  setEditProperty,
  setPaymentLoading,
  resetPropertyState,
} = propertySlice.actions

export default propertySlice.reducer