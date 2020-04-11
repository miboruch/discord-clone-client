import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const CreateNamespaceContext = React.createContext({
  currentPage: 0,
  changePage: index => {},
  isChooseColorOpen: false
});

const CreateNamespaceContextProvider = ({ children }) => {
  const [currentPage, changePage] = useState(0);
  const [isChooseColorOpen, setChooseColorOpen] = useState(false);

  const toggleColorChoose = () => {
    setChooseColorOpen(!isChooseColorOpen);
  };

  return (
    <CreateNamespaceContext.Provider value={{ currentPage, changePage, isChooseColorOpen, toggleColorChoose }}>
      {children}
    </CreateNamespaceContext.Provider>
  );
};

CreateNamespaceContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CreateNamespaceContextProvider;
