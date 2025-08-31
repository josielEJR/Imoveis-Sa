import { useState, useEffect } from 'react'

import { Wrapper, Title, LocationSection, InsertLocation, Icon, Label, Input, Dropdown, Ul, Li, Button, Error } from './style'

import { GrMap } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import API_URLS from '../../../../config/api';

const Location = () => {

    const [location, setLocation] = useState("")
    const [disponibility, setDisponibility] = useState('')
    const [cities, setCities] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const url = window.location.href

        if (url.includes("venda")) {
            setDisponibility('venda')
        } else if (url.includes("aluguel")) {
            setDisponibility('aluguel')
        }
    }, [])

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const query = disponibility ? `${API_URLS.IMOVEIS_CIDADES}${disponibility}` : API_URLS.IMOVEIS_CIDADES

        fetch(query, requestOptions)
            .then((response) => response.text())
            .then((result) => JSON.parse(result))
            .then((result) => {
                const auxArray = []
                result.forEach(elem => auxArray.push(elem.cidade))
                setCities(auxArray)
            })
            .catch((error) => console.error(error));
    }, [disponibility])

    const handleDropdown = () => {
        if (cities.length > 0) {
            return <Ul>
                {cities.map((elem, index) => {
                    if (elem.toLowerCase().includes(location.toLowerCase())) {
                        return <Li key={`${elem}${index}`}>
                            <Button onClick={() => window.location.href = `/imoveis?cidade=${elem}&disponibilidade=${disponibility}`} >
                                {elem}
                            </Button>
                        </Li>
                    }
                })}
            </Ul>
        }
    }

    return (
        <Wrapper>
            <Title>
                Nossas incríveis propriedades
            </Title>
            <LocationSection>
                <InsertLocation error={error}>
                    <Icon>
                        <GrMap />
                    </Icon>
                    <Label>
                        <Input
                            placeholder='Qual localização?'
                            onChange={e => {
                                setLocation(e.target.value)
                                setError('')
                            }}
                            onKeyUp={key => {
                                if (key.code === "Enter") {
                                    if (cities.includes(location)) {
                                        setError('')
                                        return window.location.href = `/imoveis?cidade=${location}&disponibilidade=${disponibility}`
                                    } else {
                                        setError("A cidade inserida não está disponível")
                                    }
                                }
                            }}
                        ></Input>
                        <Dropdown display={location} >
                            {handleDropdown()}
                        </Dropdown>
                    </Label>
                    <Button onClick={() => window.location.href = `/imoveis?cidade=${location}&disponibilidade=${disponibility}`} >
                        <FaSearch />
                    </Button>
                </InsertLocation>
                <Error>
                    {error}
                </Error>
            </LocationSection>
        </Wrapper>
    )
}

export default Location