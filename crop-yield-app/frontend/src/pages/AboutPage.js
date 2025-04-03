import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

function AboutPage() {
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center mb-4">About This Project</h1>
          <p className="lead text-center">
            Learn more about our crop yield prediction system and how it can help sustainable agriculture.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header as="h5">The Technology</Card.Header>
            <Card.Body>
              <Card.Text>
                This application uses a Random Forest Regressor model to predict crop yields 
                based on historical data and environmental factors. The model has been trained 
                on a comprehensive dataset of agricultural statistics.
              </Card.Text>
              <Card.Text>
                We've built the application with:
              </Card.Text>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item><strong>Frontend:</strong> React, React Bootstrap</ListGroup.Item>
                <ListGroup.Item><strong>Backend:</strong> Flask, Python</ListGroup.Item>
                <ListGroup.Item><strong>ML Model:</strong> Scikit-learn (Random Forest)</ListGroup.Item>
                <ListGroup.Item><strong>Data Processing:</strong> Pandas, NumPy</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header as="h5">Why It Matters</Card.Header>
            <Card.Body>
              <Card.Text>
                Accurate crop yield prediction is crucial for:
              </Card.Text>
              <ul>
                <li>
                  <strong>Food Security:</strong> Helping farmers and policymakers predict and 
                  plan for food production needs.
                </li>
                <li>
                  <strong>Resource Optimization:</strong> Better planning for water, fertilizer, 
                  and pesticide use, reducing waste and environmental impact.
                </li>
                <li>
                  <strong>Economic Planning:</strong> Allowing farmers to make informed decisions 
                  about what crops to grow and how to allocate resources.
                </li>
                <li>
                  <strong>Climate Adaptation:</strong> Understanding how changing climate patterns 
                  affect crop yields helps in developing adaptation strategies.
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header as="h5">How It Works</Card.Header>
            <Card.Body>
              <Row>
                <Col md={4} className="mb-3">
                  <Card className="h-100 border-0">
                    <Card.Body className="text-center">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                        <h3 className="m-0">1</h3>
                      </div>
                      <Card.Title>Input Factors</Card.Title>
                      <Card.Text>
                        Enter details about the crop, region, rainfall, pesticides, 
                        and temperature.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4} className="mb-3">
                  <Card className="h-100 border-0">
                    <Card.Body className="text-center">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                        <h3 className="m-0">2</h3>
                      </div>
                      <Card.Title>Model Processing</Card.Title>
                      <Card.Text>
                        Our Random Forest model analyzes the inputs based on learned patterns 
                        from historical data.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4} className="mb-3">
                  <Card className="h-100 border-0">
                    <Card.Body className="text-center">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                        <h3 className="m-0">3</h3>
                      </div>
                      <Card.Title>Yield Prediction</Card.Title>
                      <Card.Text>
                        Receive accurate predictions of expected crop yield in tonnes per hectare, 
                        along with confidence levels.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage; 