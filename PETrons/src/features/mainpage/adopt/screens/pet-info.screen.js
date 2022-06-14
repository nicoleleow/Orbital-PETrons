import React, {useState} from 'react';
import { Image, ScrollView, Text} from "react-native";
import { Spacer } from '../../../../components/spacer/spacer.component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    SafeArea,
    Name,
    Breed,
    PetPhotoContainer,
    DetailsContainer,
    DetailsRectangle,
    Details,
    FeeContainer,
    Fee,
    AboutPetContainer,
    AboutPet,
    ContactOwnerButton,
    ContactOwnerText
} from "./pet-info.screen.styles"

export const PetInfoScreen = ({ route, navigation }) => {
    const pet = route.params.item

    const icon = 'https://cdn-icons-png.flaticon.com/512/3769/3769065.png';
    const { item } = pet;
    const { age, animalBreed, animalType, fee, gender, isShelter, name, photos, shortDescription } = item ;
    
    const ownership = { isShelter } ? 'Organisation' : 'Pet Owner';

    const [count, setCount] = useState(0);
    const onPress = () => setCount(prevCount => prevCount + 1);

    return (
    <SafeArea>
            <ScrollView>
                <Spacer size='xxLarge' />
                <Name>{name}</Name>
                <Breed>{animalBreed}</Breed>
                <Spacer size='large' />
                <PetPhotoContainer>
                    <Image
                        source={{ uri: photos[0] }}
                        style={{ resizeMode: "contain", width: 360, height: 220 }} />
                </PetPhotoContainer>
                
                <Spacer size='large' />
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

                <Spacer size='xLarge'></Spacer>
                
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
    