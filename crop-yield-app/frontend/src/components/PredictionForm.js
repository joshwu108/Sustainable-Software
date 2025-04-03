import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import apiService from '../services/api';

// Hardcoded crop options
const CROP_OPTIONS = [
  'Cassava', 
  'Maize', 
  'Plantains', 
  'Potatoes', 
  'Rice', 
  'Sorghum', 
  'Soybeans', 
  'Sweet potatoes', 
  'Wheat', 
  'Yams'
];

// Hardcoded area options
const AREA_OPTIONS = [
  'Albania',
  'Angola',
  'Argentina',
  'Bangladesh',
  'Brazil',
  'Canada',
  'China',
  'Egypt',
  'Ethiopia',
  'France',
  'Germany',
  'Ghana',
  'India',
  'Indonesia',
  'Kenya',
  'United States'
];

function PredictionForm({ onPredictionResult }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    crop: '',
    area: '',
    rainfall: '',
    pesticides: '',
    temperature: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validate form data
      if (!formData.crop || !formData.area || !formData.rainfall || 
          !formData.pesticides || !formData.temperature) {
        throw new Error('Please fill in all fields');
      }
      
      // For demonstration, create a mock prediction result instead of API call
      const mockResult = {
        predicted_yield: parseFloat(formData.rainfall) * 0.05 + 
                          parseFloat(formData.temperature) * 0.3 + 
                          parseFloat(formData.pesticides) * 0.01 + 15,
        confidence: 0.85,
        crop: formData.crop,
        area: formData.area
      };
      
      // Wait a bit to simulate API call
      setTimeout(() => {
        onPredictionResult(mockResult);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message || 'Failed to make prediction. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">Crop Yield Prediction</h4>
      </Card.Header>
      <Card.Body>
        {error && (
          <Alert variant="danger">{error}</Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="crop">
                <Form.Label>Crop Type</Form.Label>
                <Form.Select 
                  name="crop" 
                  value={formData.crop} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select crop</option>
                  {CROP_OPTIONS.map((crop) => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="area">
                <Form.Label>Area/Country</Form.Label>
                <Form.Select 
                  name="area" 
                  value={formData.area} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select area</option>
                  {AREA_OPTIONS.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="rainfall">
                <Form.Label>Average Rainfall (mm/year)</Form.Label>
                <Form.Control 
                  type="number" 
                  name="rainfall" 
                  value={formData.rainfall} 
                  onChange={handleChange}
                  placeholder="e.g., 1200" 
                  min="0"
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <Form.Group controlId="pesticides">
                <Form.Label>Pesticides (tonnes)</Form.Label>
                <Form.Control 
                  type="number" 
                  name="pesticides" 
                  value={formData.pesticides} 
                  onChange={handleChange}
                  placeholder="e.g., 100" 
                  min="0"
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <Form.Group controlId="temperature">
                <Form.Label>Average Temperature (°C)</Form.Label>
                <Form.Control 
                  type="number" 
                  name="temperature" 
                  value={formData.temperature} 
                  onChange={handleChange}
                  placeholder="e.g., 25" 
                  step="0.1"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          <div className="d-grid">
            <Button 
              variant="primary" 
              type="submit" 
              size="lg" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Predicting...
                </>
              ) : 'Predict Yield'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default PredictionForm;
