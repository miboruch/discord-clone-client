import React from 'react';
import { connect } from 'react-redux';
import { toggleCreateNamespace } from '../../../actions/toggleActions';
import ModalBox from '../../molecules/ModalBox/ModalBox';
import { StyledHeading } from './styles/multiStepStyles';
import CreateNamespaceForm from '../../molecules/CreateNamespaceForm/CreateNamespaceForm';
import CreateNamespaceContextProvider from './context/CreateNamespaceContext';
import ControlPage from './pages/ControlPage';
import PageTemplate from './templates/PageTemplate';

/*
 * indexes:
 * - 0. Main page (controls to which page should redirect)
 * - 1. Join to namespace
 * - 2. Create new namespace
 */

const CreateNamespaceWrapper = ({ isCreateNamespaceOpen, toggleCreateNamespace }) => {
  return (
    <ModalBox isOpen={isCreateNamespaceOpen} closeFunction={toggleCreateNamespace}>
      <CreateNamespaceContextProvider>
        <PageTemplate pageIndex={0}>
          <ControlPage />
        </PageTemplate>
        <PageTemplate pageIndex={1}>
          <StyledHeading>Page 1</StyledHeading>
        </PageTemplate>
        <PageTemplate pageIndex={2}>
          <StyledHeading>Create server</StyledHeading>
          <CreateNamespaceForm />
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
