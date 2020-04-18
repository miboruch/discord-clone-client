import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import gsap from 'gsap';
import SlideIcon from '../../atoms/SlideIcon/SlideIcon';
import { useOutsideClick } from '../../../utils/customHooks';
import NamespaceSocketContext from '../../../providers/NamespaceSocketContext';
import MainSocketContext from '../../../providers/MainSocketContext';

const StyledWrapper = styled.div`
  width: 100%;
`;

const MenuWrapper = styled.ul`
  width: 100%;
  position: absolute;
  top: 60px;
  left: 0;
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0;
  z-index: 9;
`;

const StyledParagraph = styled.p`
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const NamespaceName = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding-left: 1.5rem;
  align-items: center;
  position: relative;
  cursor: pointer;
  z-index: 10;
  background-color: ${({ theme }) => theme.color.roomsPanel};
`;

const SingleMenuItem = styled.li`
  width: 100%;
  height: 60px;
  color: #fff;
  background-color: ${({ theme }) => theme.color.roomsPanel};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: background-color 0.5s ease;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 1px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &:hover::after {
    width: 100%;
    transition: width 0.5s ease;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.namespacesPanel};
  }

  &:last-of-type {
    border-bottom: 2px solid ${({ theme }) => theme.color.namespacesPanel};
  }
`;

const NamespaceMenu = ({ currentNamespaceData, userID }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);
  const { socket } = useContext(MainSocketContext);
  const wrapperRef = useRef(null);
  const [isNamespaceMenuOpen, setNamespaceMenuOpen] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const [tl] = useState(gsap.timeline({ defaults: { ease: 'power3.inOut' } }));

  const toggleMenu = () => {
    setNamespaceMenuOpen(!isNamespaceMenuOpen);
    setCopied(false);
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    tl.fromTo(wrapper, { y: '-=30', autoAlpha: 0 }, { y: '0', autoAlpha: 1, duration: 0.3 }).fromTo(
      wrapper.children,
      { autoAlpha: 0, y: '-=20' },
      { autoAlpha: 1, y: '0', stagger: 0.15 }
    );
  }, []);

  useEffect(() => {
    isNamespaceMenuOpen ? tl.play() : tl.reverse();
  }, [isNamespaceMenuOpen]);

  useOutsideClick(wrapperRef, isNamespaceMenuOpen, toggleMenu);

  return (
    <StyledWrapper>
      <NamespaceName onClick={() => toggleMenu()}>
        <StyledParagraph>{currentNamespaceData && currentNamespaceData.name}</StyledParagraph>
        <SlideIcon isOpen={isNamespaceMenuOpen} />
      </NamespaceName>
      <MenuWrapper ref={wrapperRef}>
        <SingleMenuItem onClick={() => {
          navigator.clipboard.writeText(currentNamespaceData._id);
          setCopied(true);
        }}>
          {isCopied ? 'copied!' : 'copy server id'}
        </SingleMenuItem>
        {currentNamespaceData && currentNamespaceData.ownerID === userID ? (
          <SingleMenuItem
            onClick={() => {
              namespaceSocket.emit('delete_namespace', { namespaceID: currentNamespaceData._id });
            }}
          >
            delete server
          </SingleMenuItem>
        ) : (
          <SingleMenuItem
            onClick={() => {
              socket.emit('leave_namespace', { namespaceID: currentNamespaceData._id, userID: userID });
            }}
          >
            leave server
          </SingleMenuItem>
        )}
      </MenuWrapper>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ namespaceReducer: { currentNamespaceData }, authenticationReducer: { userID } }) => {
  return { currentNamespaceData, userID };
};

export default connect(mapStateToProps)(NamespaceMenu);
