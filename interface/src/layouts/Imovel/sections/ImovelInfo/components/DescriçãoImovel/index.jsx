import React, { useRef, useState } from 'react'
import { Wrapper, Container, Content, Preço, Tipo, ItensWrapper, Button, Itens, Li } from './style'
import Interação from '../Interação'

const DescriçãoImovel = ({ dadosImovel, scrollToAgendar}) => {
  const [animate, setAnimate] = useState(false)
  
  const itensArray = typeof dadosImovel.itens === 'string' ? dadosImovel.itens.split(',') : []

  const handleAgendarClick = (e) => {
    e.preventDefault()
    setAnimate(true)

    setTimeout(() => {
      setAnimate(false)
      scrollToAgendar() 
    }, 300)
  }

  const getDisponibilidade = () => {
    switch (dadosImovel.disponibilidade) {
      case 'aluguel':
        return ('Aluguel')
      case 'venda':
        return ('Venda')
      case 'venda_e_aluguel':
        return ('Aluguel')
      default:
        return 'disponibilidade não disponivel'
    }
  }

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco)
  }

  const aplicarDesconto = (preco, percentual) => {
    return preco * (1 - percentual / 100)
  }

  const getPreco = () => {
    let preco
    switch (dadosImovel.disponibilidade) {
      case 'aluguel':
        preco = dadosImovel.preco_aluguel
        break
      case 'venda':
        preco = dadosImovel.preco_venda
        break
      case 'venda_e_aluguel':
        preco = dadosImovel.preco_aluguel
        break
      default:
        return { precoNormal: 'Preço não disponível', precoComDesconto: 'Preço não disponível' }
    }

    const precoComDesconto = aplicarDesconto(preco, 5)
    return {
      precoNormal: formatarPreco(preco),
      precoComDesconto: formatarPreco(precoComDesconto)
    }
  }

  const { precoNormal, precoComDesconto } = getPreco()

  return (
    <Wrapper>
      <Container>
        <Content>
          <Preço>
            Total R$ {precoNormal}
            <Tipo>
              {getDisponibilidade()} {precoComDesconto}
            </Tipo>
          </Preço>
          <ItensWrapper>
            Itens disponíveis
            <Itens>
              {itensArray.length > 0 &&
                itensArray.map((item, index) => (
                  <Li key={index}>{item.trim()}</Li>
                ))
              }
            </Itens>
          </ItensWrapper>
          <Button animate={animate} onClick={(e) => {
            handleAgendarClick(e)
          }} >
            Agendar uma visita
          </Button>
        </Content>
        <Interação dadosImovel={dadosImovel}/>
      </Container>
    </Wrapper>
  )
}

export default DescriçãoImovel