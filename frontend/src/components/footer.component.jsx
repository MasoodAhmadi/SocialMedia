import React from 'react';
import { Card } from 'react-bootstrap';

export default function Footer() {
  return (
    <Card className=''>
      <Card.Header className='d-flex justify-content-center'>
        Featured
      </Card.Header>
      <Card.Body className='d-flex justify-content-center'>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
      <Card.Header className='d-flex justify-content-center'>
        Featured
      </Card.Header>
    </Card>
  );
}
