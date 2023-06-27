import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormLabel } from 'react-bootstrap';

export const TextInput = styled.p`
  color: black;
  text-transform: lowercase;
  display: flex;
  align-items: center;
`;
export const MainContainer = styled.div`
  align-items: center;
  flex-direction: column;
  // height: 100vh;
  width: ${({ theme }) => (theme.width < 400 ? '80vw' : '30vw')};
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  position: relative;
`;

export const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
  color: black;
`;

export const InputContainer = styled.div`
  // display: flex;
  gap: 10px;
  padding-top: 2rem;
  // flex-direction: column;
  position: relative;
  justify-content: space-around;
  align-items: center;
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
  margin-left: 10px;
  margin-top: 10px;
  padding-bottom: 15px;
  color: black;
`;
export const SignUpText = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 10px;
  padding-bottom: 15px;
  color: black;
`;
export const StyledLabel = styled(FormLabel)`
  // background: rgba(255, 255, 255, 0.15);
  // box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

  border: none;
  outline: none;
  color: #656565;
  font-size: 1rem;
`;
export const StyledInput = styled.input`
  display: flex;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 0.5rem;
  width: 90%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 0.5rem;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;

export const StyledIcon = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  background: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  color: white;
  cursor: pointer;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const StyledButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
`;