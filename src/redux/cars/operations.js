import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance, axiosInstancePhotos } from '../../services/api.js';

// Get list of all cars per day
export const getAllCars = createAsyncThunk(
  'cars/getAllCars',
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    const serviceId = state.auth.userData.selectedServiceId;
    try {
      const { date, mechanic_id } = data;
      const response = await axiosInstance.get(`/mb/get_all_car/`, {
        params: {
          date,
          mechanic_id,
        },
        headers: {
          "X-Api-Key": "YA7NxysJ",
          'company-id': serviceId,
        },
      });
      console.log('getAllCars', response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response?.status,
        message: error.message,
        details: error.response?.data.detail, // Залишаємо лише необхідні дані
      });
    }
  }
);

// Recognize license plate
export const recognizeLicensePlate = createAsyncThunk(
  'cars/recognizeLicensePlate',
  async (platePhoto, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('file', platePhoto);
      const response = await axiosInstancePhotos.post(
        '/recognize_license_plate/',
        { formData },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('recognizeLicensePlate', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response?.status,
        message: error.message,
        details: error.response?.data.detail, // Залишаємо лише необхідні дані
      });
    }
  }
);
