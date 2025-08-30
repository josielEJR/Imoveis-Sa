import InfoSection from "./components/InfoSection"

import { Wrapper, Container, CopyrightSection, Copyright } from "./style"
import { API_URLS } from '../../config/api';

const Footer = () => {
    return (
        <Wrapper>
            <Container>
                <InfoSection />

                <CopyrightSection>
                    <Copyright>&copy; Copyright SA Imóveis All Rights Reserved.</Copyright>
                    <Copyright>Designed by Goiabas</Copyright>
                </CopyrightSection>
            </Container>
        </Wrapper>
    )
}

export default Footer