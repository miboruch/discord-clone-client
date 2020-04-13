import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const NamespaceControllerContext = React.createContext({
  currentPage: 0,
  changePage: index => {},
  isChooseColorOpen: false,
  chosenNamespace: {},
  setChosenNamespace: namespace => {}
});

const NamespaceControllerContextProvider = ({ children }) => {
  const [currentPage, changePage] = useState(0);
  const [chosenNamespace, setChosenNamespace] = useState({});
  const [isChooseColorOpen, setChooseColorOpen] = useState(false);

  const toggleColorChoose = () => {
    setChooseColorOpen(!isChooseColorOpen);
  };

  return (
    <NamespaceControllerContext.Provider
      value={{ currentPage, changePage, isChooseColorOpen, toggleColorChoose, chosenNamespace, setChosenNamespace }}
    >
      {children}
    </NamespaceControllerContext.Provider>
  );
};

NamespaceControllerContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default NamespaceControllerContextProvider;
