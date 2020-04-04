import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import Picker from 'emoji-picker-react';
import { useOutsideClick } from '../../../utils/customHooks';
import NamespaceSocketContext from '../../../providers/namespaceSocketContext';

const MessageInputWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledTextArea = styled.input`
  width: 90%;
  height: 100%;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  color: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#000')};
  background-color: ${({ isDarkTheme, theme }) =>
    isDarkTheme ? theme.color.inputBackgroundDark : theme.color.inputBackgroundLight};
  transition: background-color 0.3s ease;
  resize: none;
  font-family: ${({ theme }) => theme.font.family.futura};
  overflow: hidden;
  padding: 1rem;

  &:focus {
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

const StyledForm = styled(Form)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MessageInput = ({ isDarkTheme, currentRoomInfo, currentRoomName }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);

  const emojiWrapperRef = useRef(null);
  const inputRef = useRef(null);
  const [isEmojiOpen, setEmojiOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [message, setMessage] = useState([]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const toggleEmoji = () => {
    setEmojiOpen(!isEmojiOpen);
  };

  /* Move to Chat.js when Redux message state is created */
  useEffect(() => {
    if (namespaceSocket) {
      namespaceSocket.on('new_message', newMessage => {
        console.log(newMessage);
        setMessage(array => [...array, newMessage]);
      });
    }
  }, [namespaceSocket]);

  useOutsideClick(emojiWrapperRef, isEmojiOpen, toggleEmoji);

  return (
    <MessageInputWrapper>
      <Formik
        initialValues={{ message: '' }}
        onSubmit={({ message }, { resetForm }) => {
          console.log(message);
          console.log('Test \n hello');
          namespaceSocket.emit('send_message', { message: message, room: currentRoomName });
          resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => {
          return (
            <StyledForm>
              <StyledTextArea
                ref={inputRef}
                placeholder={`Message #${currentRoomInfo.name}`}
                onChange={handleChange}
                onBlur={handleBlur}
                isDarkTheme={isDarkTheme}
                value={values.message}
                name={'message'}
              />
              <p onClick={() => toggleEmoji()}>{isEmojiOpen ? 'Close' : 'Open'}</p>
              <button type='submit' onClick={handleSubmit}>
                send
              </button>
            </StyledForm>
          );
        }}
      </Formik>
      <EmojiWrapper isOpen={isEmojiOpen} ref={emojiWrapperRef}>
        <Picker onEmojiClick={onEmojiClick} />
      </EmojiWrapper>
    </MessageInputWrapper>
  );
};

const mapStateToProps = ({ toggleReducer: { isDarkTheme }, roomReducer: { currentRoomInfo, currentRoomName } }) => {
  return { isDarkTheme, currentRoomInfo, currentRoomName };
};

export default connect(mapStateToProps)(MessageInput);
