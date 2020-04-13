import React from 'react';
import { connect } from 'react-redux';
import { toggleCreateNamespace } from '../../../actions/toggleActions';
import ModalBox from '../../molecules/ModalBox/ModalBox';
import { StyledHeading } from './styles/multiStepStyles';
import CreateNamespaceContextProvider from './context/CreateNamespaceContext';
import ControlPage from './pages/ControlPage';
import PageTemplate from './templates/PageTemplate';
import CreateNamespacePage from './pages/CreateNamespacePage';
import JoinNamespacePage from './pages/JoinNamespacePage';

/*
 * indexes:
 * - 0. Main page (controls to which page should redirect)
 * - 1. Create new namespace
 * - 2. Join to the namespace
 */

const CreateNamespaceWrapper = ({ isCreateNamespaceOpen, toggleCreateNamespace }) => {
  return (
    <ModalBox isOpen={isCreateNamespaceOpen} closeFunction={toggleCreateNamespace}>
      <CreateNamespaceContextProvider>
        <PageTemplate pageIndex={0}>
          <ControlPage />
        </PageTemplate>
        <PageTemplate pageIndex={1}>
          <CreateNamespacePage />
        </PageTemplate>
        <PageTemplate pageIndex={2}>
          <JoinNamespacePage />
        </PageTemplate>
      </CreateNamespaceContextProvider>
    </ModalBox>
  );
};

const mapStateToProps = ({ toggleReducer: { isCreateNamespaceOpen } }) => {
  return { isCreateNamespaceOpen };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleCreateNamespace: isOpen => dispatch(toggleCreateNamespace(isOpen))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNamespaceWrapper);
