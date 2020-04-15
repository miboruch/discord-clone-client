import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gsap from 'gsap';

const StyledWrapper = styled.ul`
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

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: #000;
  }

  &:hover::after {
    width: 100%;
    transition: width 0.5s ease;
  }
  
  &:last-of-type{
    border-bottom: 1px solid #000;
  }
`;

const NamespaceMenu = ({ isOpen }) => {
  const wrapperRef = useRef(null);
  const [tl] = useState(gsap.timeline({ defaults: { ease: 'power3.inOut' } }));

  useEffect(() => {
    const wrapper = wrapperRef.current;
    tl.fromTo(wrapper, { y: '-=30', autoAlpha: 0 }, { y: '0', autoAlpha: 1, duration: 0.3 }).fromTo(
      wrapper.children,
      { autoAlpha: 0, y: '-=20' },
      { autoAlpha: 1, y: '0', stagger: 0.15 }
    );
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  return (
    <StyledWrapper ref={wrapperRef} isOpen={isOpen}>
      <SingleMenuItem>hey</SingleMenuItem>
      <SingleMenuItem>whats</SingleMenuItem>
      <SingleMenuItem>up</SingleMenuItem>
    </StyledWrapper>
  );
};

NamespaceMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

export default NamespaceMenu;
