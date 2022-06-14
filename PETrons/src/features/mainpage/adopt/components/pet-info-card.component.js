import React from 'react';
import { Text, View } from 'react-native';
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

export const PetInfoCard = ({ pet }) => {
    const icon = 'https://cdn-icons-png.flaticon.com/512/3769/3769065.png';

    const { index, item } = pet;
    const { age, animalBreed, animalType, fee, gender, isShelter, name, photos, shortDescription } = item ;
    // console.log({ pet })

    return (
        <PetCard elevation={5}>
            <PetInfoCardCover key={name} source={{ uri: photos[0] }} />
            <PetCardDetails>
                <SectionStart>
                    <Name>{name}</Name>
                    <Spacer size='small' />
                    <Caption>{animalBreed}</Caption>
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
    