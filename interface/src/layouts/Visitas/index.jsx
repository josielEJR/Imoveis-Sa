import CardsContainer from './components/CardsContainer'

import { Wrapper, Container, Title } from './style'

const Visitas = () => {
    return (
        <Wrapper>
            <Container>
                <Title>Suas visitas</Title>

                <CardsContainer />
            </Container>
        </Wrapper>
    )
}

export default Visitas