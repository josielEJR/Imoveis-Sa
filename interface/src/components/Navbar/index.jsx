import { NavLink } from 'react-router-dom'

import Content from './components/NavContent/index'

import { Wrapper, Nav, Logo, Img } from './style'

const Navbar = () => {
    return (
        <Wrapper>
            <Nav>
                <Logo>
                    <NavLink to="/home">
                        <Img src="logo-branco.png" alt="" style={{ width: '90px' }} />
                    </NavLink>
                </Logo>

                <Content />
            </Nav>
        </Wrapper>
    )
}

export default Navbar