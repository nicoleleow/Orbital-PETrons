import React from 'react';
import { Spacer } from '../../../../components/spacer/spacer.component';

import {
    PetCard,
    PetCardDetails,
    PetInfoCardCover,
    SectionStart,
    SectionEnd,
    Name,
    Caption,
    Container,
    ShelterIcon
    } from './pet-info-card.styles';

export const PetInfoCard = ({ pet = {} }) => {
    const icon = 'https://cdn-icons-png.flaticon.com/512/3769/3769065.png';
    const {
        name = 'Bella',
        photos = [
            'https://www.thesprucepets.com/thmb/cr0IUzzdcuqOYdGMBbRbbi6NfkY=/1568x1176/smart/filters:no_upscale()/GettyImages-145577979-d97e955b5d8043fd96747447451f78b7.jpg'
        ],
        animalType = 'Cat',
        animalBreed = 'Ragdoll',
        age = 9,
        gender = 'F',
        fee = 23, 
        isShelter= true,
        shortDescription
    } = pet;
    
    return (
        <PetCard elevation={5}>
            <PetInfoCardCover key={name} source={{ uri: photos[0] }} />
            <PetCardDetails>
                <SectionStart>
                    <Name>{name}</Name>
                    <Spacer size='small' />
                    <Caption>Breed: {animalBreed}</Caption>
                    <Container>
                        <Caption>Age: {age}</Caption>
                        <Spacer size='large' position='right'/>
                        <Caption>Gender: {gender}</Caption>
                    </Container>
                </SectionStart>
                <SectionEnd>
                    {isShelter && (
                        <ShelterIcon source={{ uri: icon }} />
                    )}
                    <Spacer size='small' position='right' />
                </SectionEnd>
            </PetCardDetails> 
        </PetCard>
    )
}
    