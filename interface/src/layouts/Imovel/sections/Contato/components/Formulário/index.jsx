import React, { useState, useEffect } from 'react'
import { Button, Container, Form, Input, TextArea, Wrapper } from './style'
import DatePickerModal from '../Pop-up'
import { API_URLS } from '../../../../config/api';

const Agendar = ({ imovelID }) => {
    const [animate, setAnimate] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [prodInfo, setProdInfo] = useState({})

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [comentario, setComentario] = useState('')


    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        }

        fetch(`API_URLS.IMOVEIS_BUSCArimovelid?id=${imovelID}`, requestOptions)
            .then((response) => response.json())
            .then((produto) => {
                setProdInfo(produto[0])
            })
            .catch((error) => console.error(error))
    }, [imovelID])


    useEffect(() => {
        if (localStorage.currentUserID) {
            const usuarioNome = localStorage.getItem('currentUserNome')
            const usuarioEmail = localStorage.getItem('currentUserEmail')

            setNome(usuarioNome || '')
            setEmail(usuarioEmail || '')
        }
    }, [])

    const handleAgendarClick = (e) => {
        e.preventDefault()
        setAnimate(true)
        setModalOpen(true)
    }

    const handleDateSubmit = async (selectedDate, selectedTime) => {
        setModalOpen(false)

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clienteID: localStorage.currentUserID || null,
                consultorID: prodInfo.consultorId,
                imovelID: prodInfo.imoveisID,
                data_visita: selectedDate,
                hora_visita: selectedTime,
                nome: nome,
                email: email,
                comentario: comentario
            })
        }

        try {
            const response = await fetch(VISITAS/agendarvisita", requestOptions);
            const data = await response.json();
        
            console.log("Resposta da API:", data);  // Adicione logs aqui
        
            if (response.ok && data.agendado !== false) {
                alert("Visita agendada com sucesso!");
            } else {
                const errorMessage = data.mensagem || "Erro desconhecido ao agendar visita.";
                alert(`Erro ao agendar visita: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao agendar visita: problema de conexão ou erro no servidor.");
        }
    }

    return (
        <Wrapper>
            <Container>
                <Form>
                    <Input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextArea
                        placeholder="Comentário - opcional"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)} 
                    />
                    <Button animate={animate} onClick={handleAgendarClick}>
                        Agendar uma Visita
                    </Button>
                    <DatePickerModal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onSubmit={handleDateSubmit}
                    />
                </Form>
            </Container>
        </Wrapper>
    )
}

export default Agendar
