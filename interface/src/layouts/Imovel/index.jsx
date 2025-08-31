import React, { useState, useEffect, useRef } from 'react'
import DescriçãoLayout from './sections/Descrição'
import { Wrapper } from './style'
import LocalizaçãoLayout from './sections/Localização'
import ContatoLayout from './sections/Contato'
import ImovelInfo from './sections/ImovelInfo'
import Loading from '../../components/Loading'
import { API_URLS } from '../../config/api';

const ImovelLayout = ({ imovelID }) => {
  const [consultorId, setConsultorId] = useState(null)
  const [loading, setLoading] = useState(true)
  const contatoRef = useRef(null)

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    }

    fetch(`${API_URLS.IMOVEIS_BUSCAR_ID}?id=${imovelID}`, requestOptions)
      .then(response => response.json())
      .then(imoveis => {
        if (imoveis.length > 0) {
          const imovel = imoveis[0]
          setConsultorId(imovel.consultorId)
        } else {
          console.log('Imóvel não encontrado');
        }
      })
      .catch(error => console.error('Erro ao buscar imóvel:', error))
  }, [imovelID])

  useEffect (() =>{
    setTimeout(function() {
      setLoading(false)
    }, 1500)
  }, [])

  const scrollToAgendar = () => {
    contatoRef.current.scrollIntoView({ behavior: 'smooth' }) 
  }

  return (
    <Wrapper>
      {loading && <Loading />}
      <ImovelInfo imovelID={imovelID} scrollToAgendar={scrollToAgendar} />
      <DescriçãoLayout imovelID={imovelID} />
      <LocalizaçãoLayout imovelID={imovelID} /> 
      <ContatoLayout consultorId={consultorId} imovelID={imovelID} ref={contatoRef}/>
    </Wrapper>
  )
}

export default ImovelLayout