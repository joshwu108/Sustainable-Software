import pandas as pd
import numpy as np
import joblib
import pickle
import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

def train_and_save_model(save_path='../models/crop_yield_model.pkl'):
    """
    Train the Random Forest model based on the notebook implementation
    and save it to a file for the Flask API to use.
    """
    try:
        # Load the dataset
        df = pd.read_csv('../../yield_df.csv')
        
        # Data preprocessing (similar to what's done in the notebook)
        df['Item'] = df['Item'].replace({
            'Cassava': 0, 
            'Maize': 1, 
            'Plantains and others': 2, 
            'Potatoes': 3, 
            'Rice, paddy': 4, 
            'Sorghum': 5, 
            'Soybeans': 6, 
            'Sweet potatoes': 7, 
            'Wheat': 8, 
            'Yams': 9
        })
        
        df = df.drop(['Unnamed: 0'], axis='columns')
        
        # Prepare features and target
        X = df[['Item', 'Area', 'average_rain_fall_mm_per_year', 'pesticides_tonnes', 'avg_temp']]
        y = df[['hg/ha_yield']]
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Train the model (using the same parameters as in the notebook)
        model = RandomForestRegressor(
            random_state=42, 
            n_estimators=500, 
            criterion='squared_error', 
            max_depth=20, 
            max_features="log2"
        )
        
        model.fit(X_train, y_train)
        
        # Save the model
        joblib.dump(model, save_path)
        print(f"Model successfully trained and saved to {save_path}")
        
        return True
    except Exception as e:
        print(f"Error training or saving model: {e}")
        return False

def load_model(model_path):
    """
    Load the machine learning model from a pickle file
    """
    try:
        # Check if the model file exists
        if not os.path.exists(model_path):
            print(f"Model file not found at: {model_path}")
            # Return a simple dummy model for demonstration purposes
            return create_dummy_model()
        
        # Load the model from the pickle file
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        # Return a simple dummy model for demonstration purposes
        return create_dummy_model()

def create_dummy_model():
    """
    Create a simple dummy model for demonstration purposes
    """
    print("Creating a dummy model for demonstration")
    # Create a simple random forest model
    model = RandomForestRegressor(n_estimators=10, random_state=42)
    
    # Create a small dummy dataset for training
    X = np.random.rand(100, 5)  # 5 features: crop, area, rainfall, pesticides, temperature
    y = 10 + 2 * X[:, 0] + 3 * X[:, 1] + 5 * X[:, 2] - 2 * X[:, 3] + 4 * X[:, 4] + np.random.normal(0, 1, 100)
    
    # Train the model on the dummy data
    model.fit(X, y)
    return model

def predict_yield(model, crop, area, rainfall, pesticides, temperature):
    """
    Make a yield prediction using the provided model and input features
    """
    try:
        # Create input array with the features
        X = np.array([[crop, area, rainfall, pesticides, temperature]])
        
        # Make prediction
        prediction = model.predict(X)
        
        # Return the first prediction (since we only have one sample)
        return prediction[0]
    except Exception as e:
        print(f"Prediction error: {e}")
        return None

# Use this section to train and save the model if this script is run directly
if __name__ == "__main__":
    train_and_save_model()
