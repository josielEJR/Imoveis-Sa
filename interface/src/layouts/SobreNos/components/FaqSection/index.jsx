import React from 'react';
import Accordion from '../DuvidasFrequentes/index'
import { Wrapper, FaqContainer } from './style';

const faqItems = [
    {
        question: 'Como posso anunciar meu imóvel em um site de imóveis?',
        answer: 'Para anunciar seu imóvel, é necessário criar uma conta no site, preencher um formulário com as informações do imóvel (como localização, preço e características), e incluir fotos de qualidade. Alguns sites oferecem pacotes de destaque para melhorar a visibilidade do seu anúncio.'
    },
    {
        question: 'Quais são as taxas cobradas ao vender um imóvel?',
        answer: 'As taxas comuns incluem a comissão do corretor ou da imobiliária, que varia entre 5% e 6% do valor de venda, e o ITBI (Imposto de Transmissão de Bens Imóveis), que varia conforme a cidade. Outras possíveis taxas incluem despesas com escritura e registro em cartório.'
    },
    {
        question: 'Como é calculado o valor de venda de um imóvel?',
        answer: 'O valor de venda é geralmente calculado com base na localização, tamanho, estado de conservação, e comparação com imóveis similares na região. Uma avaliação profissional pode ser feita para determinar o preço justo do imóvel no mercado atual.'
    }
];

const FaqSection = () => {
    return (
        <Wrapper>
            <FaqContainer>
                <h2>Dúvidas Frequentes</h2>
                <Accordion items={faqItems} />
            </FaqContainer>
        </Wrapper>
    );
};

export default FaqSection;
