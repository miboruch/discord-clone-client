import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NamespaceControllerContext } from '../context/NamespaceControllerContext';
import * as Styles from '../styles/multiStepStyles';

const PageTemplate = ({ children, pageIndex }) => {
  const { currentPage } = useContext(NamespaceControllerContext);
  return (
    currentPage === pageIndex && (
      <Styles.StyledContentWrapper>
        {children}
      </Styles.StyledContentWrapper>
    )
  );
};

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  pageIndex: PropTypes.number.isRequired
};

export default PageTemplate;
