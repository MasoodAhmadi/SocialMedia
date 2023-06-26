import { Card, Container } from 'react-bootstrap';
import styled from 'styled-components';

export const SignupPageStyle = styled.div`
  background-color: #444;
  height: ${({ theme }) => theme.width < 1400 && 'auto'};
  // width: 100vw;
  padding-top: ${({ theme }) =>
    theme.width < 1400 ? '2rem' : theme.width < 1000 ? '0rem' : '5rem'};
`;
export const SignupContainer = styled(Container)`
  background-color: #fff;
  flex-direction: ${({ theme }) => (theme.width <= 775 ? 'column' : 'row')};
  // width: ${({ theme }) => (theme.width <= 1200 ? '10vwh' : '40vw')};
  height: ${({ theme }) => (theme.width <= 1200 ? 'auto' : '50vh')};
`;

export const FormContainer = styled(Card)`
  background: rgba(255, 25, 255, 0.15);
  display: flex;
  position: relative;
  // width: ${({ theme }) => (theme.width <= 1200 ? '100vw' : '50vw')};
  height: ${({ theme }) => (theme.width <= 1200 ? 'auto' : '50vh')};
  // position: static;
  color: #fff;
`;
