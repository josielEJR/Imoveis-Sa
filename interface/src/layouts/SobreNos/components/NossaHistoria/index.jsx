import React from 'react';
import { Wrapper, HistoryContainer, HistoryTitle, HistoryContent, HistoryImage, HistoryText, HistoryParagraph, HistorySubTitle } from './style';

const NossaHistoria = () => {
    return (
        <Wrapper>
            <HistoryContainer>
                <HistoryTitle>Nossa História</HistoryTitle>
                <HistoryContent>
                    <HistoryText>
                        <HistoryParagraph>
                            <strong>#Somos200</strong> – 200 corações, um só objetivo: realizar sonhos
                        </HistoryParagraph>
                        <HistoryParagraph>
                            Desde 1982, a Aliança Imóveis tem sido uma parte essencial da vida dos guarulhenses, ajudando a realizar sonhos e prosperar negócios. Com mais de 40 anos de história, nossa empresa é uma referência no mercado imobiliário, conhecida por sua ética, compromisso e excelência.
                        </HistoryParagraph>
                        <HistorySubTitle>Uma História de Sucesso</HistorySubTitle>
                        <HistoryParagraph>
                            Fundada pelo patriarca José Francisco dos Santos Romão, a Aliança Imóveis cresceu e se adaptou às demandas do mercado, sempre mantendo seu compromisso com a qualidade e a inovação. Hoje, somos uma equipe de 200 colaboradores dedicados a oferecer os melhores serviços aos nossos clientes.
                        </HistoryParagraph>
                    </HistoryText>
                    <HistoryImage src="https://www.papoimobiliario.com/wp-content/uploads/2023/01/Dicas-para-trabalhar-com-imoveis-de-luxo-e-alto-padrao.jpg" alt="Imagem 2 Nossa História" />
                </HistoryContent>
                <HistoryContent>
                    <HistoryText>
                        <HistorySubTitle>Inovação e Compromisso</HistorySubTitle>
                        <HistoryParagraph>
                            Nossa busca pela excelência é evidente em tudo o que fazemos. Investimos em tecnologia de ponta para facilitar a busca e a negociação de imóveis, tornando o processo mais ágil e conveniente para nossos clientes. Além disso, nossa equipe está constantemente se atualizando para oferecer as melhores soluções.
                        </HistoryParagraph>
                        <HistorySubTitle>Tradição e Confiança</HistorySubTitle>
                        <HistoryParagraph>
                            Com mais de quatro décadas de experiência, a Aliança Imóveis construiu uma reputação sólida e confiável no mercado. Nossa história é marcada por transações éticas e transparentes, garantindo que os interesses dos nossos clientes sejam sempre protegidos.
                        </HistoryParagraph>
                    </HistoryText>
                    <HistoryImage src="https://cdn.uso.com.br/sites/41022/adobestock_65451008.jpg" alt="Imagem 1 Nossa História" />
                </HistoryContent>
            </HistoryContainer>
        </Wrapper>
    );
}

export default NossaHistoria;
