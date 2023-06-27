import { StyledInput } from '../../styles';
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
