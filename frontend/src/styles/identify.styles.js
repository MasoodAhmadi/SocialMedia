import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

export const LoginFormContainer = styled.div`
  z-index: 99;
  min-height: 35rem;
  position: absolute;
  right: ${({ theme }) => theme.width <= 992 && 0};
  background-color: ${({ theme }) => theme.basic.grey};
  left: ${({ theme }) => (theme.width > 992 ? '30vw' : 0)};
  margin-left: ${({ theme }) => theme.width <= 992 && 'auto'};
  top: ${({ theme }) => (theme.width > 992 ? '16vh' : '13vh')};
  padding: ${({ theme }) => theme.width > 1200 && '0rem 5rem'};
  margin-right: ${({ theme }) => theme.width <= 992 && 'auto'};
  box-shadow: ${({ theme }) => `0.5rem 0.5rem 1rem ${theme.basic.dark}33`};
  width: ${({ theme }) =>
    theme.width > 1200
      ? '40rem'
      : theme.width > 992 && theme.width <= 1200
      ? '32rem'
      : theme.width > 575 && theme.width <= 992
      ? '60vw'
      : '80vw'};
  &:hover {
    transition: box-shadow 1s ease;
  }
`;
export const LoginInputField = styled(Form.Control)`
  border: none;
  border-radius: 0%;
  font-style: italic;
  outline: none !important;
  box-shadow: none !important;
  color: ${({ theme }) => theme.basic.dark}!important;
  background-color: ${({ theme }) => theme.basic.bright}!important;
  border-bottom: ${({ theme }) =>
    `0.1rem solid ${theme.basic.bright}`}!important;
  &:hover {
    transition: background-color 0.4s ease-out;
    color: ${({ theme }) => theme.basic.dark}!important;
    background-color: ${({ theme }) => theme.basic.bright}!important;
  }
`;

export const LoginButton = styled(Button)`
  width: ${({ theme }) => (theme.width > 992 ? '10rem' : '9rem')};
  height: 3rem;
  font-size: 1rem;
  // margin-left: 1rem;
  // left: 1rem;
  border-radius: 0%;
  border: none !important;
  color: ${({ theme }) => theme.basic.dark}!important;
  background-color: ${({ theme }) => theme.basic.bright}!important;
`;
export const ForgotPasswordButton = styled(Button)`
  width: ${({ theme }) => (theme.width > 992 ? '10rem' : '9rem')};
  height: 3rem;
  font-size: 1rem;
  margin-right: 20rem;
  // left: 1rem;
  border-radius: 0%;
  border: none !important;
  color: ${({ theme }) => theme.basic.dark}!important;
  background-color: ${({ theme }) => theme.basic.bright}!important;
`;

export const FacebookButton = styled(Button)`
  width: ${({ theme }) => (theme.width > 992 ? '10rem' : '9rem')};
  height: 3rem;
  font-size: 1rem;
  margin-left: 1rem;
  left: 1rem;
  border-radius: 0%;
  border: none !important;
  color: ${({ theme }) => theme.basic.dark}!important;
  background-color: ${({ theme }) => theme.basic.bright}!important;
`;
export const GoogleButton = styled(Button)`
  width: ${({ theme }) => (theme.width > 992 ? '10rem' : '9rem')};
  height: 3rem;
  font-size: 1rem;
  margin-left: 1rem;
  left: 1rem;
  border-radius: 0%;
  border: none !important;
  color: ${({ theme }) => theme.basic.dark}!important;
  background-color: ${({ theme }) => theme.basic.bright}!important;
`;
export const LogoutButton = styled(Button)`
  border: none;
  font-size: 1.2rem;
  border-radius: 0%;
  color: ${({ theme }) => theme.basic.dark};
  background-color: ${({ theme }) => theme.dark};
  &:hover {
    border-radius: 0%;
    color: ${({ theme }) => theme.basic.greyOpacity};
    // background-color: ${({ theme }) => theme.primary};
  }
`;
