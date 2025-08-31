import React, { useEffect, useState } from 'react'
import { Container, Wrapper, Map } from './style'
import API_URLS from '../../../../../../config/api'

const LocalizaçãoComponent = ({ imovelID }) => {
  const [prodInfo, setProdInfo] = useState({})

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    }

    fetch(`${API_URLS.IMOVEIS_BUSCAR_ID}?id=${imovelID}`, requestOptions)
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .then((produto) => {
        return setProdInfo(produto[0])
      })
      .catch((error) => console.error(error))
  }, [imovelID])
  
  return (
    <Wrapper>
      <Container>
        <Map
          src={prodInfo.maps}
          style={{
            width: "100%",
            height: "100%",
            border: 0
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></Map>
      </Container>
    </Wrapper>
  )
}

export default LocalizaçãoComponent