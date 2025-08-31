import { useState } from 'react'
import Footer from '../../components/Footer'
import config from '../Cadastro/components/Carrossel/components/Images'
import Carrossel from './components/Carrossel'

const AnunciarLayout = () => {

    return (
        <>
            < Carrossel config={config} />
        </>
    )
}

export default AnunciarLayout