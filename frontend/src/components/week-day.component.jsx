import React from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';

import { Trans, useTranslation } from 'react-i18next';
export default function WeekofTheDay() {
  // const { t: localize } = useTranslation();
  const { t: localize } = useTranslation();

  return (
    <Container fluid>
      <div>
        <Row>
          <Col className='d-flex justify-content-center'>
            <Card
              style={{
                width: '18rem',
                background: '#4BABF8',
              }}
            >
              <Card.Body>
                <Card.Title className='mb-2 d-flex justify-content-center'>
                  MONDAY
                </Card.Title>
                <Card.Subtitle className='mb-3 text-muted d-flex justify-content-center'>
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text style={{ background: 'white' }}>
                  <Trans i18nKey='description.part1'>
                    Edit <code>src/App.js</code> and save to reload.
                  </Trans>
                </Card.Text>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{localize('learn')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn2')}</ListGroup.Item>
                </ListGroup>
                <br />
                <ListGroup variant='flush'>
                  <ListGroup.Item>{localize('learn')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn2')}</ListGroup.Item>
                </ListGroup>
                <Button variant='primary'>Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className='d-flex justify-content-center'>
            <Card
              style={{
                width: '18rem',
                // margin: "0.5rem",
                background: '#9F413F',
              }}
            >
              <Card.Body>
                <Card.Title className='mb-2 d-flex justify-content-center'>
                  TUESDAY
                </Card.Title>
                <Card.Subtitle className='mb-3 text-muted d-flex justify-content-center'>
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text style={{ background: 'white' }}>
                  <Trans i18nKey='description.part1'>
                    Edit <code>src/App.js</code> and save to reload.
                  </Trans>
                </Card.Text>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{localize('learn')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn2')}</ListGroup.Item>
                </ListGroup>
                <br />

                <ListGroup variant='flush'>
                  <ListGroup.Item>{localize('learn')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn2')}</ListGroup.Item>
                </ListGroup>
                <Button variant='primary'>Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className='d-flex justify-content-center'>
            <Card
              style={{
                width: '18rem',
                // margin: "0.5rem",
                background: '#B4B1B1 ',
              }}
            >
              <Card.Body>
                <Card.Title className='mb-2 d-flex justify-content-center'>
                  WEDNESDAY
                </Card.Title>
                <Card.Subtitle className='mb-3 text-muted d-flex justify-content-center'>
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text style={{ background: 'white' }}>
                  <Trans i18nKey='description.part1'>
                    Edit <code>src/App.js</code> and save to reload.
                  </Trans>
                </Card.Text>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{localize('learn')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn2')}</ListGroup.Item>
                </ListGroup>
                <br />

                <ListGroup variant='flush'>
                  <ListGroup.Item>{localize('learn')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn2')}</ListGroup.Item>
                </ListGroup>
                <Button variant='primary'>Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className='d-flex justify-content-center'>
            <Card
              style={{
                width: '18rem',
                background: '#EBD2AC',
              }}
            >
              <Card.Body>
                <Card.Title className='mb-2 d-flex justify-content-center'>
                  THURSDAY
                </Card.Title>
                <Card.Subtitle className='mb-3 text-muted d-flex justify-content-center'>
                  Card Subtitle
                </Card.Subtitle>

                <Card.Text style={{ background: 'white' }}>
                  <Trans i18nKey='description.part1'>
                    Edit <code>src/App.js</code> and save to reload.
                  </Trans>
                </Card.Text>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{localize('learn')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn2')}</ListGroup.Item>
                </ListGroup>
                <br />

                <ListGroup variant='flush'>
                  <ListGroup.Item>{localize('learn')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn2')}</ListGroup.Item>
                </ListGroup>
                <Button variant='primary'>Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col className='d-flex justify-content-center'>
            <Card
              style={{
                width: '18rem',
                background: '#B0CFD0',
              }}
            >
              <Card.Body>
                <Card.Title className='mb-2 d-flex justify-content-center'>
                  FRIDAY
                </Card.Title>
                <Card.Subtitle className='mb-3 text-muted d-flex justify-content-center'>
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text style={{ background: 'white' }}>
                  <Trans i18nKey='description.part1'>
                    Edit <code>src/App.js</code> and save to reload.
                  </Trans>
                </Card.Text>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{localize('learn')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn2')}</ListGroup.Item>
                </ListGroup>
                <br />

                <ListGroup variant='flush'>
                  <ListGroup.Item>{localize('learn')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn2')}</ListGroup.Item>
                </ListGroup>
                <Button variant='primary'>Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className='d-flex justify-content-center'>
            {' '}
            <Card
              style={{
                width: '18rem',
                background: '#B0CFD0',
                borderRadius: '20px 30px 35px 40px',
              }}
            >
              <Card.Body>
                <Card.Title className='mb-2 d-flex justify-content-center'>
                  WEEKEND
                </Card.Title>
                <Card.Subtitle className='mb-3 text-muted d-flex justify-content-center'>
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text style={{ background: 'white' }}>
                  <Trans i18nKey='description.part1'>
                    Edit <code>src/App.js</code> and save to reload.
                  </Trans>
                </Card.Text>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{localize('learn')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn2')}</ListGroup.Item>
                </ListGroup>
                <br />
                <ListGroup variant='flush'>
                  <ListGroup.Item>{localize('learn')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{localize('learn2')}</ListGroup.Item>
                </ListGroup>

                <Button variant='primary'>Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
