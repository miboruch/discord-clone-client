import React, { useEffect } from 'react';

export const useOutsideClick = (ref, isOpen, callback) => {
  useEffect(() => {
    if (isOpen) {
      const handleOutsideClick = event => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener('click', handleOutsideClick);

      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }
  }, [ref, isOpen]);
};
