import React from 'react'
import { Logo, LoadingSpinner, RotatingCircle, Wrapper } from './style'
import { API_URLS } from '../../config/api';

const Loading = () => {
  return (
    <Wrapper>
        <LoadingSpinner>
            <RotatingCircle>
              <Logo src='logo-branco.png' alt='logo'/>
            </RotatingCircle>
        </LoadingSpinner>
    </Wrapper>
  )
}
export default Loading