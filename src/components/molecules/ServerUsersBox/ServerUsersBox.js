import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import UserDisplayPanel from '../../atoms/UserDisplayPanel/UserDisplayPanel';

const StyledWrapper = styled.div`
  width: 300px;
  height: 100vh;
  border-left: 1px solid #000;
  display: none;
  padding: 60px 0;

  ${({ theme }) => theme.mq.standard} {
    display: block;
  }
`;

const StyledBox = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const ServerUsersBox = ({ namespaceUsers, currentNamespaceData }) => {
  return (
    <StyledWrapper>
      <StyledBox>
        {namespaceUsers.map(user => {
          const name = `${user.name} ${user.lastName}`;
          const isOwner = currentNamespaceData && user._id === currentNamespaceData.ownerID;
          return <UserDisplayPanel isActive={false} name={name} isOwner={isOwner} />;
        })}
      </StyledBox>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ namespaceReducer: { namespaceUsers, currentNamespaceData } }) => {
  return { namespaceUsers, currentNamespaceData };
};

export default connect(mapStateToProps)(ServerUsersBox);
