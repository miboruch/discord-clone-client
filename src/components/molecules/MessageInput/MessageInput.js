import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Picker from 'emoji-picker-react';
import Spinner from '../../atoms/Spinner/Spinner';

const StyledInput = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  background: ${({ isDarkTheme, theme }) =>
    isDarkTheme ? theme.color.inputBackgroundDark : theme.color.inputBackgroundLight};
  // border: ${({ isDarkTheme }) => (isDarkTheme ? '2px solid rgba(255,255,255,0.8)' : '2px solid rgba(0,0,0,0.7)')};
  color: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#000')};
  resize: none;
  font-family: ${({ theme }) => theme.font.family.futura};
  overflow: hidden;
  padding: 1rem;
  
  &:focus{
    outline: none;
  }
`;

const MessageInput = ({ isDarkTheme, currentRoomInfo }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <>
      <p>{chosenEmoji ? <span>You choose: {chosenEmoji.emoji}</span> : 'No emoji'}</p>
      <StyledInput placeholder={`Message #${currentRoomInfo.name}`} isDarkTheme={isDarkTheme} />
      <Picker onEmojiClick={onEmojiClick} />
    </>
  );
};

const mapStateToProps = ({ toggleReducer: { isDarkTheme }, roomReducer: { currentRoomInfo } }) => {
  return { isDarkTheme, currentRoomInfo };
};

export default connect(mapStateToProps)(MessageInput);
