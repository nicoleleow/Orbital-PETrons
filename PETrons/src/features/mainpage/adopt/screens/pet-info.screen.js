import React, {useState} from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity} from "react-native";
import { Spacer } from '../../../../components/spacer/spacer.component';
import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SafeArea = styled(SafeAreaView)`
    flex: 1;
    background-color: orange;
`

const Name = styled(Text)`
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-family: ${(props) => props.theme.fonts.body};
    padding:  ${(props) => props.theme.space[1]};
    font-weight: ${(props) => props.theme.fontWeights.bold};
`

const PetPhotoContainer = styled(View)`
    justify-content: center;
    align-items: center;
`

const DetailsContainer = styled(View)`
flex: 1;
    flex-direction: row;
    justify-content: center;
    padding-top: 10px;
    margin-horizontal: 10px;
`

const DetailsRectangle = styled(View)`
    background-color: #fddd5c;
    border-radius: ${(props) => props.theme.space[3]};
    padding: ${(props) => props.theme.space[3]};
    margin: ${(props) => props.theme.space[3]};
`
    
const Details = styled(Text)`
    font-family: ${(props) => props.theme.fonts.body};
    border-radius: ${(props) => props.theme.space[3]};
    text-align: center;
`

const FeeContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.space[3]};
    margin-horizontal: 110px;
    background-color: #bee6b0;
`

const Fee = styled(Text)`
    font-family: ${(props) => props.theme.fonts.body};
    padding: ${(props) => props.theme.space[3]};
    margin: 10px 0px;
    text-align: center;
`

const AboutPetContainer = styled(View)`
    justify-content: center;
    margin:  0 ${(props) => props.theme.space[5]};
    border-radius: ${(props) => props.theme.space[3]};
    background-color: #fde297;
    padding: ${(props) => props.theme.space[2]};
`

const AboutPet = styled(Text)`
    font-size: ${(props) => props.theme.fontSizes.body};
    font-family: ${(props) => props.theme.fonts.body};
    padding: ${(props) => props.theme.space[1]};
    line-height: 20px;
`

const ContactOwnerButton = styled.TouchableOpacity`
    border-radius: ${(props) => props.theme.space[3]};
    text-align: center;
    background-color: #789fcc;
    margin: 10px 30px;
    padding: 10px;
`

const ContactOwnerText = styled(Text)`
    color: white;
    font-family: ${(props) => props.theme.fonts.body};
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
`

export const PetInfoScreen = ({ pet = {} }) => {
    const icon = 'https://cdn-icons-png.flaticon.com/512/3769/3769065.png';
    const {
        name = 'Kiwi',
        photos = [
            'https://www.thesprucepets.com/thmb/cr0IUzzdcuqOYdGMBbRbbi6NfkY=/1568x1176/smart/filters:no_upscale()/GettyImages-145577979-d97e955b5d8043fd96747447451f78b7.jpg',
            'https://imageio.forbes.com/specials-images/imageserve/5db4c7b464b49a0007e9dfac/Photo-of-Maltese-dog/960x0.jpg?format=jpg&width=960',
            'https://www.vetcarepethospital.ca/wp-content/uploads/sites/247/2022/03/petrabbitcare-1-scaled.jpg',
            'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-pet-birds-parakeet-1572839068.jpg'
        ],
        animalType = 'Bird',
        animalBreed = 'Parrot',
        age = '6 years old',
        gender = 'Male',
        fee = 23, 
        isShelter = true,
        shortDescription = 'Kiwi is rather shy and quiet, usually remaining at his favourite part of his cage at most times. He was picked up on the streets by one of us and had injured his wings and hence could not fly. We have since nursed him back to health and he is currently in good condition.'
    } = pet;
    
    const ownership = { isShelter } ? 'Organisation' : 'Pet Owner';

    const [count, setCount] = useState(0);
    const onPress = () => setCount(prevCount => prevCount + 1);

    return (
        <SafeArea>
            <ScrollView>
                <Spacer size='xxLarge' />
                <Name>{name}: {animalBreed}</Name>
                <Spacer size='large' />
                <PetPhotoContainer>
                    <Image
                        source={{ uri: photos[2] }}
                        style={{ resizeMode: "contain", width: 360, height: 220 }} />
                </PetPhotoContainer>
                
                <DetailsContainer>
                    <DetailsRectangle>
                        <Details>Age{`\n`}{age}</Details>
                    </DetailsRectangle>
                     <DetailsRectangle>
                        <Details>Gender{`\n`}{gender}</Details>
                    </DetailsRectangle>
                     <DetailsRectangle>
                        <Details>Ownership{`\n`}{ownership}</Details>
                    </DetailsRectangle>
                </DetailsContainer>

                <DetailsContainer>
                    <FeeContainer>
                        <Fee>
                            <Icon name='tag' size={15} />
                            <Spacer size='large' position='right'/>
                            Fee:  ${fee}
                        </Fee>
                    </FeeContainer>
                </DetailsContainer>

                <Spacer size='xxLarge'></Spacer>
                
                <AboutPetContainer>    
                    <AboutPet>About {name}:</AboutPet>
                    <AboutPet>{shortDescription}</AboutPet>
                </AboutPetContainer>
                
                <Spacer size='xLarge'></Spacer>

                <ContactOwnerButton onPress={onPress}>
                    <ContactOwnerText>
                        {count}
                        <Icon name='chat' size={15} />
                        <Spacer size='large' position='right'/>
                        contact {ownership}
                    </ContactOwnerText>
                </ContactOwnerButton>
                <Spacer size='xLarge'></Spacer>
            </ScrollView>
        </SafeArea>
    )
}
    