import React from 'react';
import { Wrapper, TitlleValue, ValuesSection, ValueCard, ValueIcon, ValueTitle } from './style';
import { FaPeopleCarry } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaRegHandshake } from "react-icons/fa6";

const NossosValores = () => {
    return (
        <Wrapper>
            <TitlleValue>
                Nossos Valores
            </TitlleValue>
            <ValuesSection>
                <ValueCard>
                    <ValueIcon>
                        <FaRegHandshake />
                    </ValueIcon>
                    <ValueTitle>Comprometimento</ValueTitle>
                </ValueCard>
                <ValueCard>
                    <ValueIcon>
                        <FaPeopleCarry />
                    </ValueIcon>
                    <ValueTitle>Respeito</ValueTitle>
                </ValueCard>
                <ValueCard>
                    <ValueIcon>
                        <HiOutlineLightBulb />
                    </ValueIcon>
                    <ValueTitle>Inovação</ValueTitle>
                </ValueCard>
            </ValuesSection>
        </Wrapper>
    );
};

export default NossosValores;
