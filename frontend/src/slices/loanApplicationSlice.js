import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  loanApplication: null,
  editLoanApplication: false,
}

const loanApplicationSlice = createSlice({
  name: "loanApplication",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setLoanApplication: (state, action) => {
      state.loanApplication = action.payload
    },
    setEditLoanApplication: (state, action) => {
      state.editLoanApplication = action.payload
    },
    resetLoanApplicationState: (state) => {
      state.step = 1
      state.loanApplication = null
      state.editLoanApplication = false
    },
  },
})

export const {
  setStep,
  setLoanApplication,
  setEditLoanApplication,
  resetLoanApplicationState,
} = loanApplicationSlice.actions

export default loanApplicationSlice.reducer