import { useState, useEffect } from 'react'

import NavOption from './components/NavOption'
import Anunciar from './components/Anunciar'
import SobreNos from './components/SobreNos'
import Login from './components/Login'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

import { MenuButton, CloseMenuButton, NavContent } from './style'

const Content = () => {

    const [menuVisible, setMenuVisible] = useState("")
    const [displayLogin, setDisplayLogin] = useState(window.outerWidth)

    useEffect(() => {
        const handleResize = () => {
            setDisplayLogin(window.outerWidth)
        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleMenu = () => {
        menuVisible === "true" ? setMenuVisible("false") : setMenuVisible("true")
    }

    return (
        <>
            <MenuButton onClick={handleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </MenuButton>

            <NavContent display={menuVisible}>
                <CloseMenuButton onClick={handleMenu} visible={menuVisible}>
                    <FontAwesomeIcon icon={faXmark} />
                </CloseMenuButton>

                {displayLogin <= 950 && <Login />}

                <NavOption tipo={"Venda"} url={"API_URLS.IMOVEIS_CIDADES_VENDA"} right="-260" />

                <NavOption tipo={"Aluguel"} url={"API_URLS.IMOVEIS_CIDADES_ALUGUEL"} right="-260" />

                <Anunciar />

                <SobreNos />

                {displayLogin > 950 && <Login />}
            </NavContent>
        </>
    )
}

export default Content