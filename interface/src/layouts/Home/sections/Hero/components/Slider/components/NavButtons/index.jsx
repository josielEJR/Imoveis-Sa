// NavButtons.js
import React from 'react';
import { WrapperNavButton, ContainerNavButton, NavButton } from './style'; 

const NavButtons = ({ selectedButton, handleButtonClick }) => {
  return (
    <WrapperNavButton>
      <ContainerNavButton>
        <NavButton
          width={selectedButton === 1 ? 70 : 25}
          selected={selectedButton === 1 ? "true" : "false"}
          onClick={() => handleButtonClick(1)}
        >  
        </NavButton>
        <NavButton
          width={selectedButton === 2 ? 70 : 35}
          selected={selectedButton === 2 ? "true" : "false"}
          onClick={() => handleButtonClick(2)}
        >  
        </NavButton>
        <NavButton
          width={selectedButton === 3 ? 70 : 45}
          selected={selectedButton === 3 ? "true" : "false"}
          onClick={() => handleButtonClick(3)}
        >  
        </NavButton>
      </ContainerNavButton>
    </WrapperNavButton>
  );
};

export default NavButtons;
