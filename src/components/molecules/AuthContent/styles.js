import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form } from 'formik';

export const StyledHeading = styled.h1`
  font-family: ${({ theme }) => theme.font.family.avanti};
  font-size: 32px;
  margin-bottom: 2rem;
  letter-spacing: 2px;

  ${({ theme }) => theme.mq.standard} {
    font-size: 56px;
  }
`;

export const StyledForm = styled(Form)`
  width: 90%;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.7 : 1)};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};
  transition: opacity 0.5s ease;
`;

export const StyledButton = styled.button`
  width: 140px;
  height: 40px;
  background: ${({ theme }) => theme.color.backgroundDark};
  border: none;
  font-family: ${({ theme }) => theme.font.family.futura};
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const StyledLink = styled(Link)`
  color: #000;
  font-size: 13px;
  letter-spacing: 1px;
  margin-top: 1rem;

  ${({ theme }) => theme.mq.standard} {
    margin-top: 2rem;
  }
`;

export const StyledParagraph = styled.p`
  font-size: 13px;
  letter-spacing: 1px;
  margin-top: 1rem;

  ${({ theme }) => theme.mq.standard} {
    margin-top: 2rem;
  }
`;
