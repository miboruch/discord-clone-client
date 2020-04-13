import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyledButton } from '../../../molecules/AuthContent/styles';
import MainSocketContext from '../../../../providers/MainSocketContext';
import { NamespaceControllerContext } from '../context/NamespaceControllerContext';
import { ReactComponent as PasswordIcon } from '../../../../assets/icons/password.svg';

const StyledNamespaceWrapper = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
`;

const StyledNamespaceName = styled.p`
  color: #222;
`;

const StyledPasswordIcon = styled(PasswordIcon)`
  width: 25px;
  height: 25px;
  fill: #ccc;
  margin-right: 1.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NamespaceJoinBox = ({ namespace, userID }) => {
  const { socket } = useContext(MainSocketContext);
  const { changePage, setChosenNamespace } = useContext(NamespaceControllerContext);
  return (
    <StyledNamespaceWrapper>
      <StyledNamespaceName>{namespace.name}</StyledNamespaceName>
      <ButtonWrapper>
        {namespace.password && <StyledPasswordIcon />}
        <StyledButton
          onClick={() => {
            if (namespace.password) {
              setChosenNamespace(namespace);
              changePage(4);
            } else {
              socket.emit('new_namespace_join', { userID, namespace });
            }
          }}
        >
          Join
        </StyledButton>
      </ButtonWrapper>
    </StyledNamespaceWrapper>
  );
};

NamespaceJoinBox.propTypes = {
  namespace: PropTypes.object.isRequired
};

const mapStateToProps = ({ authenticationReducer: { userID } }) => {
  return { userID };
};

export default connect(mapStateToProps)(NamespaceJoinBox);
