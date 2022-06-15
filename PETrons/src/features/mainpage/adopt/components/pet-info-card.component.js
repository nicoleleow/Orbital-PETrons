import React from 'react';
import { Text, View } from 'react-native';
import { Spacer } from '../../../../components/spacer/spacer.component';
import Icon from 'react-native-vector-icons/Foundation';
import {
    PetCard,
    PetCardDetails,
    PetInfoCardCover,
    SectionStart,
    SectionEnd,
    Name,
    Caption,
    HDBIcon,
    GenderIcon
    } from './pet-info-card.styles';

export const PetInfoCard = ({ pet }) => {
    // extract pet details 
    const { index, item } = pet;
    const { age, breed, type, fee, gender, HDB_approved,
        name, image, short_description, organisation } = item;

    // const genderIcon = gender === 'Male' ? 
    //     'https://icon-library.com/images/male-icon-png/male-icon-png-8.jpg' :
    //     'https://cdn-icons-png.flaticon.com/512/1864/1864588.png';
    const genderIconType = gender === 'Male' ? 'male-symbol' : 'female-symbol';
    const genderIconColor = gender === 'Male' ? '#1260CC' : '#FE046A';
    
    const isHDBApproved = HDB_approved === 'Yes' ? true : false;
    const hdbIcon = 'https://www.logolynx.com/images/logolynx/e5/e5d49abdb2ad1ac2dff8fb33e138d785.jpeg';


    return (
        <PetCard elevation={5}>
            <PetInfoCardCover key={name} source={{ uri: image }} />
            <PetCardDetails>
                <SectionStart>
                    <Name>{name}</Name>
                    <Spacer size='small' />
                    <Caption>{breed}</Caption>
                    <Spacer size='small'/>
                    <Caption>{age} old</Caption>
                </SectionStart>
                <SectionEnd>
                    {isHDBApproved && (
                        <HDBIcon source={{ uri:hdbIcon }} />
                    )}
                    <Spacer size='medium' position='right' />
                    <GenderIcon
                        name={genderIconType}
                        color={genderIconColor}
                        size={20} />
                    
                    <Spacer size='small' position='right' />
                </SectionEnd>
            </PetCardDetails> 
        </PetCard>
    )
}
    