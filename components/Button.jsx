import styled from 'styled-components';

const ButtonStyle = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${props =>
    props.primary ? 'var(--color-primary)' : 'var(--bg-primary)'};
  color: ${props => (props.primary ? 'white' : 'var(--color-contrast)')};
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.2;
`;

const Button = ({ disabled, className, children, primary, onClick, block }) => {
  return (
    <>
      <ButtonStyle
        primary={primary}
        disabled={disabled}
        className={className}
        onClick={onClick}
      >
        {children}
      </ButtonStyle>
    </>
  );
};

export default Button;
