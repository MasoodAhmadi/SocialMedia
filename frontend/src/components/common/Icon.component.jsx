import { StyledIcon } from '../../styles';

export default function Icon({ color, children }) {
  return <StyledIcon background={color}>{children}</StyledIcon>;
}
