import React from 'react'
import { Container, Title, Wrapper } from './style'
import ContentDescrição from './components/ContentDescrição'

const DescriçãoLayout = ({imovelID}) => {
  return (
    <Wrapper>
      <Container>
        <Title>
          Descrição do Imovel
        </Title>
        <ContentDescrição imovelID={imovelID}/>
      </Container>
    </Wrapper>
  )
}

export default DescriçãoLayout