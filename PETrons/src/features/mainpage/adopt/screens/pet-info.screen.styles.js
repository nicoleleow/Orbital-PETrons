import styled from 'styled-components/native';
import { View, Text, SafeAreaView} from 'react-native';

export const SafeArea = styled(SafeAreaView)`
    flex: 1;
    background-color: orange;
`

export const Name = styled(Text)`
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-family: ${(props) => props.theme.fonts.body};
    padding:  ${(props) => props.theme.space[1]};
    font-weight: ${(props) => props.theme.fontWeights.bold};
`

export const PetPhotoContainer = styled(View)`
    justify-content: center;
    align-items: center;
`

export const DetailsContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    padding-top: 10px;
    margin-horizontal: 10px;
`

export const DetailsRectangle = styled(View)`
    background-color: #fddd5c;
    border-radius: ${(props) => props.theme.space[3]};
    padding: ${(props) => props.theme.space[3]};
    margin: ${(props) => props.theme.space[3]};
`
    
export const Details = styled(Text)`
    font-family: ${(props) => props.theme.fonts.body};
    border-radius: ${(props) => props.theme.space[3]};
    text-align: center;
`

export const FeeContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.space[3]};
    margin-horizontal: 110px;
    background-color: #bee6b0;
`

export const Fee = styled(Text)`
    font-family: ${(props) => props.theme.fonts.body};
    padding: ${(props) => props.theme.space[3]};
    margin: 10px 0px;
    text-align: center;
`

export const AboutPetContainer = styled(View)`
    justify-content: center;
    margin:  0 ${(props) => props.theme.space[5]};
    border-radius: ${(props) => props.theme.space[3]};
    background-color: #fde297;
    padding: ${(props) => props.theme.space[2]};
`

export const AboutPet = styled(Text)`
    font-size: ${(props) => props.theme.fontSizes.body};
    font-family: ${(props) => props.theme.fonts.body};
    padding: ${(props) => props.theme.space[1]};
    line-height: 20px;
`

export const ContactOwnerButton = styled.TouchableOpacity`
    border-radius: ${(props) => props.theme.space[3]};
    text-align: center;
    background-color: #789fcc;
    margin: 10px 30px;
    padding: 10px;
`

export const ContactOwnerText = styled(Text)`
    color: white;
    font-family: ${(props) => props.theme.fonts.body};
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
`