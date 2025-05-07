import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setAuthHeader,
  clearAuthHeader,
  axiosInstance,
} from '../../services/api.js';

// User login
export const logIn = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        '/auth/authenticate/',
        userData
      );
      setAuthHeader(response.data.api_key);
      localStorage.setItem('X-Api-Key', response.data.api_key);
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

// User logout
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/auth/logout/');
    clearAuthHeader();
    localStorage.removeItem('X-Api-Key');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.status);
  }
});

//Get user data
export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/auth/user_info/');
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

// Refresh
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
        const apiKey = localStorage.getItem('X-Api-Key');
        
      if (!apiKey) {
        return thunkAPI.rejectWithValue('Token not found');
      }

      setAuthHeader(apiKey); 
      const response = await axiosInstance.get('/auth/user_info/');
      return { ...response.data, api_key: apiKey };
    } catch (error) {
      clearAuthHeader();
      localStorage.removeItem('X-Api-Key'); // Видаляємо токен при помилці
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);
