import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;

  ${({ theme }) => theme.mq.standard} {
    margin-bottom: 2rem;
  }
`;

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.font.family.futura};
  font-size: 12px;
  color: ${({ colorTheme }) => (colorTheme === 'dark' ? '#f5f5f5' : '1d1d1d')};
`;

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  background: none;
  border: none;
  border-bottom: 1px solid ${({ colorTheme }) => (colorTheme === 'dark' ? '#f5f5f5' : 'rgba(23, 23, 23, 0.4)')};
  color: ${({ colorTheme }) => (colorTheme === 'dark' ? '#f5f5f5' : '#1d1d1d')};
  font-family: ${({ theme }) => theme.font.family.futura};
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #ccc;
  }

  &::placeholder {
    letter-spacing: 1px;
    padding-left: 0.2rem;
    font-size: 14px;
  }
`;

const FormInput = ({ labelText, onChange, onBlur, colorTheme, inputType, name, ...props }) => {
  return (
    <StyledInputWrapper>
      {labelText ? (
        <StyledLabel colorTheme={colorTheme} htmlFor={name}>
          {labelText}
        </StyledLabel>
      ) : null}
      <StyledInput
        onChange={onChange}
        onBlur={onBlur}
        type={inputType}
        colorTheme={colorTheme}
        name={name}
        {...props}
      />
    </StyledInputWrapper>
  );
};

FormInput.propTypes = {
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  inputType: PropTypes.string,
  name: PropTypes.string,
  colorTheme: PropTypes.oneOf(['light', 'dark']),
  value: PropTypes.string
};

export default FormInput;
