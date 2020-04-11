import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import CreateNamespaceForm from '../../../molecules/CreateNamespaceForm/CreateNamespaceForm';
import * as Styles from '../styles/multiStepStyles';
import { StyledHeading } from '../styles/multiStepStyles';
import { CreateNamespaceContext } from '../context/CreateNamespaceContext';
import { ChromePicker } from 'react-color';
import { useOutsideClick } from '../../../../utils/customHooks';

const PickerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: -15px;
  transform: translateX(100%);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  border-radius: 100px;
  z-index: -1;
  transition: opacity 0.5s ease, visibility 0.5s ease;
`;

const CreateNamespacePage = () => {
  const { isChooseColorOpen, toggleColorChoose } = useContext(CreateNamespaceContext);
  const colorPickerRef = useRef(null);
  const [color, setColor] = useState('#53d4ac');

  const handleChangeComplete = (color, event) => {
    setColor(color.hex);
  };

  useOutsideClick(colorPickerRef, isChooseColorOpen, toggleColorChoose);

  return (
    <>
      <StyledHeading>Create server</StyledHeading>
      <CreateNamespaceForm color={color} />
      <PickerWrapper ref={colorPickerRef} isOpen={isChooseColorOpen}>
        <ChromePicker color={color} onChange={handleChangeComplete} />
      </PickerWrapper>
      <Styles.ChooseColorParagraph onClick={() => toggleColorChoose()} color={color}>
        {isChooseColorOpen ? 'SAVE' : 'CHOOSE COLOR'}
      </Styles.ChooseColorParagraph>
    </>
  );
};

export default CreateNamespacePage;
