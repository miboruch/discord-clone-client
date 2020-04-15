import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const CreateNamespaceContext = React.createContext({
  currentPage: 0,
  changePage: index => {}
});

const CreateNamespaceContextProvider = ({ children }) => {
  const [currentPage, changePage] = useState(0);

  return (
    <CreateNamespaceContext.Provider value={{ currentPage, changePage }}>{children}</CreateNamespaceContext.Provider>
  );
};

CreateNamespaceContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CreateNamespaceContextProvider;
