import React from 'react'
import { Wrapper } from './style'
import Depoimentos from './components/DepoimentosComponent'
import { API_URLS } from '../../../../config/api';

const DepoimentosLayout = () => {
  return (
    <Wrapper>
      <Depoimentos />
    </Wrapper>
  )
}

export default DepoimentosLayout