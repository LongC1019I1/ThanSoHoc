import { createSlice } from "@reduxjs/toolkit";

const initialNumberState = {
  number: 1,
};

const numberKarmaSlice = createSlice({
  name: "numberKarma",
  initialState: initialNumberState,
  reducers: {
    setKamarNumeroMain(state, action) {
      console.log(11);
      console.log(action);

      state.number = action.payload; // ✅ Gán giá trị đúng
    },
  },
});
export const numberKarmaActions = numberKarmaSlice.actions;
export default numberKarmaSlice.reducer;
