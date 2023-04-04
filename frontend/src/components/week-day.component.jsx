import i18next from 'i18next';
import React from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';

import { useTranslation, Trans } from 'react-i18next';
export default function WeekofTheDay() {
  const { t, i18n } = useTranslation();

  const Lang = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' },
  };
  return (
    // <div>
    <Container fluid>
      <div>
        <Row>
          <Col className='d-flex justify-content-center'>
            <Card
              style={{
                width: '18rem',
                // margin: "0.5rem",
                background: '#4BABF8',
              }}
            >
              asdas
              {Object.keys(Lang).map((lng) => {
                <button
                  type='submit'
                  key={lng}
                  onClick={() => i18n.changeLanguage(lng)}
                  disabled={i18n.resolvedLanguage === lng}
                >
                  {Lang[lng.nativeName]}{' '}
                </button>;
              })}
              <Card.Body>
                <Card.Title className='mb-2 d-flex justify-content-center'>
                  MONDAY
                </Card.Title>
                <Card.Subtitle className='mb-3 text-muted d-flex justify-content-center'>
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text style={{ background: 'white' }}>
                  <Trans i18nkey='description'>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Trans>
                </Card.Text>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{t('learn')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn2')}</ListGroup.Item>
                </ListGroup>
                <br />
                <ListGroup variant='flush'>
                  <ListGroup.Item>{t('learn')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn2')}</ListGroup.Item>
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
                  <Trans i18nkey='description'>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Trans>
                </Card.Text>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{t('learn')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn2')}</ListGroup.Item>
                </ListGroup>
                <br />

                <ListGroup variant='flush'>
                  <ListGroup.Item>{t('learn')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn2')}</ListGroup.Item>
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
                  <Trans i18nkey='description'>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Trans>
                </Card.Text>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{t('learn')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn2')}</ListGroup.Item>
                </ListGroup>
                <br />

                <ListGroup variant='flush'>
                  <ListGroup.Item>{t('learn')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn2')}</ListGroup.Item>
                </ListGroup>
                <Button variant='primary'>Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          {/* </div> */}
        </Row>
        <Row>
          {/* <div> */}
          <Col className='d-flex justify-content-center'>
            <Card
              style={{
                width: '18rem',
                // margin: "0.5rem",
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
                  <Trans i18nkey='description'>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Trans>
                </Card.Text>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{t('learn')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn2')}</ListGroup.Item>
                </ListGroup>
                <br />

                <ListGroup variant='flush'>
                  <ListGroup.Item>{t('learn')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn2')}</ListGroup.Item>
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
                  <Trans i18nkey='description'>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Trans>
                </Card.Text>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{t('learn')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn2')}</ListGroup.Item>
                </ListGroup>
                <br />

                <ListGroup variant='flush'>
                  <ListGroup.Item>{t('learn')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn2')}</ListGroup.Item>
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
                // margin: "0.5rem",
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
                  <Trans i18nkey='description'>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Trans>
                </Card.Text>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{t('learn')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn2')}</ListGroup.Item>
                </ListGroup>
                <br />
                <ListGroup variant='flush'>
                  <ListGroup.Item>{t('learn')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn1')}</ListGroup.Item>
                  <ListGroup.Item>{t('learn2')}</ListGroup.Item>
                </ListGroup>

                <Button variant='primary'>Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          {/* </div> */}
        </Row>
      </div>
    </Container>
  );
}
