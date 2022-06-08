import React from 'react';
import styled from 'styled-components/native';
import { Text} from 'react-native';
import { Card, Title} from 'react-native-paper';

const PetCard = styled(Card)`
    width: 175px;
    height: auto;
    margin: 5px 15px;
    //   flex-direction: row;
    //   justify-content: space-between;
`

const PetCardDetails = styled(Card.Content)`
    padding-horizontal: 15px;
    padding-bottom: 5px;
`

const Name = styled(Title)` 
    font-size: ${(props) => props.theme.fontSizes.title};
    font-family: ${(props) => props.theme.fonts.heading};
    color: ${(props) => props.theme.colors.brand.secondary};
`

const Breed = styled(Text)`
    font-size: ${(props) => props.theme.fontSizes.body};
    font-family: ${(props) => props.theme.fonts.heading};
    color: ${(props) => props.theme.colors.brand.secondary};
`

const PetInfoCardCover = styled(Card.Cover)`
    padding: ${(props) => props.theme.space[3]};
`

export const PetInfoCard = ({ pet = {} }) => {
    const {
        name = 'Bella',
        icon,
        photos = [
            'https://www.thesprucepets.com/thmb/cr0IUzzdcuqOYdGMBbRbbi6NfkY=/1568x1176/smart/filters:no_upscale()/GettyImages-145577979-d97e955b5d8043fd96747447451f78b7.jpg'
        ],
        animalType = 'cat',
        animalBreed = 'Ragdoll',
        age = 9,
        price = 23, 
        shortDescription
    } = pet;
    
    return (
        <PetCard elevation={5}>
            <PetInfoCardCover key={name} source={{ uri: photos[0] }} />
            <PetCardDetails>
                <Name>{name}</Name>
                <Breed>{animalBreed}</Breed>
            </PetCardDetails> 
        </PetCard>

        
    )
}
    