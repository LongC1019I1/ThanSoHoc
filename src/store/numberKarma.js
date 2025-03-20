import { createSlice } from "@reduxjs/toolkit";

const initialNumberState = {
  number: 0,
  atitute: 0,
  day_birth: 0,
  birth_day:'',
  arrow: '',
  lack_arrow: ''
};

const numberKarmaSlice = createSlice({
  name: "numberKarma",
  initialState: initialNumberState,
  reducers: {
    setKamarNumeroMain(state, action) {
      state.number = action.payload; 
    },
    setKamarNumeroAtitute(state, action) {
      state.atitute = action.payload; 
    },
    setKamarNumeroDayBirth(state, action) {
      state.day_birth = action.payload; 
    },
    setBirthDayNumber(state, action) {
      state.birth_day = action.payload; 
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
