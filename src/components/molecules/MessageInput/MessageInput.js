import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Picker from 'emoji-picker-react';
import Spinner from '../../atoms/Spinner/Spinner';
import { useOutsideClick } from '../../../utils/customHooks';

const MessageInputWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledTextArea = styled.textarea`
  width: 90%;
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

const EmojiWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: -1.5rem;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  transform: translateY(-100%);
`;

const MessageInput = ({ isDarkTheme, currentRoomInfo }) => {
  const emojiWrapperRef = useRef(null);
  const [isEmojiOpen, setEmojiOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const toggleEmoji = () => {
    setEmojiOpen(!isEmojiOpen);
  };

  useOutsideClick(emojiWrapperRef, isEmojiOpen, toggleEmoji);

  return (
    <MessageInputWrapper>
      <StyledTextArea placeholder={`Message #${currentRoomInfo.name}`} isDarkTheme={isDarkTheme} />
      <p onClick={() => toggleEmoji()}>{isEmojiOpen ? 'Close' : 'Open'}</p>
      <EmojiWrapper isOpen={isEmojiOpen} ref={emojiWrapperRef}>
        <Picker onEmojiClick={onEmojiClick} />
      </EmojiWrapper>
    </MessageInputWrapper>
  );
};

const mapStateToProps = ({ toggleReducer: { isDarkTheme }, roomReducer: { currentRoomInfo } }) => {
  return { isDarkTheme, currentRoomInfo };
};

export default connect(mapStateToProps)(MessageInput);
