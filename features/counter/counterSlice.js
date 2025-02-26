import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialStateForCounter = {
  count: 0,
  step: 0,
  repeat: 0,
  message: "",
  values: [],
};

export const loadCounterData = createAsyncThunk(
  "counterData/load",
  async () => {
    const counterData = await AsyncStorage.getItem("counter-data");
    if (counterData === null) {
      await AsyncStorage.setItem(
        "counter-data",
        JSON.stringify(initialStateForCounter)
      );
    }
    return JSON.parse(counterData);
  }
);
export const saveCounterData = createAsyncThunk(
  "counterData/save",
  async (newCounterData) => {
    await AsyncStorage.setItem("counter-data", JSON.stringify(newCounterData));
    return newCounterData;
  }
);

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    ...initialStateForCounter,
    status: "idle",
    error: null,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
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
    close: () => initialStateForCounter,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCounterData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadCounterData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.count = action.payload.count;
        state.step = action.payload.step;
        state.repeat = action.payload.repeat;
        state.message = action.payload.message;
        state.values = action.payload.values;
      })
      .addCase(loadCounterData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(saveCounterData.fulfilled, (state, action) => {
        state.count = action.payload.count;
        state.step = action.payload.step;
        state.repeat = action.payload.repeat;
        state.message = action.payload.message;
        state.values = action.payload.values;
      });
  },
});
export const { increment, decrement, reset, save, close } =
  counterSlice.actions;
export default counterSlice.reducer;
