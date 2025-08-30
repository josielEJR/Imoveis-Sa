import React, { useState, useEffect } from 'react'
import { ButtonPrice, Container, ImageContainer, TextArea, Direita, Esquerda, Overlay, Wrapper, ContainerInfo } from './style'
import { useNavigate } from 'react-router-dom'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import NavButtons from './components/NavButtons'

const Slider = ({ config }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const [selectedButton, setSelectedButton] = useState(1)
  const [paused, setPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [touchStartTime, setTouchStartTime] = useState(0)
  const navigate = useNavigate()

  const next = () => {
    setImageIndex((state) => (state += 1))
    if (imageIndex === config.length - 1) setImageIndex(0)
    setSelectedButton((state) => (state += 1))
    if (selectedButton === config.length) setSelectedButton(1)
  }

  const prev = () => {
    setImageIndex((state) => (state -= 1))
    if (imageIndex === 0) setImageIndex(config.length - 1)
    setSelectedButton((state) => (state -= 1))
    if (selectedButton === 1) setSelectedButton(config.length)
  }

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex)
    setImageIndex(buttonIndex - 1)
  }

  const handleNavigateToPage = () => {
    navigate(config[imageIndex].url)
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
        setImageIndex((prevIndex) => (prevIndex + 1) % config.length)
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
        setSelectedButton((prevIndex) => (prevIndex) % config.length + 1)
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
        {config.map((item, index) => (
          <ImageContainer
            key={index}
            style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            index={index}
            currentIndex={imageIndex}
          />
        ))}
        <Overlay
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        />
        <Direita onClick={next} >
            <FaAngleRight size={20} />
        </Direita>
        <Esquerda onClick={prev} >
            <FaAngleLeft size={20} />
        </Esquerda>
        <ContainerInfo>
          <TextArea>
            Veja aqui alguns de nossos destaque, os melhores imóveis da região
          </TextArea>
          <ButtonPrice onClick={handleNavigateToPage}>
            {config[imageIndex].text} | R$ {config[imageIndex].price}
          </ButtonPrice>
        </ContainerInfo>
        <NavButtons selectedButton={selectedButton} handleButtonClick={handleButtonClick} />
      </Container>
    </Wrapper>
  )
}

export default Slider