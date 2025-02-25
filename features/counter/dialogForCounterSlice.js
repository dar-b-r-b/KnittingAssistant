import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 0,
  repeat: 0,
  message: "",
  values: [],
};
export const dialogForCounterSlice = createSlice({
  name: "dialogForCounter",
  initialState,
  reducers: {
    save: (state, action) => {
      const { step, repeat, message } = action.payload;
      state.step = 0;
      state.repeat = repeat;
      state.message = message;
      state.values = Array.from(
        { length: repeat },
        (_, i) => (i + 1) * step - 1
      );
    },
    close: () => initialState,
  },
});
export const { save, close } = dialogForCounterSlice.actions;
export default dialogForCounterSlice.reducer;
