import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';

function PredictionResult({ result }) {
  if (!result) return null;

  const { predicted_yield, confidence, crop, area } = result;
  
  let yieldRating;
  if (predicted_yield < 10) yieldRating = 'Low';
  else if (predicted_yield < 25) yieldRating = 'Moderate';
  else if (predicted_yield < 40) yieldRating = 'Good';
  else yieldRating = 'Excellent';
  
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
    <Card className="prediction-result animate-slide-up">
      <Card.Header>
        <h4 className="mb-0">Prediction Results</h4>
      </Card.Header>
      <Card.Body>
        <div className="text-center mb-4">
          <div className="result-value">
            {predicted_yield.toFixed(2)}
          </div>
          <div className="result-label">
            tonnes/hectare
          </div>
          <Badge 
            bg={getBadgeVariant()} 
            className="mt-3 p-3 fs-5 animate-fade-in"
          >
            {yieldRating} Yield
          </Badge>
        </div>
        
        <Row className="mt-4">
          <Col md={6} className="mb-3">
            <Card className="h-100 animate-fade-in">
              <Card.Body>
                <Card.Title className="fw-bold">Crop Details</Card.Title>
                <Card.Text>
                  <strong>Crop Type:</strong> {crop}<br />
                  <strong>Growing Region:</strong> {area}<br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} className="mb-3">
            <Card className="h-100 animate-fade-in">
              <Card.Body>
                <Card.Title className="fw-bold">Prediction Quality</Card.Title>
                <Card.Text>
                  <strong>Confidence Level:</strong> {(confidence * 100).toFixed(1)}%<br />
                  <strong>Model:</strong> Random Forest Regressor<br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <div className="mt-4 text-center">
          <p className="text-muted animate-fade-in">
            Note: This prediction is based on the environmental factors and historical data.
            Actual yield may vary depending on specific farming practices and unforeseen conditions.
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PredictionResult; 