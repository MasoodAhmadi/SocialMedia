import styled, { keyframes } from 'styled-components';
import { bounceIn } from 'react-animations';

const bounceAnimation = keyframes`${bounceIn}`;

export const ClipboardStyle = styled.div`
  animation: 2s ${bounceAnimation};
`;
