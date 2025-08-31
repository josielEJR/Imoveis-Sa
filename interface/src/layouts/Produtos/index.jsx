import Location from './components/Location';
import FiltroBusca from './components/FiltroBusca';
import CardsContainer from './components/CardsContainer';


import { Wrapper, Container } from './style'

const Produtos = () => {
    const filters = decodeURIComponent(window.location.href.replace("https://imoveis-sa.onrender.com/api/imoveis", ""))

    return (
        <Wrapper>
            <Container>
                <Location />
                <FiltroBusca />
                <CardsContainer filters={filters} />
            </Container>
        </Wrapper>
    );
};

export default Produtos