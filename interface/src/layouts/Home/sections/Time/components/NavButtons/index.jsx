import React from 'react'

import { Wrapper, SelectorSection, IndexSelector } from './style'

const NavButtons = ({ selectedButton, handleButtonClick }) => {

    return (
        <Wrapper>
            <SelectorSection>
                <IndexSelector
                    onClick={() => {
                        handleButtonClick(0)
                    }}
                    grow={selectedButton === 0 ? "true" : "false"}
                />
                <IndexSelector
                    onClick={() => {
                        handleButtonClick(1)
                    }}
                    grow={selectedButton === 1 ? "true" : "false"}
                />
                <IndexSelector
                    onClick={() => {
                        handleButtonClick(2)
                    }}
                    grow={selectedButton === 2 ? "true" : "false"}
                />
            </SelectorSection>
        </Wrapper>
    )
}

export default NavButtons