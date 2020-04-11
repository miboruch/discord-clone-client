import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setCurrentNamespace } from '../actions/namespaceActions';

const HomePage = ({ setCurrentNamespace }) => {
  useEffect(() => {
    setCurrentNamespace('home');
  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNamespace: namespace => dispatch(setCurrentNamespace(namespace))
  };
};

export default connect(null, mapDispatchToProps)(HomePage);
