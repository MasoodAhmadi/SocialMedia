import styled from 'styled-components';
import { StyledInput } from '../../styles/input.style';
export default function Input({ type, name, placeholder, onChange, value }) {
  return (
    <StyledInput
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
