import React, { useEffect, useState } from 'react'

import { BiSolidQuoteLeft } from "react-icons/bi"
import { IoCaretDownSharp } from "react-icons/io5"
import { Container, Wrapper, ContainerDepoimentos, Title, ContainerPerfil, ContainerImagem, ContainerQuote, Comentario, FotoPerfil, ContainerIcon, Texto, NomePerfil, Foto, Img, ContainerComentario, Improvisado, ContainerTitle } from './style'
import NavButtons from '../NavButtons'
import { API_URLS } from '../../../../config/api';

const Depoimentos = () => {
  const [imageIndex, setImageIndex] = useState(0)
  const [sliderButton, setSliderButton] = useState(1)
  const [clientes, setClientes] = useState([])
  const [paused, setPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [touchStartTime, setTouchStartTime] = useState(0)

  useEffect(() => {
    fetch(CLIENTES')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setClientes(data))
      .catch(error => console.error('Houve um problema com a operação de fetch:', error));
  }, [])

  const next = () => {
    setImageIndex((state) => (state += 1))
    if (imageIndex === clientes.length - 1) setImageIndex(0)
    setSliderButton((state) => (state += 1))
    if (sliderButton === clientes.length) setSliderButton(1)
  }

  const prev = () => {
    setImageIndex((state) => (state -= 1))
    if (imageIndex === 0) setImageIndex(clientes.length - 1)
    setSliderButton((state) => (state -= 1))
    if (sliderButton === 1) setSliderButton(clientes.length)
  }

  const handleButtonClick = (buttonIndex) => {
    setSliderButton(buttonIndex)
    setImageIndex(buttonIndex - 1)
  }

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
    setTouchStartTime(new Date().getTime())
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    const touchEndTime = new Date().getTime()
    const touchDuration = touchEndTime - touchStartTime

    if (touchDuration > 500) {
      if (touchStart - touchEnd > 50) {
        next()
      }

      if (touchStart - touchEnd < -50) {
        prev()
      }
    }
    setTouchStart(0)
    setTouchEnd(0)
    setTouchStartTime(0)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setImageIndex((prevIndex) => (prevIndex + 1) % clientes.length)
      }
    },
      6000)
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setSliderButton((prevIndex) => (prevIndex) % clientes.length + 1)
      }
    },
      6000)
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  })

  return (
    <Wrapper>
      <Container
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ContainerTitle>
          <Title >
            O QUE DIZEM
          </Title>
          <Title >
            NOSSOS CLIENTES
          </Title>
        </ContainerTitle>
        <Improvisado>
          {clientes.length > 0 && (
            <ContainerDepoimentos
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <ContainerImagem image={`API_URLS.CLIENTES_IMAGEM/${clientes[imageIndex].clienteId}`} />
              <ContainerPerfil>
                <ContainerQuote>
                  <BiSolidQuoteLeft size={60} />
                </ContainerQuote>
                <ContainerComentario>
                  <Comentario>
                    <Texto>
                      {clientes[imageIndex].comentario}
                    </Texto>
                  </Comentario>
                  <ContainerIcon>
                    <IoCaretDownSharp size={50} />
                  </ContainerIcon>
                </ContainerComentario>
                <FotoPerfil>
                  <Foto>
                    <Img src={`API_URLS.CLIENTES_IMAGEM/${clientes[imageIndex].clienteId}`} />
                  </Foto>
                  <NomePerfil>
                    {clientes[imageIndex].nome}
                  </NomePerfil>
                </FotoPerfil>
              </ContainerPerfil>
            </ContainerDepoimentos>)}
          <NavButtons sliderButton={sliderButton} handleButtonClick={handleButtonClick} />
        </Improvisado>
      </Container>
    </Wrapper>
  )
}

export default Depoimentos