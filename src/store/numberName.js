import { createSlice } from "@reduxjs/toolkit";

const initialNumberState = {
  destiny: 0,
  name: 0,
  inner: "0",
  express: 0,
  soul: 0,
  mature: 0,
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
    setNumberSoul(state, action) {
      state.soul = action.payload; // ✅ Gán giá trị đúng
    },
    setNumberInner(state, action) {
      state.inner = action.payload; // ✅ Gán giá trị đúng
    },
    setNumberExpress(state, action) {
      state.express = action.payload; // ✅ Gán giá trị đúng
    },
    setNumberMature(state, action) {
      state.mature = action.payload; // ✅ Gán giá trị đúng
    },
  },
});

export const numberNameActions = numberNameSlice.actions;
export default numberNameSlice.reducer;
