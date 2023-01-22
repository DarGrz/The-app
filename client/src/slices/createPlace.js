import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import placeService from "../services/createPlaceService";

export const createPlace = createAsyncThunk(
  "createPlace",
  async ({ name, address, creator }, thunkAPI) => {
    try {
      const response = await placeService.createPlace(name, address, creator);
      thunkAPI.dispatch(setMessage(response.data.message));
      console.log("Creating Place setMessage");
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  name: "",
  address: "",
  creator: "",
};

const createdPlaceSlice = createSlice({
  name: "createPlace",
  initialState,
});

const { reducer } = createdPlaceSlice;
export default reducer;
