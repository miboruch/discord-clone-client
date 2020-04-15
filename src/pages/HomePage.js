import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setCurrentNamespace, setCurrentNamespaceData } from '../actions/namespaceActions';

const HomePage = ({ setCurrentNamespace, setCurrentNamespaceData }) => {
  useEffect(() => {
    setCurrentNamespace('home');
    setCurrentNamespaceData(null);
  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNamespace: namespaceID => dispatch(setCurrentNamespace(namespaceID)),
    setCurrentNamespaceData: namespaces => dispatch(setCurrentNamespaceData(namespaces))
  };
};

export default connect(null, mapDispatchToProps)(HomePage);
