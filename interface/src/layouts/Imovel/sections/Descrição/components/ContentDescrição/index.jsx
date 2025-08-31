import React, { useState, useEffect } from 'react'

import { Container, ContainerContent, ContainerIcon, ContainerInfo, Content, Icon, ContainerDescrição, Value, Wrapper, DescriçãoIcon, Text } from './style'
import { TbRulerMeasure } from "react-icons/tb"
import { IoCarSportOutline } from "react-icons/io5"
import { LiaCouchSolid } from "react-icons/lia"
import { TbBed } from "react-icons/tb"
import { PiBathtub } from "react-icons/pi"
import { MdInfoOutline } from "react-icons/md"
import DropInfo from './components/DropInfo'
import API_URLS from '../../../../../../config/api'

const ContentDescrição = ({ imovelID }) => {
  const [prodInfo, setProdInfo] = useState({})
  const [activeIcon, setActiveIcon] = useState(null)

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    }

    fetch(`${API_URLS.IMOVEIS_BUSCAR_ID}?id=${imovelID}`, requestOptions)
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .then((produto) => {
        return setProdInfo(produto[0])
      })
      .catch((error) => console.error(error))
  }, [imovelID])

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco)
  }

  const getPreco = () => {
    switch (prodInfo.disponibilidade) {
      case 'aluguel':
        return formatarPreco(prodInfo.preco_aluguel)
      case 'venda':
        return formatarPreco(prodInfo.preco_venda)
      case 'venda_e_aluguel':
        return formatarPreco(prodInfo.preco_venda)
      default:
        return 'Preço não disponível'
    }
  }

  const getDisponibilidade = () => {
    switch (prodInfo.disponibilidade) {
      case 'aluguel':
        return ('Aluguel')
      case 'venda':
        return ('Venda')
      case 'venda_e_aluguel':
        return ('Venda')
      default:
        return 'dispolidade não disponovel'
    }
  }

  const handleMouseEnter = (icon) => setActiveIcon(icon)
  const handleMouseLeave = () => setActiveIcon(null)

  return (
    <Wrapper>
      <Container>
        <ContainerContent>
          <ContainerDescrição>
            <Content>
              {getDisponibilidade()}
            </Content>
            <Content>
              <Text>
                Condominio
              </Text>
              <MdInfoOutline
                size={30}
                onMouseEnter={() => handleMouseEnter('condominio')}
                onMouseLeave={handleMouseLeave}
              />
              {activeIcon === 'condominio' && (
                <DropInfo activeIcon={activeIcon} iconName="condominio" />
              )}
            </Content>
            <Content>
              <Text>
                IPTU
              </Text>
              <MdInfoOutline
                size={30}
                onMouseEnter={() => handleMouseEnter('iptu')}
                onMouseLeave={handleMouseLeave}
              />
              {activeIcon === 'iptu' && (
                <DropInfo activeIcon={activeIcon} iconName="iptu" />
              )}
            </Content>
            <Content>
              <Text>
                Seguro incêndio
              </Text>
              <MdInfoOutline
                size={30}
                onMouseEnter={() => handleMouseEnter('seguro')}
                onMouseLeave={handleMouseLeave}
              />
              {activeIcon === 'seguro' && (
                <DropInfo activeIcon={activeIcon} iconName="seguro" />
              )}
            </Content>
            <Content>
              <Text>
                Taxa de serviço
              </Text>
              <MdInfoOutline
                size={30}
                onMouseEnter={() => handleMouseEnter('taxa')}
                onMouseLeave={handleMouseLeave}
              />
              {activeIcon === 'taxa' && (
                <DropInfo activeIcon={activeIcon} iconName="taxa" />
              )}
            </Content>
          </ContainerDescrição>
          <ContainerInfo>
            <Value >
              {getPreco()}
            </Value>
            <Value >
              {formatarPreco(prodInfo.condominio)}
            </Value>
            <Value >
              {formatarPreco(prodInfo.iptu)}
            </Value>
            <Value >
              {formatarPreco(prodInfo.seguro_incendio)}
            </Value>
            <Value >
              {formatarPreco(prodInfo.taxa_de_servicos)}
            </Value>
          </ContainerInfo>
        </ContainerContent>
        <ContainerIcon>
          <DescriçãoIcon>
            <Icon>
              <TbRulerMeasure size={30} />
            </Icon>
            <Icon>
              <IoCarSportOutline size={30} />
            </Icon>
            {prodInfo.mobiliado && (
              <Icon>
                <LiaCouchSolid size={30} />
              </Icon>
            )}
            <Icon>
              <TbBed size={30} />
            </Icon>
            <Icon>
              <PiBathtub size={30} />
            </Icon>
          </DescriçãoIcon>
          <ContainerInfo>
            <Value >
              {prodInfo.tamanho} m²
            </Value>
            <Value >
              {prodInfo.vagas}
            </Value>
            {prodInfo.mobiliado && (
              <Value >
                {prodInfo.mobiliado}
              </Value>
            )}
            <Value >
              {prodInfo.quartos}
            </Value>
            <Value >
              {prodInfo.banheiros}
            </Value>
          </ContainerInfo>
        </ContainerIcon>
      </Container>
    </Wrapper>
  )
}

export default ContentDescrição