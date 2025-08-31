import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Container, Wrapper, Label, LabelContainer, FormConteiner, TitleContainer, Title, Input, Select, AnunciarButton, Error } from './style'
import { API_URLS } from '../../../../config/api'


const Anunciar = () => {

    const [animate, setAnimate] = useState(false);
    const [residencia, setResidencia] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [quartos, setQuartos] = useState('');
    const [banheiros, setBanheiros] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [qualidade, setQualidade] = useState('');
    const [disponibilidade, setDisponibilidade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [Erro, setErro] = useState('');
    

    const navigate = useNavigate()

    const [showInput, setShowInput] = useState('');

    const handleDisponibilidadeChange = (e) => {
        setDisponibilidade(e.target.value);
        setShowInput(e.target.value);
    }

    useEffect(() => {
        if (localStorage.length > 0) {
            navigate("/home")
        }
    }, [])

    const handleAnunciarClick = () => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);

        if (residencia && endereco && numero && bairro && cidade && cep && quartos && banheiros && tamanho && qualidade && disponibilidade && descricao) {

            const myHeaders = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }

            const raw = JSON.stringify({
                "tipo": residencia,
                "endereco": endereco,
                "numero": numero,
                "bairro": bairro,
                "cidade": cidade,
                "cep": cep,
                "quartos": quartos,
                "banheiros": banheiros,
                "descricao": descricao,
                "preco_venda": "0",
                "preco_aluguel": "0",
                "tamanho": tamanho,
                "qualidade": qualidade,
                "disponibilidade": disponibilidade

            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,  
                redirect: "follow"
            };

            fetch(API_URLS.IMOVEIS_ADICIONAR, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    console.log(result)
                    console.log("URL chamada:", API_URLS.IMOVEIS_ADICIONAR);
                    console.log("Token:", localStorage.getItem("token"));
                    // window.location.href = disponibilidade == "venda" || disponibilidade == "venda_e_alugel" ? "http://localhost:3000/imoveis?disponibilidade=venda" : "http://localhost:3000/imoveis?disponibilidade=aluguel"
                })
                .catch((error) => console.error(error));
        }

        else {

            setErro("Erro")
        }

    }

    const handleNumericInputChange = (setter) => (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setter(value);
        }
    };

    const handleTextInputChange = (setter) => (e) => {
        const value = e.target.value;
        if (/^[^\d]*$/.test(value)) {
            setter(value);
        }
    };

    return (
        <Wrapper>
            <Container>
                <TitleContainer>
                    <Title>Anunciar Imóvel</Title>
                </TitleContainer>
                <FormConteiner>
                    <LabelContainer>
                        <Label>Tipo de Residência</Label>
                        <Input type="text" placeholder="Casa ou Apartamento" value={residencia} onChange={handleTextInputChange(setResidencia)} />
                    </LabelContainer>
                    <LabelContainer>
                        <Label>Endereço</Label>
                        <Input type="text" placeholder="Ex.: Rua José Gomes" value={endereco} onChange={handleTextInputChange(setEndereco)} />
                    </LabelContainer>
                    <LabelContainer>
                        <Label>Número</Label>
                        <Input type="text" placeholder="Ex.: 838" value={numero} onChange={handleNumericInputChange(setNumero)} />
                    </LabelContainer>
                    <LabelContainer>
                        <Label>Bairro</Label>
                        <Input type="text" placeholder="Ex.: Pinheiros" value={bairro} onChange={handleTextInputChange(setBairro)} />
                    </LabelContainer>
                    <LabelContainer>
                        <Label>Cidade</Label>
                        <Input type="text" placeholder="Ex.: São Paulo" value={cidade} onChange={handleTextInputChange(setCidade)} />
                    </LabelContainer>
                    <LabelContainer>
                        <Label>CEP</Label>
                        <Input type="text" placeholder="Ex.: 06023415" value={cep} onChange={handleNumericInputChange(setCep)} />
                    </LabelContainer>
                    <LabelContainer>
                        <Label>Quartos</Label>
                        <Input type="text" placeholder="Quantidade de Quartos" value={quartos} onChange={handleNumericInputChange(setQuartos)} />
                    </LabelContainer>
                    <LabelContainer>
                        <Label>Banheiros</Label>
                        <Input type="text" placeholder="Quantidade de Banheiros" value={banheiros} onChange={handleNumericInputChange(setBanheiros)} />
                    </LabelContainer>
                    <LabelContainer>
                        <Label>Tamanho</Label>
                        <Input type="text" placeholder="Tamanho (m²)" value={tamanho} onChange={handleNumericInputChange(setTamanho)} />
                    </LabelContainer>
                    <LabelContainer>
                        <Label>Qualidade</Label>
                        <Input type="text" placeholder="1~5 Estrelas" value={qualidade} onChange={handleNumericInputChange(setQualidade)} />
                    </LabelContainer>
                    <LabelContainer>
                        <Label>Disponibilidade</Label>
                        <Select value={disponibilidade} onChange={handleDisponibilidadeChange}>
                            <option value="">Selecione uma Opção</option>
                            <option value="Venda">Vender</option>
                            <option value="Aluguel">Alugar</option>
                            <option value="Venda/Aluguel">Vender/Alugar</option>
                        </Select>
                    </LabelContainer>
                    <LabelContainer>
                        <Label>Descrição do Imóvel</Label>
                        <Input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </LabelContainer>
                </FormConteiner>
                <AnunciarButton animate={animate} onClick={handleAnunciarClick}>
                    Anunciar
                </AnunciarButton>
                <Error>
                    {Erro}
                </Error>
            </Container>
        </Wrapper>
    )
}

export default Anunciar
