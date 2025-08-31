import Location from './components/Location';
import FiltroBusca from './components/FiltroBusca';
import CardsContainer from './components/CardsContainer';


import { Wrapper, Container } from './style'
import { useLocation } from "react-router-dom";

const Produtos = () => {
    const location = useLocation();

    // Pega só a query string (?cidade=SP&disponibilidade=venda)
    const filters = new URLSearchParams(location.search);

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