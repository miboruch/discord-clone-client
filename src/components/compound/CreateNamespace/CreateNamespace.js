import React from 'react';
import styled from 'styled-components';
import * as NamespaceMultiStep from './MultiStep/NamespaceMultiStep';
import { connect } from 'react-redux';
import { closeCreateNamespace } from '../../../actions/toggleActions';
import ModalBox from '../../molecules/ModalBox/ModalBox';
import { StyledHeading } from './styles/multiStepStyles';
import CreateNamespaceForm from '../../molecules/CreateNamespaceForm/CreateNamespaceForm';

const CreateNamespace = ({ isCreateNamespaceOpen, closeCreateNamespace }) => {
  return (
    <ModalBox isOpen={isCreateNamespaceOpen} closeFunction={closeCreateNamespace}>
      <NamespaceMultiStep.Wizard>
        <NamespaceMultiStep.Page pageIndex={0}>
          <NamespaceMultiStep.Controls />
        </NamespaceMultiStep.Page>
        <NamespaceMultiStep.Page pageIndex={1}>
          <StyledHeading>Page 1</StyledHeading>
        </NamespaceMultiStep.Page>
        <NamespaceMultiStep.Page pageIndex={2}>
          <StyledHeading>Create server</StyledHeading>
          <CreateNamespaceForm />
        </NamespaceMultiStep.Page>
      </NamespaceMultiStep.Wizard>
    </ModalBox>
  );
};

const mapStateToProps = ({ toggleReducer: { isCreateNamespaceOpen } }) => {
  return { isCreateNamespaceOpen };
};

const mapDispatchToProps = dispatch => {
  return {
    closeCreateNamespace: () => dispatch(closeCreateNamespace())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNamespace);
