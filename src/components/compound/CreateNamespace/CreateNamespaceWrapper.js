import React from 'react';
import { connect } from 'react-redux';
import { toggleCreateNamespace } from '../../../actions/toggleActions';
import ModalBox from '../../molecules/ModalBox/ModalBox';
import NamespaceControllerContextProvider from './context/NamespaceControllerContext';
import ControlPage from './pages/ControlPage';
import PageTemplate from './templates/PageTemplate';
import CreateNamespacePage from './pages/CreateNamespacePage';
import JoinNamespacePage from './pages/JoinNamespacePage';
import FoundNamespacesPage from './pages/FoundNamespacesPage';
import JoinNamespacePassword from './pages/JoinNamespacePassword';

/*
 * indexes:
 * - 0. Main page (controls to which page should redirect)
 * - 1. Create new namespace
 * - 2. Join to the namespace
 * - 3. Render searched namespaces
 * - 4. Password page (if required)
 */

const CreateNamespaceWrapper = ({ isCreateNamespaceOpen, toggleCreateNamespace }) => {
  return (
    <ModalBox isOpen={isCreateNamespaceOpen} closeFunction={toggleCreateNamespace}>
      <NamespaceControllerContextProvider>
        <PageTemplate pageIndex={0}>
          <ControlPage />
        </PageTemplate>
        <PageTemplate pageIndex={1}>
          <CreateNamespacePage />
        </PageTemplate>
        <PageTemplate pageIndex={2}>
          <JoinNamespacePage />
        </PageTemplate>
        <PageTemplate pageIndex={3}>
          <FoundNamespacesPage />
        </PageTemplate>
        <PageTemplate pageIndex={4}>
          <JoinNamespacePassword />
        </PageTemplate>
      </NamespaceControllerContextProvider>
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
