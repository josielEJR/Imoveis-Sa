import React, { useEffect, useState } from 'react';
import {IconWrapper, Tag, Wrapper, ShareOptionsWrapper, ShareOption, Options,Url, BotãoUrl, OptionsWrapper, Favorite} from './style';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { CiFacebook } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { RiDiscordLine } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Interação = ({ dadosImovel }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    if (localStorage.currentUserID) {
      fetch(`API_URLS.IMOVEIS_FAVORITOS?clienteID=${localStorage.currentUserID}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          const isFavorited = result.some(elem => elem.imoveisID === dadosImovel.imoveisID);
          setFavorited(isFavorited);
        })
        .catch(error => console.error('Erro ao buscar favoritos:', error));
    }
  }, [dadosImovel.imoveisID]);

  const handleFavorite = () => {
    if (!localStorage.currentUserID) {
      return window.location.href = "/login?error=Faça login para favoritar um imóvel";
    }

    const url = favorited ? "API_URLS.IMOVEIS_REMOVER_FAVORITO" : "API_URLS.IMOVEIS_ADICIONARimovelfavorito";
    const method = favorited ? "DELETE" : "POST";

    const requestOptions = {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clienteID: localStorage.currentUserID,
        imovelID: dadosImovel.imoveisID
      }),
      redirect: "follow"
    };

    fetch(url, requestOptions)
      .then(() => setFavorited(!favorited))
      .catch(error => console.error('Erro ao atualizar favoritos:', error));
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const currentUrl = window.location.href;

  const copiarUrl = (e) => {
    e.preventDefault();
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);

    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        alert("Link copiado para a área de transferência!");
      })
      .catch(err => {
        console.error("Erro ao copiar o link: ", err);
      });
  };

  return (
    <Wrapper>
      <IconWrapper>
        <Favorite onClick={handleFavorite} color={favorited ? "true" : "false"}>
          {favorited ? <FaHeart /> : <FaRegHeart />}
        </Favorite>
        <PiShareFatLight onClick={toggleShareOptions} style={{ cursor: 'pointer' }} />
      </IconWrapper>
      {showShareOptions && (
        <ShareOptionsWrapper>
          <OptionsWrapper>
            Compartilhar
            <IoMdCloseCircleOutline size={30} style={{ cursor: 'pointer' }} onClick={toggleShareOptions} />
          </OptionsWrapper>
          <Options>
            <ShareOption>
              <Tag href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
                <CiFacebook size={40} color='blue' />
              </Tag>
            </ShareOption>
            <ShareOption>
              <Tag href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={40} color='green' />
              </Tag>
            </ShareOption>
            <ShareOption>
              <Tag href={`https://discord.com/channels/@me`} target="_blank" rel="noopener noreferrer">
                <RiDiscordLine size={40} color='white' />
              </Tag>
            </ShareOption>
            <ShareOption>
              <Tag href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
                <BsTwitterX size={40} color='white' />
              </Tag>
            </ShareOption>
            <ShareOption>
              <Tag href={`mailto:?subject=Check%20this%20out!&body=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
                <MdOutlineEmail size={40} color='white' />
              </Tag>
            </ShareOption>
          </Options>
          <Url>{currentUrl}</Url>
          <BotãoUrl onClick={copiarUrl} animate={animate}>
            Copiar
          </BotãoUrl>
        </ShareOptionsWrapper>
      )}
    </Wrapper>
  );
};

export default Interação;
