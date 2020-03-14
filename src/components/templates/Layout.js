import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from '../../style/theme';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

/* Layout provides all HOC, ThemeProviders and so on... */
const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledWrapper>{children}</StyledWrapper>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default Layout;
