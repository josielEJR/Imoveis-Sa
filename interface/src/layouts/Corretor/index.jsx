import React, { useEffect, useState } from 'react'
import { Wrapper, Container, Nome } from './style'
import About from './components/About'
import Imoveis from './components/Imoveis'
import { API_URLS } from '../../config/api';

const Corretor = ({corretor}) => {
  const [prodInfo, setProdInfo] = useState([])

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    }

    fetch(`${API_URLS.CONSULTORES_BUSCAR_ID}?id=${corretor}`, requestOptions)
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .then((produto) => {
        console.log(produto[0])
        return setProdInfo(produto[0])
      })
      .catch((error) => console.error(error))
  }, [corretor])
  
  return (
    <Wrapper>
      <Container>
        <Nome>
          {prodInfo.nome}
        </Nome>
        <About dados={prodInfo}/>
        <Imoveis corretor={corretor}/>
      </Container>
    </Wrapper>
  )
}

export default Corretor
