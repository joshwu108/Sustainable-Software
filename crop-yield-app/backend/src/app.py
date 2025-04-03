from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from model import load_model, predict_yield

app = Flask(__name__)
# Enable CORS with specific settings
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Dictionary for converting between crop names and their numeric codes
CROP_MAPPING = {
    'Cassava': 0, 
    'Maize': 1, 
    'Plantains': 2, 
    'Potatoes': 3, 
    'Rice': 4, 
    'Sorghum': 5, 
    'Soybeans': 6, 
    'Sweet potatoes': 7, 
    'Wheat': 8, 
    'Yams': 9
}

# Dictionary for demo purposes (mapping area names to codes)
AREA_MAPPING = {
    'Albania': 0,
    'Angola': 1,
    'Argentina': 2,
    'Bangladesh': 3,
    'Brazil': 4,
    'Canada': 5,
    'China': 6,
    'Egypt': 7,
    'Ethiopia': 8,
    'France': 9,
    'Germany': 10,
    'Ghana': 11,
    'India': 12,
    'Indonesia': 13,
    'Kenya': 14
}

# Load the model when the server starts
model = None
try:
    model = load_model('../models/crop_yield_model.pkl')
    if model is None:
        print("Warning: Model could not be loaded. Make sure to train and save it first.")
except Exception as e:
    print(f"Error loading model: {e}")

@app.route('/api/health', methods=['GET'])
def health_check():
    """API health check endpoint"""
    return jsonify({"status": "ok", "message": "API is running"})

@app.route('/api/crops', methods=['GET'])
def get_crops():
    """Return the list of available crops"""
    return jsonify(crops=list(CROP_MAPPING.keys()))

@app.route('/api/areas', methods=['GET'])
def get_areas():
    """Return the list of available areas"""
    return jsonify(areas=list(AREA_MAPPING.keys()))

@app.route('/api/predict', methods=['POST'])
def predict():
    """Endpoint to make yield predictions"""
    # Check if model is loaded
    if model is None:
        return jsonify({"error": "Model not loaded. Train and save the model first."}), 500
    
    # Get request data
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    try:
        # Extract parameters from request
        crop = data.get('crop')
        area = data.get('area')
        rainfall = data.get('rainfall')
        pesticides = data.get('pesticides')
        avg_temp = data.get('temperature')
        
        # Validate inputs
        if not all([crop, area, rainfall, pesticides, avg_temp]):
            return jsonify({"error": "Missing required parameters"}), 400
        
        # Convert crop and area to their numeric codes
        crop_code = CROP_MAPPING.get(crop)
        area_code = AREA_MAPPING.get(area)
        
        if crop_code is None:
            return jsonify({"error": f"Invalid crop: {crop}"}), 400
        if area_code is None:
            return jsonify({"error": f"Invalid area: {area}"}), 400
        
        # Convert values to appropriate types
        try:
            rainfall = float(rainfall)
            pesticides = float(pesticides)
            avg_temp = float(avg_temp)
        except ValueError:
            return jsonify({"error": "Rainfall, pesticides and temperature must be numbers"}), 400
        
        # Make prediction
        prediction = predict_yield(model, crop_code, area_code, rainfall, pesticides, avg_temp)
        
        if prediction is None:
            return jsonify({"error": "Prediction failed"}), 500
        
        # Return prediction result
        return jsonify({
            "crop": crop,
            "area": area,
            "yield_prediction": round(float(prediction), 2),
            "yield_unit": "hg/ha"
        })
        
    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
