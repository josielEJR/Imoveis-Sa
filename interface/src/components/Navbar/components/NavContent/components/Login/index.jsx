import { useState } from 'react'

import { NavLink } from 'react-router-dom'

import { FaRegUserCircle, FaBell, FaCalendarAlt } from "react-icons/fa";
import { FaHouseChimney, FaHeart } from "react-icons/fa6";
import { IoMdMail, IoIosLogOut } from "react-icons/io";

import { ContentLink, Dropdown, Ul, Li, Button } from '../../style'
import { LoginButton, LoginLabel } from './style'

const Login = () => {

    const [dropdownVisible, setDropdownVisible] = useState(false)

    const handleClick = () => {
        dropdownVisible ? setDropdownVisible(false) : setDropdownVisible(true)
    }

    const handleLogin = () => {
        if (localStorage.length === 0 && window.outerWidth > 950) {
            return (
                <NavLink to={'login'} onClick={handleClick}>
                    <Button><FaRegUserCircle /> Entrar</Button>
                </NavLink>
            )
        } else if (localStorage.length !== 0) {
            return (
                <Button id='usuario'>
                    <FaRegUserCircle /> {localStorage.currentUserNome}
                </Button>
            )
        }
    }

    const handleDropdown = () => {
        if (dropdownVisible || window.outerWidth <= 950) {
            if (!localStorage.token || !localStorage.token.includes("Bearer")) {
                return (
                    <Dropdown margin={-93}>
                        <Ul>
                            {localStorage.length === 0 &&
                                <>
                                    <LoginLabel>Entre para ver seus favoritos, visitas e propostas</LoginLabel>
                                    <Li>
                                        <LoginButton onClick={() => window.location.href = "/login"}>Entrar</LoginButton>
                                    </Li>
                                </>
                            }
                            <Li>
                                <NavLink
                                    to="/favoritos"
                                >
                                    <FaHeart /> Imóveis favoritos
                                </NavLink>
                            </Li>
                            <Li>
                                <NavLink
                                    to="/alertas"
                                >
                                    <FaBell /> Propostas enviadas
                                </NavLink>
                            </Li>
                            <Li>
                                <NavLink
                                    to="/visitas"
                                >
                                    <FaCalendarAlt /> Visitas agendadas
                                </NavLink>
                            </Li>
                            {localStorage.length > 0 &&
                                <Li>
                                    <Button onClick={() => {
                                        localStorage.clear()
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 200)
                                    }}><IoIosLogOut /> Sair da conta</Button>
                                </Li>
                            }
                        </Ul>
                    </Dropdown>
                )
            } else {
                return (
                    <Dropdown margin={-93}>
                        <Ul>
                            <Li>
                                <NavLink
                                    to={`/corretores?id=${localStorage.id}`}
                                >
                                    <FaHouseChimney /> Meu perfil
                                </NavLink>
                            </Li>
                            <Li>
                                <NavLink
                                    to="/imoveispendentes"
                                >
                                    <IoMdMail /> Imóveis pendentes à aprovação
                                </NavLink>
                            </Li>
                            <Li>
                                <NavLink
                                    to="/solicitacoesvisita"
                                >
                                    <FaCalendarAlt /> Solicitações de agendas
                                </NavLink>
                            </Li>
                            <Li>
                                <Button onClick={() => {
                                    localStorage.clear()
                                    setTimeout(() => {
                                        window.location.reload()
                                    }, 200)
                                }}><IoIosLogOut /> Sair da conta</Button>
                            </Li>
                        </Ul>
                    </Dropdown>
                )
            }
        }
    }

    return (
        <ContentLink onMouseEnter={() => setDropdownVisible(true)} onMouseLeave={() => setDropdownVisible(false)} >
            {handleLogin()}

            {handleDropdown()}
        </ContentLink>
    )
}

export default Login