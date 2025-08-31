import React from 'react'
import { Logo, LoadingSpinner, RotatingCircle, Wrapper } from './style'

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