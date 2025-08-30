import { NavLink } from 'react-router-dom'

import { ContentLink } from '../../style'
import { API_URLS } from '../../../../config/api';

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