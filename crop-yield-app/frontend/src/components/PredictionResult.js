import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';

function PredictionResult({ result }) {
  if (!result) return null;

  const { predicted_yield, confidence, crop, area } = result;
  
  // Calculate yield rating
  let yieldRating;
  if (predicted_yield < 10) yieldRating = 'Low';
  else if (predicted_yield < 25) yieldRating = 'Moderate';
  else if (predicted_yield < 40) yieldRating = 'Good';
  else yieldRating = 'Excellent';
  
  // Get badge color based on yield rating
  const getBadgeVariant = () => {
    switch (yieldRating) {
      case 'Low': return 'danger';
      case 'Moderate': return 'warning';
      case 'Good': return 'info';
      case 'Excellent': return 'success';
      default: return 'primary';
    }
  };

  return (
    <Card className="shadow-sm mt-4 prediction-result">
      <Card.Header className="bg-success text-white">
        <h4 className="mb-0">Prediction Results</h4>
      </Card.Header>
      <Card.Body>
        <div className="text-center mb-4">
          <h2>Predicted Yield: {predicted_yield.toFixed(2)} tonnes/hectare</h2>
          <Badge 
            bg={getBadgeVariant()} 
            className="mt-2 p-2 fs-5"
          >
            {yieldRating} Yield
          </Badge>
        </div>
        
        <Row className="mt-4">
          <Col md={6} className="mb-3">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Crop Details</Card.Title>
                <Card.Text>
                  <strong>Crop Type:</strong> {crop}<br />
                  <strong>Growing Region:</strong> {area}<br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} className="mb-3">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Prediction Quality</Card.Title>
                <Card.Text>
                  <strong>Confidence Level:</strong> {(confidence * 100).toFixed(1)}%<br />
                  <strong>Model:</strong> Random Forest Regressor<br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <div className="mt-3 text-center">
          <p className="text-muted">
            Note: This prediction is based on the environmental factors and historical data.
            Actual yield may vary depending on specific farming practices and unforeseen conditions.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PredictionResult; 