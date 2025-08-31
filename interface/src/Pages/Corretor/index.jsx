import React from 'react'
import { Wrapper } from './style'
import Corretor from '../../layouts/Corretor'

const PageCorretor = () => {
    const url = window.location.href.replace("https://imoveis-sa.onrender.com/api/corretores?id=", "")
    return (
        <Wrapper>
            <Corretor corretor={url} />
        </Wrapper>
    )
}

export default PageCorretor
