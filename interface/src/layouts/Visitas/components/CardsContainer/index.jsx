import { useState, useEffect } from 'react'

import Card from '../Card'

import { FaCalendarAlt } from "react-icons/fa";
import { FaIdCardClip } from "react-icons/fa6";

import { Wrapper, Container, CardsSection, ConsultorSection, Text, Consultores, Consultor, ConsultorInfo, ConsultorNome, ConsultorEmail, VisitaButton, SelectorSection, Selectors, IndexSelector, Error } from './style'
import { API_URLS } from '../../../../config/api';

const CardsContainer = () => {

    const [selected, setSelected] = useState(0)
    const [indexes, setIndexes] = useState([])
    const [products, setProducts] = useState([])
    const [consultores, setConsultores] = useState([])
    const [selectedButton, setSelectedButton] = useState("historico")

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`API_URLS.VISITAS?clienteID=${localStorage.currentUserID}`, requestOptions)
            .then((response) => response.text())
            .then((result) => JSON.parse(result))
            .then((result) => setProducts(result))
            .catch((error) => console.error(error));

        fetch(`API_URLS.VISITAS_GET_CONSULTORES?clienteID=${localStorage.currentUserID}`, requestOptions)
            .then((response) => response.text())
            .then((result) => JSON.parse(result))
            .then((result) => setConsultores(result))
            .catch((error) => console.error(error));
    }, [])

    useEffect(() => {
        const auxArray = []

        if (products) {
            const maxPages = Math.ceil(products.length / 6)
            for (let i = 0; i < maxPages; i++) {
                auxArray.push(i + 1)
            }
        }

        if (auxArray.length > 0) {
            setSelected(auxArray[0])
            setIndexes(auxArray)
        }
    }, [products])

    function scrollToTop() {
        document.body.scrollTop = 100; // Safari
        document.documentElement.scrollTop = 100; // Chrome, Firefox, IE e Opera
    }

    const selector = () => {
        if (localStorage.length === 0 || products.length === 0) {
            return (
                <></>
            )
        } else {
            return <Selectors>
                {
                    indexes.map((elem, index) => {
                        return <IndexSelector selected={selected == elem ? true : false} key={index} onClick={() => {
                            setSelected(elem)
                            scrollToTop()
                        }} >{elem}</IndexSelector>
                    })
                }
            </Selectors>
        }
    }

    const visitas = () => {
        if (localStorage.length === 0 || products.length === 0) {
            return <Error>
                <FaCalendarAlt className='icon' />
                Você não tem visitas agendadas
            </Error>
        } else {
            return products.map((prod, index) => {
                const indexMin = (selected * 6) - 6
                const indexMax = selected * 6

                if (index >= indexMin && index < indexMax) {
                    return <Card
                        key={index}
                        imagem={"https://queroficarrico.com/blog/wp-content/uploads/2017/06/como_investir_em_imoveis.jpg"}
                        bairro={prod.bairro.toUpperCase()}
                        cidade={prod.cidade.toUpperCase()}
                        tipo={prod.tipo.toUpperCase()}
                        preco={prod.preco_venda || prod.preco_aluguel}
                        area={prod.tamanho}
                        quartos={prod.quartos}
                        banheiros={prod.banheiros}
                        vagas={prod.vagas}
                        id={prod.imoveisID}
                    />
                }
            })
        }
    }

    const getConsultores = () => {
        if(consultores.length === 0){
            return <Text>
                <FaIdCardClip />
                Você ainda não possui um consultor para te atender
            </Text>
        }else{
            return consultores.map((elem, index) => (
                <Consultor key={`consultor${index}`} onClick={() => window.location.href = "corretores"}>
                    <FaIdCardClip className='icon' /> 
                    <ConsultorInfo>
                        <ConsultorNome>{elem.nome}</ConsultorNome>
                        <ConsultorEmail>{elem.consultor_email}</ConsultorEmail>
                    </ConsultorInfo>
                </Consultor>
            ))
        }
    }

    return (
        <Wrapper>
            <Container>
                <CardsSection>
                    <ConsultorSection>
                        <Text>Seus consultores</Text>
                        <Consultores>{getConsultores()}</Consultores>
                    </ConsultorSection>
                    <Text>
                        <VisitaButton
                            underline={selectedButton == "historico"}
                            onClick={() => setSelectedButton("historico")}
                        >Histórico</VisitaButton>
                        <VisitaButton
                            underline={selectedButton == "proximas visitas"}
                            onClick={() => setSelectedButton("proximas visitas")}
                        >Próximas visitas</VisitaButton>
                    </Text>
                    {visitas()}
                </CardsSection>
            </Container>
            <SelectorSection>
                {selector()}
            </SelectorSection>
        </Wrapper>
    )
}

export default CardsContainer