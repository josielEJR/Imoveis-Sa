import React from 'react'
import { Wrapper, Container, CardContent, CardContainer, Titulo, Contato, Image } from './style'

const About = ({ dados }) => {

    return (
        <Wrapper>
            <Container>
                <CardContainer>
                    <Image src={`API_URLS.CONSULTORES_IMAGEM/${dados.consultorId}`} alt={`foto do consultor ${dados.nome}`} />
                </CardContainer>
                <CardContent>
                    <Titulo>
                        Sobre Mim
                    </Titulo>
                    <Contato>
                        {dados.sobre}
                    </Contato>
                    <Contato>
                        Telefone: {dados.telefone}
                    </Contato>
                    <Contato>
                        WhatsApp: {dados.whatsApp}
                    </Contato>
                    <Contato>
                        Email: {dados.consultor_email}
                    </Contato>
                </CardContent>
            </Container>
        </Wrapper>
    )
}

export default About
