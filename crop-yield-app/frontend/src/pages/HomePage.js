import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';

function HomePage() {
  const [predictionResult, setPredictionResult] = useState(null);

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center mb-4">Crop Yield Prediction</h1>
          <p className="lead text-center">
            Use our machine learning model to predict crop yields based on environmental factors.
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={12} xl={predictionResult ? 6 : 12} className="mb-4">
          <PredictionForm onPredictionResult={setPredictionResult} />
        </Col>
        
        {predictionResult && (
          <Col lg={12} xl={6}>
            <PredictionResult result={predictionResult} />
          </Col>
        )}
      </Row>

      <Row className="mt-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div className="mb-3">
                <i className="bi bi-graph-up" style={{ fontSize: '2rem', color: '#0d6efd' }}></i>
              </div>
              <Card.Title>Data-Driven Decisions</Card.Title>
              <Card.Text>
                Make informed farming decisions based on predictive analytics and historical data patterns.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div className="mb-3">
                <i className="bi bi-cloud-sun" style={{ fontSize: '2rem', color: '#0d6efd' }}></i>
              </div>
              <Card.Title>Environmental Factors</Card.Title>
              <Card.Text>
                Our model considers rainfall, temperature, and other environmental variables 
                that impact crop production.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div className="mb-3">
                <i className="bi bi-gear" style={{ fontSize: '2rem', color: '#0d6efd' }}></i>
              </div>
              <Card.Title>Advanced AI</Card.Title>
              <Card.Text>
                Powered by a Random Forest Regressor model trained on extensive agricultural data.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage; 