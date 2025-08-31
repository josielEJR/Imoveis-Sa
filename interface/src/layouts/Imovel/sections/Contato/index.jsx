import React, { forwardRef } from 'react'
import { Container, ContatoContainer, Title, Wrapper } from './style'
import CardInfo from './components/CardInfo'
import Agendar from './components/Formulário'

const ContatoLayout = forwardRef(({ consultorId, imovelID }, ref) => {
    return (
        <Wrapper ref={ref}>
            <Container>
                <Title>
                    Fale com o Corretor
                </Title>
                <ContatoContainer>
                    <CardInfo consultorId={consultorId} />
                    <Agendar imovelID={imovelID}/>
                </ContatoContainer>
            </Container>
        </Wrapper>
    )
})

export default ContatoLayout