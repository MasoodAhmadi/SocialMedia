import React from 'react';
import { Container } from 'react-bootstrap';
import { Footer, ListGroups, WeekofTheDay } from '../components';

export default function homePage() {
  return (
    <>
      <Container>
        <WeekofTheDay />
        <br />
        <ListGroups />
      </Container>
      <Footer />
    </>
  );
}
