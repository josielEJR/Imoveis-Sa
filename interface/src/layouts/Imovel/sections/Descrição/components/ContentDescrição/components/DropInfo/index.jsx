import React, { useEffect, useState } from 'react'
import { Aba, DropHover, TextDrop, Title, Wrapper } from './style'

const DropInfo = ({ activeIcon, iconName }) => {
    const [iSmalScreen ,setIsSmallScreen] = useState(window.innerWidth <= 960)

    const [leftPercentage, setLeftPercentage] = useState({
        condominio: 5,
        iptu: 5,
        seguro: 5,
        taxa: 5,
    })
    const [topPercentage, setTopPercentage] = useState({
        condominio: 0,
        iptu: 0,
        seguro: 0,
        taxa: 0,
    })

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth
            setIsSmallScreen(screenWidth <= 590)

            if (screenWidth <= 590) {
                setLeftPercentage({
                    condominio: 22,
                    iptu: 7,
                    seguro: 25,
                    taxa: 24,
                })
                setTopPercentage({
                    condominio: 330,
                    iptu: 238,
                    seguro: 249,
                    taxa: 260,
                })
            } else if (screenWidth <= 722) {
                setLeftPercentage({
                    condominio: 35.5,
                    iptu: 23.5,
                    seguro: 43,
                    taxa: 42,
                })
                setTopPercentage({
                    condominio: 213,
                    iptu: 224,
                    seguro: 234.5,
                    taxa: 245.5,
                })
            } else if (screenWidth <= 960) {
                setLeftPercentage({
                    condominio: 30,
                    iptu: 20,
                    seguro: 36,
                    taxa: 35,
                })
                setTopPercentage({
                    condominio: 213,
                    iptu: 224,
                    seguro: 234.5,
                    taxa: 245.5,
                })
            } else {
                setLeftPercentage({
                    condominio: 5,
                    iptu: 5,
                    seguro: 5,
                    taxa: 5,
                })
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (!iconName || activeIcon !== iconName) {
        return null
    }

    return (
        <Wrapper>
            <DropHover
                leftPercentage={`${leftPercentage[iconName]}%`} topPercentage={`${topPercentage[iconName]}%`}
            >
                <Title>
                    {iconName.charAt(0).toUpperCase() + iconName.slice(1)}
                </Title>
                <Aba />
                <TextDrop>
                    Valor sujeito a alteração conforme deliberações condominiais, podendo, ainda, variar de acordo com as despesas fixas e eventuais do condomínio (ex.: água, luz, conservação e manutenção do prédio, entre outros).
                </TextDrop>
            </DropHover>
        </Wrapper>
    )
}

export default DropInfo