import CardsContainer from './components/CardsContainer'

import { Wrapper, Container, Title } from './style'
import { API_URLS } from '../../config/api';

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