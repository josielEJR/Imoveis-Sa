import React, { useState } from 'react'
import { Container, Title, Wrapper, TitleWrapper } from './style'
import LocalizaçãoComponent from './components/LocalizaçãoComponent'
import VideoComponent from './components/VideoComponent'

const LocalizaçãoLayout = ({imovelID}) => {
  const [activeComponent, setActiveComponent] = useState('localização')
  return (
    <Wrapper>
      <Container>
      <TitleWrapper>
        <Title
          isActive={activeComponent === 'localização'}
          onClick={() => setActiveComponent('localização')}
          order={activeComponent === 'localização' ? 1 : 2}
        >
          Localização
        </Title>
        <Title
          isActive={activeComponent === 'video'}
          onClick={() => setActiveComponent('video')}
          order={activeComponent === 'video' ? 1 : 2}
        >
          Video
        </Title>
        </TitleWrapper>
          {activeComponent === 'localização' && <LocalizaçãoComponent imovelID={imovelID} />}
          {activeComponent === 'video' && <VideoComponent imovelID={imovelID} />}
      </Container>
    </Wrapper>
  )
}

export default LocalizaçãoLayout