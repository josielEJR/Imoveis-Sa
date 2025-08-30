import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Image, Wrapper } from './style'

import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { API_URLS } from '../../../../config/api';

const CardImovel = ({ imovelID }) => {
  const [prodInfo, setProdInfo] = useState({})
  const [imagens, setImagens] = useState([])

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    }

    fetch(`API_URLS.IMOVEIS_BUSCArimovelid?id=${imovelID}`, requestOptions)
      .then((response) => response.json())
      .then((produto) => {
        setProdInfo(produto[0])
        if (produto[0]?.imagens) {
          setImagens(produto[0].imagens.split(','))
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [imovelID])

  return (
    <Wrapper>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {imagens.map((imagem, index) => (
            <SwiperSlide key={index}>
              <Image src={`http://localhost:3001/${imagem}`} alt={`Imagem ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
    </Wrapper>
  )
}

export default CardImovel
