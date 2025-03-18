import { createSlice } from "@reduxjs/toolkit";

const initialNumberState = {
  destiny: 1,
};

const numberNameSlice = createSlice({
  name: "numberName",
  initialState: initialNumberState,
  reducers: {
    setNumberDestiny(state, action) {
      console.log({ action });

      state.destiny = action.payload; // ✅ Gán giá trị đúng
    },
  },
});

export const numberNameActions = numberNameSlice.actions;
export default numberNameSlice.reducer;
