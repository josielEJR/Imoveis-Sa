import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Wrapper } from './style';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
    "https://blog.triiio.com.br/wp-content/uploads/2021/01/Investir-em-imóveis-de-luxo-vale-a-pena.jpg",
    "https://www.marcesarimoveis.com.br/assets/img/banner-slider-2.jpg",
    "https://objectstorage.sa-saopaulo-1.oraclecloud.com/n/grq6lwb4htd1/b/tecimob-production/o/media/9643a757-8de8-4af8-9186-eefa1e48e2c3/settings/slides/1ddd6c56-b7a9-4699-8919-bd8b1058b5311703696215Q11Y.jpg",
    "https://www.lopes.com.br/blog/wp-content/uploads/2018/06/Imagem1.jpg",
    "https://storage.googleapis.com/imobzi/image/site_free_midias/aedicle.jpg",
    "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://www.escolademocrata.com.br/assets/img/blog/crescimento-do-mercado-imobiliario-de-alto-padrao-impulsiona-novos-investimentos-desktop-800x500.jpg",
    "https://resizedimgs.zapimoveis.com.br/crop/614x297/named.images.sp/f959490eb019822d7023288b2177717c/fazenda-sitio-chacara-com-9-quartos-a-venda-810m-no-mairinque.webp",
    "https://istoedinheiro.com.br/wp-content/uploads/sites/17/2024/03/casacondominio.jpg",
    "https://img4.idealista.com/blur/WEB_DETAIL/0/id.pro.es.image.master/16/18/6f/1218730560.jpg",
    "https://img4.idealista.com/blur/WEB_DETAIL_TOP-L-L/0/id.pro.es.image.master/61/35/ef/1102529856.jpg",
    "https://i.pinimg.com/736x/79/3b/a3/793ba3ba16c90a90829ebfbd164d4e16.jpg"
];

const SliderComponent = () => {
    return (
        <Wrapper>
            <Swiper
                slidesPerView={3}
                spaceBetween={0}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                }}
                navigation={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    1600: {
                        slidesPerView: 3,
                    },
                    900: {
                        slidesPerView: 2,
                    },
                    450: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    }
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </SwiperSlide>
                ))}
                <div className="custom-pagination"></div> {/* Container de paginação */}
            </Swiper>
        </Wrapper>
    );
};

export default SliderComponent;


