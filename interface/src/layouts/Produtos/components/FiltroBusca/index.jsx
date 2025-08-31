import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContainerInput, Codigo, IconDrop, ListaCompra, Input, Button, Wrapper, UlOptions, UlBairros, LiTipo, CheckBoxWrapper, CheckBox, CheckBoxLabel, ErroText, ContainerFiltro } from './style'
import { IoIosArrowDropdownCircle } from "react-icons/io"

const FiltroBusca = () => {
  const navigate = useNavigate()
  const [produtos, setProdutos] = useState([])
  const [showBairros, setShowBairros] = useState(false)
  const [showTipo, setShowTipo] = useState(false)
  const [showCompra, setShowCompra] = useState(false)
  const [selectedBairro, setSelectedBairro] = useState([])
  const [selectedTipo, setSelectedTipo] = useState([])
  const [selectedCompra, setSelectedCompra] = useState([])
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')
  const [showErroMessage, setShowErroMessage] = useState(false)
  const [inputErro, setInputErro] = useState(false)
  const [buttonError, setButtonError] = useState(false)

  useEffect(() => {
    if (error) {
      setError('')
      setInputErro(false)
      setButtonError(false)
    }
  }, [selectedBairro, selectedCompra, selectedTipo, codigo])

  const handleMouseEnter = (setter) => () => {
    if (window.innerWidth > 950) {
      setter(true)
    }
  }

  const handleMouseLeave = (setter) => () => {
    if (window.innerWidth > 950) {
      setter(false)
    }
  }

  const handleDropdownClick = (setter) => () => {
    setter((prev) => !prev)
  }

  const handleBairroChange = (bairro) => {
    if (selectedBairro.includes(bairro)) {
      setSelectedBairro(selectedBairro.filter(item => item !== bairro))
    } else {
      setSelectedBairro([...selectedBairro, bairro])
    }
  }
  const handleTipoChange = (tipo) => {
    if (selectedTipo.includes(tipo)) {
      setSelectedTipo(selectedTipo.filter(item => item !== tipo))
    } else {
      setSelectedTipo([...selectedTipo, tipo])
    }
  }
  const handleTransacaoChange = (disponibilidade) => {
    if (selectedCompra.includes(disponibilidade)) {
      setSelectedCompra(selectedCompra.filter(item => item !== disponibilidade))
    } else {
      setSelectedCompra([...selectedCompra, disponibilidade])
    }
  }

  const filtrarImoveis = () => {
    let disponibilidadeQuery = []
    let query = ''
    const imovelID = codigo.trim()

    const filterCheck = selectedBairro.length > 0 || selectedCompra.length > 0 || selectedTipo.length > 0
    if (imovelID && filterCheck) {
      console.log('Tipo de busca não permitida')
      setError('Tipo de busca não permitida')
      setInputErro(true)
      return
    }
    if (!imovelID && !filterCheck) {
      console.log('Por favor, selecione pelo menos um filtro.')
      setError('Por favor, selecione pelo menos um filtro')
      setButtonError(true)
      setInputErro(false)
      return
    }

    if (imovelID && !filterCheck) {
      fetch(`API_URLS.IMOVEIS/${imovelID}`, { method: 'GET', redirect: 'follow' })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na resposta da API')
          }
          return response.json();
        })
        .then((data) => {
          console.log('ID selecionado :', data)
          setProdutos(data)

          if (data.length > 0) {
            navigate(`/imovel?id=${imovelID}`);
          } else {
            console.log('Não foram encontrados imóveis com o código fornecido.')
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar imóvel por ID:', error)
          setError('Erro ao buscar imóvel por ID');
        })
      return
    }

    if (!imovelID && filterCheck) {
      if (selectedCompra.includes('Alugar')) {
        disponibilidadeQuery.push('aluguel');
      }
      if (selectedCompra.includes('Comprar')) {
        disponibilidadeQuery.push('venda');
      }
      if (selectedCompra.includes('Alugar') && selectedCompra.includes('Comprar')) {
        disponibilidadeQuery.push('venda_e_aluguel');
      }

      if (disponibilidadeQuery.length > 0) {
        query += `?disponibilidade=${disponibilidadeQuery.join(',')}`;
      }

      if (selectedTipo.length) {
        query += query ? `&tipo=${selectedTipo.join(',')}` : `?tipo=${selectedTipo.join(',')}`
      }

      if (selectedBairro.length) {
        query += query ? `&bairro=${selectedBairro.join(',')}` : `?bairro=${selectedBairro.join(',')}`
      }

      fetch(`API_URLS.IMOVEIS_BUSCA` + query, { method: "GET", redirect: "follow" })
        .then((response) => response.json())
        .then((data) => {
          console.log('Filtros selecionado :', data)
          setProdutos(data)
          if (data.length > 0) {
            window.location.href = `/imoveis${query}`
          } else {
            console.log('Não foram encontrados imóveis com os filtros selecionados.')
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar imóveis:', error)
          setError('Erro ao buscar imóveis')
          setInputErro(false)
          setButtonError(true)
        })
      return
    }
    console.log('Por favor, selecione pelo menos um filtro.')
    setError('Por favor, selecione pelo menos um filtro')

  }

  const getDisplayTextTipo = () => {
    return selectedTipo.length === 0 ? 'Tipo de imóveis' : selectedTipo.join(', ')
  }

  const getDisplayTextBairro = () => {
    if (selectedBairro.length === 0) {
      return 'Filtrar bairros'
    } else if (selectedBairro.length > 2) {
      return `${selectedBairro.slice(0, 2).join(', ')} ... ${selectedBairro.length - 2}`
    } else {
      return selectedBairro.join(', ')
    }
  }

  const getDisplayTextCompra = () => {
    return selectedCompra.length === 0 ? 'Venda / Aluguel' : selectedCompra.join(', ');
  }

  return (
    <Wrapper>
      <ContainerFiltro>
        <ContainerInput>
          {showErroMessage && <ErroText error={error} />}
          <Input
            onMouseEnter={handleMouseEnter((setShowCompra))}
            onMouseLeave={handleMouseLeave((setShowCompra))}
            onClick={handleDropdownClick((setShowCompra))}
          >
            {getDisplayTextCompra()}
            <IconDrop>
              <IoIosArrowDropdownCircle />
            </IconDrop>
            {showCompra && (
              <UlOptions>
                {['Alugar', 'Comprar'].map(disponibilidade => (
                  <LiTipo key={disponibilidade}>
                    <CheckBoxWrapper>
                      <CheckBox
                        type='checkbox'
                        value={disponibilidade}
                        checked={selectedCompra.includes(disponibilidade)}
                        onChange={() => handleTransacaoChange(disponibilidade)}
                      />
                      <CheckBoxLabel htmlFor={disponibilidade}>{disponibilidade}</CheckBoxLabel>
                    </CheckBoxWrapper>
                  </LiTipo>
                ))}
              </UlOptions>
            )}
          </Input>
          <Input
            onMouseEnter={handleMouseEnter((setShowTipo))}
            onMouseLeave={handleMouseLeave((setShowTipo))}
            onClick={handleDropdownClick((setShowTipo))}
          >
            {getDisplayTextTipo()}
            <IconDrop>
              <IoIosArrowDropdownCircle />
            </IconDrop>
            {showTipo && (
              <UlOptions>
                {['Casa', 'Apartamento'].map(tipo => (
                  <LiTipo key={tipo}>
                    <CheckBoxWrapper>
                      <CheckBox
                        type='checkbox'
                        value={tipo}
                        checked={selectedTipo.includes(tipo)}
                        onChange={() => handleTipoChange(tipo)}
                      />
                      <CheckBoxLabel htmlFor={tipo}>{tipo}</CheckBoxLabel>
                    </CheckBoxWrapper>
                  </LiTipo>
                ))}
              </UlOptions>
            )}
          </Input>
          <Input
            onMouseEnter={handleMouseEnter((setShowBairros))}
            onMouseLeave={handleMouseLeave((setShowBairros))}
            onClick={handleDropdownClick((setShowBairros))}
          >
            {getDisplayTextBairro()}
            <IconDrop>
              <IoIosArrowDropdownCircle />
            </IconDrop>
            {showBairros && (
              <UlOptions>
                {['Bela Vista', 'Copacabana', 'Centro', 'Pinheiros', 'Botafogo', 'Barra da Tijuca'].map(bairro => (
                  <LiTipo key={bairro}>
                    <CheckBoxWrapper>
                      <CheckBox
                        type='checkbox'
                        id={bairro}
                        value={bairro}
                        checked={selectedBairro.includes(bairro)}
                        onChange={() => handleBairroChange(bairro)}
                      />
                      <CheckBoxLabel htmlFor={bairro}>{bairro}</CheckBoxLabel>
                    </CheckBoxWrapper>
                  </LiTipo>
                ))}
              </UlOptions>
            )}
          </Input>
          <Codigo
            placeholder='Código'
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            error={inputErro}
          />
          <Button
            onClick={filtrarImoveis}
            error={buttonError}
          > Buscar
          </Button>
        </ContainerInput>
        {error && <ErroText>{error}</ErroText>}
      </ContainerFiltro>

    </Wrapper>
  )
}

export default FiltroBusca
