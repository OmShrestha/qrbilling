import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import SearchBar from './SearchBar';
import QRScanner from './QRScanner';

const Layout = props => {
  const [QRScannerSelected, setQRScannerSelected] = useState(false);
  return (
    <Container className="bg-light border" fluid={true}>
      <Row>
        <Col className="bg-light text-dark">
          <SearchBar />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>OR</h2>
        </Col>
      </Row>
      <Row>
        <Col className="bg-light text-light">
          {QRScannerSelected ? (
            <QRScanner />
          ) : (
            <img
              src="https://i.pinimg.com/originals/9b/56/2c/9b562ca0be290e80f201486a4fbcf849.png"
              alt="image"
              onClick={() => setQRScannerSelected(!QRScannerSelected)}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
