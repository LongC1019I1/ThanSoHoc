import { createSlice } from "@reduxjs/toolkit";

const initialNumberState = {
  number: 0,
  atitute: 0,
  day_birth: 0,
  arrow: '',
  lack_arrow: ''
};

const numberKarmaSlice = createSlice({
  name: "numberKarma",
  initialState: initialNumberState,
  reducers: {
    setKamarNumeroMain(state, action) {
      state.number = action.payload; // ✅ Gán giá trị đúng
    },
    setKamarNumeroAtitute(state, action) {
      state.atitute = action.payload; // ✅ Gán giá trị đúng
    },
    setKamarNumeroDayBirth(state, action) {
      state.day_birth = action.payload; // ✅ Gán giá trị đúng
    },
    setArrow(state, action) {
      state.arrow = action.payload;
    },
    setLackArrow(state, action) {
      state.lack_arrow = action.payload;
    },
  },
});
export const numberKarmaActions = numberKarmaSlice.actions;
export default numberKarmaSlice.reducer;
