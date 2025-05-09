import { initialState } from '../initialState.js';
import { createSlice } from '@reduxjs/toolkit';
import { getAllCars, recognizeLicensePlate } from './operations.js';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  {
    state.isLoading = false;
    state.error = action.payload;
  }
};

const carsSlice = createSlice({
  name: 'cars',
  initialState: initialState.cars,
  reducers: {},
  extraReducers: builder =>
    builder
      // Get all cars
      .addCase(getAllCars.pending, handlePending)
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload.records;
      })
      .addCase(getAllCars.rejected, handleRejected)

      // Recognize license plate
      .addCase(recognizeLicensePlate.pending, state => {
        state.isRecognitionLoading = true;
        state.error = null;
      })
      .addCase(recognizeLicensePlate.fulfilled, (state, action) => {
        state.isRecognitionLoading = false;
        state.carInfo = action.payload.car_info;
      })
      .addCase(recognizeLicensePlate.rejected, (state, action) => {
        state.isRecognitionLoading = false;
        state.error = action.payload;
      }),
});

export default carsSlice.reducer;
