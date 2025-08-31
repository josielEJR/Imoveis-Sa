import React from 'react';
import { Wrapper, Titulo, VideoContainer } from './style';

const QuemSomosVideo = () => {
    return (
        <Wrapper>
            <Titulo>
                <h1>Quem somos</h1>
            </Titulo>
            <VideoContainer>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/5bWWNKYY2Wo?si=uZxNdzzdJCt8EtOX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </VideoContainer>
        </Wrapper>
    );
};

export default QuemSomosVideo;