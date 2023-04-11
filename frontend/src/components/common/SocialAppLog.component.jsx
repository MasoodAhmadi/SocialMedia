import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Facebook, Google } from 'react-bootstrap-icons';

export default function SocialAppLog() {
  return (
    <Container>
      <div>Log in using your social account</div>
      <br />
      <div className='m-0 w-100 d-flex flex-direction-column justify-content-center'>
        <Row>
          <Col xs={12} md={12}>
            <Button
              variant='none'
              className='m-1'
              style={{ width: '7rem', background: 'rgb(240, 235, 235)' }}
            >
              <>sign in with </>
              <Facebook
                size={30}
                style={{
                  color: 'rgb(66 103 178)',
                }}
              />
            </Button>
            <Button
              variant='none'
              className='m-1'
              style={{
                width: '7rem',
                background: 'rgb(240, 235, 235)',
              }}
            >
              <>sign in with </>
              <Google
                size={30}
                style={{
                  color: 'linear-gradient(to bottom right, red, yellow)',
                }}
              />
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
