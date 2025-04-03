import axios from 'axios';

// API base URL - Change this if your backend is hosted elsewhere
const API_BASE_URL = 'http://localhost:5000/api';

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service methods
const apiService = {
  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  },

  // Get list of available crops
  getCrops: async () => {
    try {
      const response = await apiClient.get('/crops');
      return response.data.crops || [];
    } catch (error) {
      console.error('Error getting crops:', error);
      // Return an empty array instead of throwing to prevent UI breaking
      return [];
    }
  },

  // Get list of available areas
  getAreas: async () => {
    try {
      const response = await apiClient.get('/areas');
      return response.data.areas || [];
    } catch (error) {
      console.error('Error getting areas:', error);
      // Return an empty array instead of throwing to prevent UI breaking
      return [];
    }
  },

  // Predict crop yield
  predictYield: async (predictionData) => {
    try {
      const response = await apiClient.post('/predict', predictionData);
      
      // Format the response data to match what the frontend components expect
      return {
        predicted_yield: response.data.yield_prediction,
        confidence: 0.85, // Adding a default confidence value
        crop: response.data.crop,
        area: response.data.area
      };
    } catch (error) {
      console.error('Prediction error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code outside of 2xx
        throw new Error(error.response.data.error || 'Prediction failed');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request
        throw error;
      }
    }
  }
};

export default apiService;
