import React,{ useEffect, useState } from 'react'
import { Container, Iframe, Wrapper } from './style'
import API_URLS from '../../../../../../config/api'

const VideoComponent = ({imovelID}) => {
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
        <Iframe
          width="100%"
          height="100%"
          src={prodInfo.video}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
        </Iframe>
      </Container>
    </Wrapper>
  )
}

export default VideoComponent