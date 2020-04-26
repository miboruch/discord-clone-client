import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ReactComponent as CrownIcon } from '../../../assets/icons/crown.svg';

const StyledWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  padding: 2rem;
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, isDarkTheme }) => (isDarkTheme ? theme.color.roomsPanel : '#ddd')};
  }
`;

const StyledImage = styled.img`
  width: 25px;
  height: 25px;
  border: ${({ isDarkTheme }) => (isDarkTheme ? 'none' : '1px solid #888')};
  border-radius: 50%;
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledParagraph = styled.p`
  font-size: 14px;
  letter-spacing: 1px;
`;

const ActiveDot = styled.div`
  position: absolute;
  top: 50%;
  right: 1rem;
  width: 8px;
  height: 8px;
  background-color: darkgreen;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const NotActiveDot = styled(ActiveDot)`
  background-color: transparent;
  border: 2px solid #ccc;
`;

const StyledCrownIcon = styled(CrownIcon)`
  width: 15px;
  height: 15px;
  padding-left: 3px;
`;

const UserDisplayPanel = ({ imageURL, name, isOnline, isDarkTheme, isOwner }) => {
  return (
    <StyledWrapper isDarkTheme={isDarkTheme}>
      <StyledImage src={imageURL} isDarkTheme={isDarkTheme} />
      <StyledParagraph>{name}</StyledParagraph>
      {isOwner && <StyledCrownIcon />}
      {isOnline ? <ActiveDot /> : <NotActiveDot />}
    </StyledWrapper>
  );
};

UserDisplayPanel.propTypes = {
  imageURL: PropTypes.string,
  name: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool
};

UserDisplayPanel.defaultProps = {
  imageURL: 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-7.png',
  isOwner: false
};

const mapStateToProps = ({ toggleReducer: { isDarkTheme } }) => {
  return { isDarkTheme };
};

export default connect(mapStateToProps)(UserDisplayPanel);
