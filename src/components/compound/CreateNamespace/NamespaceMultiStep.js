import React, { useContext } from 'react';
import CreateNamespaceContextProvider from './CreateNamespaceContext';
import PropTypes from 'prop-types';
import { CreateNamespaceContext } from './CreateNamespaceContext';

const Page = ({ children, pageIndex }) => {
  const { currentPage } = useContext(CreateNamespaceContext);
  return currentPage === pageIndex ? children : null;
};

const Controls = () => {
  const { currentPage, changePage } = useContext(CreateNamespaceContext);

  return currentPage !== 0 ? <div>/* Create or join boxes */</div> : null;
};

const Wizard = ({ children }) => {
  return <CreateNamespaceContextProvider>{children}</CreateNamespaceContextProvider>;
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  pageIndex: PropTypes.number.isRequired
};

Wizard.propTypes = {
  children: PropTypes.node.isRequired
};

export { Page, Controls, Wizard };
