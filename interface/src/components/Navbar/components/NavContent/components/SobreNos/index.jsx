import { NavLink } from 'react-router-dom'

import { ContentLink } from '../../style'

const SobreNos = () => {
    return (
        <>
            <ContentLink>
                <NavLink to="/sobrenos">
                    Sobre Nós
                </NavLink>
            </ContentLink>
        </>
    )
}

export default SobreNos