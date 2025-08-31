import React, { useState, useEffect } from 'react'

import Anunciar from '../Anunciar'

import { Wrapper, Container, Image, Overlay } from './style';

const Carrossel = ({ config }) => {
  const [imageIndex, setImageIndex] = useState(0)

  return (
    <Wrapper>
      <Container>
        <Image
          src={config[imageIndex].Image}
          alt={config[imageIndex].title}
          currentIndex={imageIndex}
        />
        <Overlay />
        <Anunciar />
      </Container>
    </Wrapper>
  )
}

export default Carrossel
