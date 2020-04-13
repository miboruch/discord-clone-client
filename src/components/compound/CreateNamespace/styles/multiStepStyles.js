import styled from 'styled-components';
import { ReactComponent as CreateIcon } from '../../../../assets/icons/create.svg';
import { ReactComponent as JoinIcon } from '../../../../assets/icons/join.svg';

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

export const StyledContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const StyledJoinSection = styled.section`
  width: 40%;
  height: 60%;
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    -webkit-box-shadow: -2px 6px 20px -3px rgba(69, 65, 69, 1);
    -moz-box-shadow: -2px 6px 20px -3px rgba(69, 65, 69, 1);
    box-shadow: -2px 6px 20px -3px rgba(69, 65, 69, 1);
  }
`;

export const StyledCreateSection = styled(StyledJoinSection)`
  background-color: #46cf94;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledCreateIcon = styled(CreateIcon)`
  width: 70px;
  height: 70px;
`;

export const StyledJoinIcon = styled(JoinIcon)`
  width: 70px;
  height: 70px;
`;

export const StyledHeading = styled.h1`
  font-size: 36px;
  font-family: ${({ theme }) => theme.font.family.avanti};
  color: #000;
  position: absolute;
  top: 4rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledParagraph = styled.p`
  font-size: 14px;
  letter-spacing: 1px;
  text-align: center;
  padding-bottom: 2.5rem;
  color: #000;
`;

export const BackParagraph = styled.p`
  color: #777;
  letter-spacing: 1px;
  position: absolute;
  bottom: 2rem;
  left: 4rem;
  cursor: pointer;
`;

export const ChooseColorParagraph = styled(BackParagraph)`
  left: auto;
  right: 4rem;
  bottom: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 10%;
    left: -20px;
    width: 15px;
    height: 15px;
    border: 1px solid #ccc;
    background-color: ${({ color }) => color};
  }
`;

export const StyledInfoParagraph = styled.p`
  font-size: 14px;
  color: #111;
  margin: 1.3rem 0;
`;
