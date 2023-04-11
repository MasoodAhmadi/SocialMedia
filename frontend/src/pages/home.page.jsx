import React from 'react';
import { Container } from 'react-bootstrap';
import { Footer, ListGroups, WeekofTheDay } from '../components';

export default function homePage() {
  return (
    <div className='m-1 mt-4 pt-5'>
      <Container>
        <WeekofTheDay />
        <br />
        <ListGroups />
      </Container>
      <Footer />
    </div>
  );
}
