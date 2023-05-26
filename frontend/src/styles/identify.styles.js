import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const LoginFormContainer = styled.div`
  z-index: 99;
  background-color: ${({ theme }) => theme.basic.grey};
  margin-left: ${({ theme }) => theme.width <= 992 && 'auto'};
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

export const LoginButton = styled(Button)`
  width: 10rem;
  height: 3rem;
  font-size: 1rem;
  margin-top: 1rem;
  border-radius: 0%;
  border: none !important;
  color: ${({ theme }) => theme.basic.dark}!important;
  background-color: ${({ theme }) => theme.basic.bright}!important;
`;
export const ForgotPasswordButton = styled(Button)`
  width: ${({ theme }) => (theme.width > 992 ? '10rem' : '9rem')};
  height: 3rem;
  font-size: 1rem;
  margin-top: 1rem;
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

export const TextInput = styled.p`
  color: black;
  text-transform: lowercase;
  display: flex;
  align-items: center;
`;
export const MainContainer = styled.div`
  // display: flex;
  align-items: center;
  // justify-content: center;
  flex-direction: column;
  height: 80vh;
  width: 20vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 60vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 87vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 60vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 60vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 60vw;
    height: 60vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 71vh;
  }
`;

export const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
  color: black;
`;

export const InputContainer = styled.div`
  display: flex;
  margin: 2px;
  gap: 10px;
  padding-top: 5rem;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginWith = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
`;

export const HorizontalRule = styled.hr`
  width: 100%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 100%;
`;

export const ForgotPassword = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
`;
