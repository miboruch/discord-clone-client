import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CreateNamespaceContext } from '../context/CreateNamespaceContext';
import * as Styles from '../styles/multiStepStyles';

const PageTemplate = ({ children, pageIndex }) => {
  const { currentPage, changePage, toggleColorChoose, isChooseColorOpen } = useContext(CreateNamespaceContext);
  return (
    currentPage === pageIndex && (
      <Styles.StyledContentWrapper>
        {children}
        {currentPage !== 0 && <Styles.BackParagraph onClick={() => changePage(0)}>GO BACK</Styles.BackParagraph>}
        {currentPage === 2 && (
          <Styles.ChooseColorParagraph onClick={() => toggleColorChoose()}>
            {isChooseColorOpen ? 'SAVE' : 'CHOOSE COLOR'}
          </Styles.ChooseColorParagraph>
        )}
      </Styles.StyledContentWrapper>
    )
  );
};

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  pageIndex: PropTypes.number.isRequired
};

export default PageTemplate;
