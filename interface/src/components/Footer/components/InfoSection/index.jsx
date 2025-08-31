import { useState, useEffect } from "react";

import { ImFacebook2 } from "react-icons/im";
import { RiInstagramFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";

import { Wrapper, Container, ContactSection, LogoSection, Logo, Contact, ContactInfo, SocialMediaSection, SocialMediaLabel, SocialMedia, SocialMediaLink, MapSection, Map } from './style'

const InfoSection = () => {

    const [pageSize, setPageSize] = useState(window.outerWidth)

    useEffect(() => {
        function handleResize() {
            setPageSize(window.outerWidth)
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Wrapper>
            <Container>
                <ContactSection>
                    <LogoSection>
                        <a href="/home"><Logo src="logo-branco.png" alt="LOGO" /></a>
                    </LogoSection>

                    {pageSize <= 1280 ?
                        <MapSection>
                            <Map
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.100782349669!2d-46.6873121!3d-23.5648236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce579e4d026025%3A0x310b7e05dbaf0a81!2sR.%20Sebasti%C3%A3o%20Velho%2C%2057%20-%20Pinheiros%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005418-040!5e0!3m2!1spt-BR!2sbr!4v1721154054284!5m2!1spt-BR!2sbr"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: 0
                                }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></Map>
                        </MapSection> :
                        ''
                    }

                    <Contact>
                        <ContactInfo>Rua Sebastião Velho, 57, Pinheiros, São Paulo - SP</ContactInfo>
                        <ContactInfo>(11) 9999-9999</ContactInfo>
                        <ContactInfo>contato@saimoveis.com.br</ContactInfo>
                    </Contact>

                    <SocialMediaSection>
                        <SocialMediaLabel>Acompanhe nossas redes sociais</SocialMediaLabel>
                        <SocialMedia>
                            <SocialMediaLink>
                                <ImFacebook2 />
                            </SocialMediaLink>
                            <SocialMediaLink>
                                <RiInstagramFill />
                            </SocialMediaLink>
                            <SocialMediaLink>
                                <BsLinkedin />
                            </SocialMediaLink>
                        </SocialMedia>
                    </SocialMediaSection>
                </ContactSection>

                {pageSize > 1280 ?
                    <MapSection>
                        <Map
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.100782349669!2d-46.6873121!3d-23.5648236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce579e4d026025%3A0x310b7e05dbaf0a81!2sR.%20Sebasti%C3%A3o%20Velho%2C%2057%20-%20Pinheiros%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005418-040!5e0!3m2!1spt-BR!2sbr!4v1721154054284!5m2!1spt-BR!2sbr"
                            style={{
                                width: "100%",
                                height: "100%",
                                border: 0
                            }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></Map>
                    </MapSection> : ''
                }
            </Container>
        </Wrapper>
    )
}

export default InfoSection