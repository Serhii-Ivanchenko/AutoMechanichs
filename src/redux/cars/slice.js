import { initialState } from '../initialState.js';
import { createSlice } from '@reduxjs/toolkit';
import { createDiagnostic, createNewCar, getAllCars, getDiagnostic, getNodesAndParts, recognizeLicensePlate, uploadCarPhotos } from './operations.js';

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
  reducers: {
    setChosenDate:(state, action) => {
  state.chosenDate=action.payload
    }
  },
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
      })

      //! DIAGNOSTICS
      .addCase(getNodesAndParts.pending, handlePending)
      .addCase(getNodesAndParts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nodesAndPartsForDiagnostics = action.payload.tree.nodes;
      })
      .addCase(getNodesAndParts.rejected, handleRejected)

      .addCase(getDiagnostic.pending, (state, action) => {
        state.isDiagLoading = true;
        state.error = null;
      })
      .addCase(getDiagnostic.fulfilled, (state, action) => {
        state.isDiagLoading = false;
        state.diagnostic = action.payload;
      })
      .addCase(getDiagnostic.rejected, (state, action) => {
        state.isDiagLoading = false;
        state.error = action.payload;
      })

      .addCase(createDiagnostic.pending, (state, action) => {
        state.isDiagCreateLoading = true;
        state.error = null;
      })
      .addCase(createDiagnostic.fulfilled, (state, action) => {
        state.isDiagCreateLoading = false;
      })
      .addCase(createDiagnostic.rejected, (state, action) => {
        state.isDiagCreateLoading = false;
        state.error = action.payload;
      })

      // ! New car
      // create new car
      .addCase(createNewCar.pending, (state, action) => {
        state.isSavingCarLoading = true;
        state.error = null;
      })
      .addCase(createNewCar.fulfilled, (state, action) => {
        state.isSavingCarLoading = false;
      })
      .addCase(createNewCar.rejected, (state, action) => {
        state.isSavingCarLoading = false;
        state.error = action.payload;
      })

      // Upload car photos
      .addCase(uploadCarPhotos.pending, (state, action) => {
        state.isSavingCarLoading = true;
        state.error = null;
      })
      .addCase(uploadCarPhotos.fulfilled, (state, action) => {
        state.isSavingCarLoading = false;
      })
      .addCase(uploadCarPhotos.rejected, (state, action) => {
        state.isSavingCarLoading = false;
        state.error = action.payload;
      }),
});
export const { setChosenDate } = carsSlice.actions;

export default carsSlice.reducer;
