import React from 'react'
import { Wrapper } from './style'
import Corretor from '../../layouts/Corretor'
import { API_URLS } from '../../config/api';

const PageCorretor = () => {
    const url = window.location.href.replace("http://localhost:3000/corretores?id=", "")
    return (
        <Wrapper>
            <Corretor corretor={url} />
        </Wrapper>
    )
}

export default PageCorretor
