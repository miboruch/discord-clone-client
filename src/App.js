import React, { useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import Layout from './components/templates/Layout';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthPage from './pages/AuthPage';
import ServerPage from './pages/ServerPage';
import { authenticationCheck } from './actions/authenticationActions';
import Spinner from './components/atoms/Spinner/Spinner';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: ${({ isDarkTheme, theme }) =>
    isDarkTheme ? theme.color.backgroundDark : theme.color.backgroundLight};
`;

function App({ isLoggedIn, loading, authenticationCheck }) {
  useEffect(() => {
    !localStorage.getItem('isDarkTheme') && localStorage.setItem('isDarkTheme', 'true');
    authenticationCheck();
  }, []);

  return (
    <Router>
      <Layout>
        <StyledWrapper>
          {loading ? (
            <Spinner />
          ) : (
            <Switch>
              {isLoggedIn ? (
                <>
                  <Route path={'/'} component={ServerPage} />
                </>
              ) : (
                <>
                  <Route path={'/'} component={AuthPage} />
                  <Redirect exact from={'/'} to={'/login'} />
                </>
              )}
            </Switch>
          )}
        </StyledWrapper>
      </Layout>
    </Router>
  );
}

const mapStateToProps = ({ authenticationReducer: { isLoggedIn, loading } }) => {
  return { isLoggedIn, loading };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticationCheck: () => dispatch(authenticationCheck())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
