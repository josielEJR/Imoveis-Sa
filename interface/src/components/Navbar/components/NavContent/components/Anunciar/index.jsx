import { NavLink } from 'react-router-dom'

import { ContentLink } from '../../style'


const Anunciar = () => {
    return (
        <>
            <ContentLink>
                <NavLink to="/anunciarimovel">
                    Anunciar
                </NavLink>
            </ContentLink>
        </>
    )
}

export default Anunciar