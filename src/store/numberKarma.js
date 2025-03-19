import { createSlice } from "@reduxjs/toolkit";

const initialNumberState = {
  number: 0,
  atitute: 0,
  day_birth: 0
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
  },
});
export const numberKarmaActions = numberKarmaSlice.actions;
export default numberKarmaSlice.reducer;
