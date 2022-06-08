import styled from 'styled-components/native';
import { View, Text, Image } from 'react-native';
import { Card, Title } from 'react-native-paper';

export const PetCard = styled(Card)`
    width: 175px;
    height: auto;
    margin-bottom: ${(props) => props.theme.space[3]};
`
export const PetCardDetails = styled(Card.Content)`
    padding-horizontal: 15px;
    padding-bottom: 5px;
    display: flex;
    flex-direction: row;
`

export const PetInfoCardCover = styled(Card.Cover)`
    padding: ${(props) => props.theme.space[3]};
`

export const SectionStart = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
`;

export const SectionEnd = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`;

export const Name = styled(Title)` 
    font-size: ${(props) => props.theme.fontSizes.title};
    font-family: ${(props) => props.theme.fonts.heading};
    color: ${(props) => props.theme.colors.brand.secondary};
    margin-bottom: 0;
`

export const Breed = styled(Text)`
    font-size: ${(props) => props.theme.fontSizes.body};
    font-family: ${(props) => props.theme.fonts.heading};
    color: ${(props) => props.theme.colors.brand.secondary};
`

export const ShelterIcon = styled.Image`
    margin-top: ${(props) => props.theme.space[2]};
    width: ${(props) => props.theme.space[5]};
    height: ${(props) => props.theme.space[5]};
`
