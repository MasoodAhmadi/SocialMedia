import { Form, FormLabel } from 'react-bootstrap';
import styled from 'styled-components';

export const MainContainer2 = styled.div`
  // height: 100vh;
  width: ${({ theme }) => (theme.width < 400 ? '80vw' : '30vw')};
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
`;

export const InputContainer2 = styled.div`
  // display: flex;
  gap: 10px;
  padding-top: 2rem;
  flex-direction: column;
  position: relative;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  color: #000;
`;
export const StyledInput2 = styled(Form.Control)`
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
export const SignUpText2 = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 10px;
  padding-bottom: 15px;
  color: black;
`;
export const StyledLabel2 = styled(FormLabel)`
  // background: rgba(255, 255, 255, 0.15);
  // box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

  border: none;
  outline: none;
  color: #656565;
  font-size: 1rem;
`;
