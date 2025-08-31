import CardsContainer from './components/CardsContainer'

import { Wrapper, Container, Title } from './style'

const ImoveisFavoritos = () => {
    return (
        <Wrapper>
            <Container>
                <Title>
                    Imoveis Favoritos
                </Title>

                <CardsContainer />
            </Container>
        </Wrapper>
    )
}

export default ImoveisFavoritos