import React from 'react'
import { Title, Wrapper, Container, } from './style'
import Card from './components/Card'
import { API_URLS } from '../../../../config/api';

const Time = () => {
  return (
    <Wrapper>
      <Container>
        <Title>
          Nosso Time
        </Title>
        <Card />
      </Container>
    </Wrapper>
  )
}

export default Time