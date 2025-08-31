import React, { useState } from 'react';
import { Wrapper, AccordionContainer, AccordionItem, AccordionHeader, AccordionContent, Icon } from './style';

const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <Wrapper>
            <AccordionContainer>
                {items.map((item, index) => (
                    <AccordionItem key={index}>
                        <AccordionHeader onClick={() => toggleAccordion(index)}>
                            {item.question}
                            <Icon isActive={activeIndex === index}>{activeIndex === index ? '-' : '+'}</Icon>
                        </AccordionHeader>
                        {activeIndex === index && (
                            <AccordionContent isActive={activeIndex === index}>
                                <p>{item.answer}</p>
                            </AccordionContent>
                        )}
                    </AccordionItem>
                ))}
            </AccordionContainer>
        </Wrapper>
    );
};

export default Accordion;