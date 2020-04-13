import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CreateNamespaceContext } from '../context/CreateNamespaceContext';
import * as Styles from '../styles/multiStepStyles';

const PageTemplate = ({ children, pageIndex }) => {
  const { currentPage } = useContext(CreateNamespaceContext);
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
