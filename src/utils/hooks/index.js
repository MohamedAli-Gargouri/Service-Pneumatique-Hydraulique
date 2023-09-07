import React, { useState, useEffect } from 'react';

//This hook determine if an element is in the ViewPort or not.
const useElementInViewport = (elementRef, margin = 0,HandlerFunction,ExecuteOnce) => {
  const Executed=React.useRef(false)
  useEffect(() => {

    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (
          rect.top - margin <= windowHeight &&
          rect.bottom + margin >= 0
        ) {
          if(!Executed.current)
          {
            console.log("Here")
            if(ExecuteOnce)
            {
              console.log("Here2")
              Executed.current=true
            }
            HandlerFunction()

          }
        } 
      }
    };

    // Initial check
    handleScroll();

    // Attach the event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


};

export default useElementInViewport;
