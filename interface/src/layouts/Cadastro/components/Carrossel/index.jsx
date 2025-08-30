import React, { useState, useEffect } from 'react'

import Cadastro from '../Cadastro'

import { Wrapper, Container, Image, Overlay } from './style';
import { API_URLS } from '../../../../config/api';

const Carrossel = ({ config }) => {
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setImageIndex((state) => (state += 1));
      if (imageIndex >= config.length - 1) setImageIndex(0);
    }, 5000)
  }, [imageIndex])

  return (
    <Wrapper>
      <Container>
        <Image
          src={config[imageIndex].Image}
          alt={config[imageIndex].title}
          currentIndex={imageIndex}
        />
        <Overlay />
        <Cadastro />
      </Container>
    </Wrapper>
  )
}

export default Carrossel
