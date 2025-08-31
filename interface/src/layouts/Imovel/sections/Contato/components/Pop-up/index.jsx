import React, { useState } from 'react'
import { Input, TitleBox, ModalOverlay, ModalContent, CloseButton, ButtonWrapper } from './style'

const DatePickerModal = ({ isOpen, onClose, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const formatDateTimeForMySQL = (date, time) => {
    const [year, month, day] = date.split('-')
    const [hours, minutes] = time.split(':')
    return `${year}-${month}-${day} ${hours}:${minutes}:00`
  };

  const handleSubmit = () => {
    const formattedDateTime = formatDateTimeForMySQL(selectedDate, selectedTime)
    onSubmit(formattedDateTime)
    onClose()
  }

  if (!isOpen) return null

  return (
    <ModalOverlay>
      <ModalContent>
        <TitleBox>Selecione a Data da Visita</TitleBox>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <Input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />
        <ButtonWrapper>
          <CloseButton onClick={handleSubmit}>Agendar Visita</CloseButton>
          <CloseButton onClick={onClose}>Cancelar</CloseButton>
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  )
}

export default DatePickerModal