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
    ShelterIcon
    } from './pet-info-card.styles';

export const PetInfoCard = ({ pet = {} }) => {
    const icon = 'https://cdn-icons-png.flaticon.com/512/3769/3769065.png';
    const {
        name = 'Bella',
        photos = [
            'https://www.thesprucepets.com/thmb/cr0IUzzdcuqOYdGMBbRbbi6NfkY=/1568x1176/smart/filters:no_upscale()/GettyImages-145577979-d97e955b5d8043fd96747447451f78b7.jpg',
            'https://imageio.forbes.com/specials-images/imageserve/5db4c7b464b49a0007e9dfac/Photo-of-Maltese-dog/960x0.jpg?format=jpg&width=960',
            'https://www.vetcarepethospital.ca/wp-content/uploads/sites/247/2022/03/petrabbitcare-1-scaled.jpg'
        ],
        animalType = 'Cat',
        animalBreed = 'Ragdoll',
        age = '9 years old',
        gender = 'Female',
        fee = 23, 
        isShelter = true,
        shortDescription = 'Bella is a well-trained, gentle and affectionate cat. She likes being around people and loves belly rubs.'
    } = pet;
    
    return (
        <PetCard elevation={5} onPress={() => console.log('pressed')}>
            <PetInfoCardCover key={name} source={{ uri: photos[0] }} />
            <PetCardDetails>
                <SectionStart>
                    <Name>{name}</Name>
                    <Spacer size='small' />
                    <Caption>Breed: {animalBreed}</Caption>
                    <Spacer size='small'/>
                    <Caption>{age},  {gender}</Caption>
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
    