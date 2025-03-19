import { createSlice } from "@reduxjs/toolkit";

const initialNumberState = {
  destiny: 1,
  name: 0,
  inner: 0,
  express: 0,
};

const numberNameSlice = createSlice({
  name: "numberName",
  initialState: initialNumberState,
  reducers: {
    setNumberDestiny(state, action) {
      state.destiny = action.payload; // ✅ Gán giá trị đúng
    },
    setNumberName(state, action) {
      state.name = action.payload; // ✅ Gán giá trị đúng
    },
    setNumberInner(state, action) {
      state.inner = action.payload; // ✅ Gán giá trị đúng
    },
    setNumberExpress(state, action) {
      state.express = action.payload; // ✅ Gán giá trị đúng
    },
  },
});

export const numberNameActions = numberNameSlice.actions;
export default numberNameSlice.reducer;
