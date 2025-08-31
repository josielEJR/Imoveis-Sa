import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import { Dropdown, Title, SideDropdown, DropdownContent, Ul, Li, Button, Rotate } from '../../style'


const Itens = ({ lista, redirect, right }) => {

    const [cidades, setCidades] = useState([])
    const [selected, setSelected] = useState('')

    const handleMouseEnter = (value) => {
        setSelected(value)
    }

    const handleMouseLeave = () => {
        setSelected('')
    }

    useEffect(() => {
        if (lista) {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch(lista, requestOptions)
                .then((response) => response.text())
                .then((result) => JSON.parse(result))
                .then((result) => setCidades(result))
                .catch((error) => console.error(error));
        }
    }, [cidades])

    const setDropdown = () => {
        if (lista) {
            return (
                <Dropdown onMouseLeave={handleMouseLeave}>
                    <Title>Cidade</Title>
                    <Ul>
                        {cidades.map((elem, index) => {
                            if (index < 7) {
                                return <Li key={elem.cidade} onMouseEnter={() => handleMouseEnter(elem.cidade)} onClick={() => handleMouseEnter(elem.cidade)}>
                                    <Button>{elem.cidade}</Button> {selected === elem.cidade ? <Rotate><FontAwesomeIcon icon={faAngleRight} /></Rotate> : ''}
                                </Li>
                            }
                        })}
                        <Li key={"exploraroutrascidades"} onMouseEnter={() => handleMouseEnter("")} onClick={() => handleMouseEnter("")} style={{ fontSize: "16px" }}>
                            <Button onClick={() => window.location.href="/imoveis"}>Explorar outras cidades</Button>
                        </Li>
                    </Ul>

                    {selected &&
                        <SideDropdown right={right}>
                            <DropdownContent>
                                <Title>Tipo de imóvel</Title>

                                <Ul>
                                    <Li>
                                        <a href={`/imoveis?cidade=${selected}&tipo=casa&disponibilidade=${redirect}`}>Casas</a>
                                    </Li>
                                    <Li>
                                        <a href={`/imoveis?cidade=${selected}&tipo=apartamento&disponibilidade=${redirect}`}>Apartamentos</a>
                                    </Li>
                                    <Li>
                                        <a href={`/imoveis?cidade=${selected}&disponibilidade=${redirect}`}>Todos</a>
                                    </Li>
                                </Ul>
                            </DropdownContent>
                        </SideDropdown>
                    }
                </Dropdown>
            )
        } else {
            return (
                <Dropdown>
                    <Title>Ajuda</Title>

                    <Ul>
                        <Li key="duvidasfrequentes">
                            <Link
                                to={`/duvidasfrequentes`}
                            >Duvidas frequentes</Link>
                        </Li>
                        <Li key="sobrenos">
                            <Link
                                to={`/sobrenos`}
                            >Sobre nós</Link>
                        </Li>
                    </Ul>
                </Dropdown>
            )
        }
    }

    return (
        <>
            {setDropdown()}
        </>
    )
}

export default Itens