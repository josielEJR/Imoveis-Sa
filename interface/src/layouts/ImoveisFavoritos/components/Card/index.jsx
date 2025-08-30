import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FaRegHeart, FaHeart } from "react-icons/fa";

import { Wrapper, BackgroundImage, CardContent, TitleSection, Title, PriceArea, RedirectIndicator, HouseInfo, InfoSection, Label, Value, Favorite } from "./style"
import { API_URLS } from '../../../../config/api';

const Card = ({ imagem, bairro, cidade, tipo, preco, area, quartos, banheiros, vagas, id }) => {

    const [hover, setHover] = useState("")
    const [favorited, setFavorited] = useState("")

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`API_URLS.IMOVEIS_FAVORITOS?clienteID=${localStorage.currentUserID}`, requestOptions)
            .then((response) => response.text())
            .then((result) => JSON.parse(result))
            .then((result) => {
                result.forEach(elem => {
                    if (elem.imoveisID === id) {
                        setFavorited("true")
                    }
                })
            })
            .catch((error) => console.error(error));
    }, [])

    const handleMouseEnter = () => {
        setHover("true")
    }

    const handleMouseLeave = () => {
        setHover("false")
    }

    const handleFavorite = () => {
        if (localStorage.length === 0) {
            return window.location.href = "/login"
        }

        if (favorited !== "true") {
            setFavorited("true")

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "clienteID": localStorage.currentUserID,
                "imovelID": id
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch(IMOVEIS/adicionarimovelfavorito", requestOptions)
                .catch((error) => console.error(error));
        } else {
            setFavorited("false")

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "clienteID": localStorage.currentUserID,
                "imovelID": id
            });

            const requestOptions = {
                method: "DELETE",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch(IMOVEIS/removerimovelfavorito", requestOptions)
                .catch((error) => console.error(error));
        }
    }

    const formatarPreco = (preco) => {
        return new Intl.NumberFormat('de-DE', { currency: 'BRL' }).format(preco)
    }

    return (
        <Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Favorite onClick={handleFavorite} color={favorited}>
                {favorited !== "true" ? <FaRegHeart /> : <FaHeart />}
            </Favorite>
            <BackgroundImage image={imagem} onClick={() => window.location.href = "/imovel?id=" + id} ></BackgroundImage>
            <CardContent hover={hover} onClick={() => window.location.href = "/imovel?id=" + id} >

                <TitleSection>
                    <Title>{bairro}</Title>
                    <Title>{cidade}</Title>
                </TitleSection>

                <PriceArea>
                    {tipo} | R$ {formatarPreco(preco)}
                </PriceArea>

                <RedirectIndicator>
                    CLIQUE E CONFIRA <FontAwesomeIcon icon={faAngleRight} />
                </RedirectIndicator>

                <HouseInfo>
                    <InfoSection>
                        <Label>ÁREA</Label>
                        <Value>{area}m²</Value>
                    </InfoSection>
                    <InfoSection>
                        <Label>QUARTOS</Label>
                        <Value>{quartos}</Value>
                    </InfoSection>
                    <InfoSection>
                        <Label>BANHEIROS</Label>
                        <Value>{banheiros}</Value>
                    </InfoSection>
                    <InfoSection>
                        <Label>VAGAS</Label>
                        <Value>{vagas}</Value>
                    </InfoSection>
                </HouseInfo>
            </CardContent>

        </Wrapper>
    )
}

export default Card