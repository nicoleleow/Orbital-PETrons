import React, { useState } from "react";
import { SafeAreaView, View, TextInput, Modal, TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component"
import { Spacer } from "../../../components/spacer/spacer.component";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StoriesPostCard } from "./components/stories-post-card.component";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const UploadPostContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: white;
  border-radius: 7px;
  padding-horizontal: 20px;
  margin-horizontal: ${(props) => props.theme.space[4]};
`

export const ModalContent = styled(View).attrs({
  elevation: 10,
  justifyContent: 'center',
  alignItems: 'center',
  height: Dimensions.get('window').height
})`
  padding: 30px;
  padding-bottom: 16px;
  border-width: 1.5px;
  border-color: #ebe6e6;
  background-color: white;
`

export const StoriesPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const pfp = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'

  return (
    <SafeArea>

      <View>
        <Text variant='header'>Share Stories</Text>
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <ModalContent>
              <Text>upload post</Text>
            </ModalContent>
          </Modal>
        <UploadPostContainer>
          <Icon
            raised
            name="user-circle-o"
            size={30} color={'#777'}
            onPress={() => console.log('camera icon pressed')}
          />
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text>click here</Text>
          </TouchableOpacity>  
        </UploadPostContainer>
        
        {/* <UploadPostContainer>
          <Icon
            raised
            name="user-circle-o"
            size={30} color={'#777'}
            onPress={() => console.log('camera icon pressed')}
          />
          <Spacer size='xLarge' position='right' />
          <TextInput
            placeholderTextColor={'#777'}
            placeholder="Tell your story!"
            style={{ flex: 1 }}
            onChangeText={(text) => filterPets(categoryIndexFiltered, text)}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View>
              <Text>upload post</Text>
            </View>
          </Modal>
        </UploadPostContainer> */}
        <StoriesPostCard />
      </View>
      
    </SafeArea>
  )
};
