import Location from './components/Location';
import FiltroBusca from './components/FiltroBusca';
import CardsContainer from './components/CardsContainer';

import { Wrapper, Container } from './style'
import { API_URLS } from '../../config/api';

const Produtos = () => {

    const filters = decodeURIComponent(window.location.href.replace("http://localhost:3000/imoveis", ""))

    return (
        <Wrapper>
            <Container>
                <Location />

                <FiltroBusca />

                <CardsContainer filters={filters} />
            </Container>
        </Wrapper>
    )
}

export default Produtos