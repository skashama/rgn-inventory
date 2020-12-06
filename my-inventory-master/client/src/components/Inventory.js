import React, { useContext } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap';
import { ItemsContext } from '../contexts/ItemsContext';
import { numberWithCommas } from '../utils/format';

const Inventory = () => {

  const { totalItems, totalQuantity, totalPrice, user } =  useContext(ItemsContext);

  return (
        <div>
          <Container>
            <Row className="justify-content-md-center" >
              <Col xs lg="4" md="4">
                <Card style={{ width: '10rem', height: '8rem' }}>
                <Card.Body>
                  <Card.Title>{totalItems}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Items</Card.Subtitle>
                </Card.Body>
                </Card>
              </Col>
              <Col xs lg="4" md="4">
                <Card style={{ width: '10rem', height: '8rem' }}>
                  <Card.Body>
                    <Card.Title>{numberWithCommas(totalQuantity)}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Total Quantity</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs lg="4" md="4">
                <Card style={{ width: '11rem', height: '8rem' }}>
                  <Card.Body>
                    <Card.Title>{user.currency}{numberWithCommas(totalPrice.toFixed(2))}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Total Value</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
    )
}

export default Inventory;