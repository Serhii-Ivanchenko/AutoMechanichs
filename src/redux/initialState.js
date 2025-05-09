export const initialState = {
  auth: {
    userData: {},
    balance: {},
    apiKey: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: null,
  },

  cars: {
    cars: [],
    carInfo: {},
    isLoading: false,
    isRecognitionLoading: false,
    error: null,
  },
};
