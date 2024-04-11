import React, { ElementRef, RefObject, useEffect } from 'react';

/**
 *
 * @param {RefObject<HTMLDivElement>} elementRef Reference of the elemennt
 * @param {number} margin The Margin to apply
 * @param {Function} HandlerFunction The function to execute when the element is in view
 * @param {boolean} ExecuteOnce boolean value to say if we should execute it once per element in view.
 */
const useElementInViewport = (
  elementRef: RefObject<HTMLDivElement | undefined>,
  margin: number = 0,
  HandlerFunction: Function,
  ExecuteOnce: boolean,
) => {
  const Executed = React.useRef(false);
  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (rect.top - margin <= windowHeight && rect.bottom + margin >= 0) {
          if (!Executed.current) {
            if (ExecuteOnce) {
              Executed.current = true;
            }
            HandlerFunction();
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default useElementInViewport;
