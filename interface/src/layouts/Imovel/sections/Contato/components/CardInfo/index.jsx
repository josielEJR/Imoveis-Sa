import React, { useEffect, useState } from 'react'
import { Wrapper, Container, CardContent, CardContainer, Titulo, Contato, Image } from './style'
import API_URLS from '../../../../../../config/api'

const CardInfo = ({ consultorId }) => {
    const [consultorInfo, setConsultorInfo] = useState({})

    useEffect(() => {
        if (consultorId) {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            }

            fetch(`${API_URLS.CONSULTORES_BUSCAR_ID}?id=${consultorId}`, requestOptions)
                .then(response => response.json())
                .then(consultorArray => {
                    if (consultorArray.length > 0) {
                        const consultor = consultorArray[0]
                        setConsultorInfo(consultor)
                    } else {
                        console.log("Consultor não encontrado")
                    }
                })
                .catch(error => console.error(error))
        }
    }, [consultorId])

    return (
        <Wrapper>
            <Container>
                <CardContainer
                    key={consultorInfo.id}
                >
                    <Image src={`${API_URLS.CONSULTORES_IMAGEM}/${consultorInfo.consultorId}`} alt={`foto do consultor ${consultorInfo.nome}`} />
                </CardContainer>
                <CardContent>
                    <Titulo>
                        {consultorInfo.nome}
                    </Titulo>
                    <Contato>
                        {consultorInfo.sobre}
                    </Contato>
                    <Contato>
                        Telefone: {consultorInfo.telefone}
                    </Contato>
                    <Contato>
                        WhatsApp: {consultorInfo.whatsApp}
                    </Contato>
                    <Contato>
                        Email: {consultorInfo.consultor_email}
                    </Contato>
                </CardContent>
            </Container>
        </Wrapper>
    )
}

export default CardInfo