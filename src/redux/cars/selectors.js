export const selectCars = state => state.cars.cars;

export const selectCarInfo = state => state.cars.carInfo;

// Loaders

export const selectIsLoading = state => state.cars.isLoading;

export const selectIsRecognitionLoading = state => state.cars.isRecognitionLoading;

export const selectError = state => state.cars.error;