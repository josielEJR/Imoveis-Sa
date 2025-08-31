// NavButtons.js
import React from 'react';
import { WrapperNavButton, ContainerNavButton, NavButton } from './style'; 

const NavButtons = ({ sliderButton, handleButtonClick }) => {
  return (
    <WrapperNavButton>
      <ContainerNavButton>
        <NavButton
          width={sliderButton === 1 ? 50 : 25}
          selected={sliderButton === 1 ? "true" : "false"}
          onClick={() => handleButtonClick(1)}
        >  
        </NavButton>
        <NavButton
          width={sliderButton === 2 ? 50 : 30}
          selected={sliderButton === 2 ? "true" : "false"}
          onClick={() => handleButtonClick(2)}
        >  
        </NavButton>
        <NavButton
          width={sliderButton === 3 ? 50 : 40 }
          selected={sliderButton === 3 ? "true" : "false"}
          onClick={() => handleButtonClick(3)}
        >  
        </NavButton>
      </ContainerNavButton>
    </WrapperNavButton>
  );
};

export default NavButtons;
