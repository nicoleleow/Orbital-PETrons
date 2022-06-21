import React, { useCallback } from "react";
import { FlatList, SafeAreaView, TouchableOpacity, Alert, Linking, View, ScrollView} from "react-native";
import styled from "styled-components/native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";

import { disclaimerText, organisationLinks, individualProcedureText, organisationProcedureText, organisationProcedureSteps } from "./pet-adoption-procedure-info";


const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const Container = styled(View)`
  // background-color: ${(props) => props.theme.colors.brand.yellow3};
  padding: 0 ${(props) => props.theme.space[2]};
  padding-top: ${(props) => props.theme.space[3]};
  margin-horizontal: ${(props) => props.theme.space[4]};
  border-radius: ${(props) => props.theme.space[3]};
`

const Title = styled(Text)`
  font-weight: bold;
  text-decoration: underline;
  line-height: 30px;
  margin-horizontal: ${(props) => props.theme.space[5]};
`

const InfoText = styled(Text)`
  margin-horizontal: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
  line-height: 20px;
`

const List = styled(View)`
  margin-horizontal: ${(props) => props.theme.space[5]};
  width: 260px;
  flex-direction: row;
`

const ListItems = styled(Text)`
  margin-left: ${(props) => props.theme.space[4]};
  line-height: 20px;
`

const OrganisationsList = styled(View)`
  margin-horizontal: ${(props) => props.theme.space[5]};
  padding: ${(props) => props.theme.space[1]} 0;
  // background-color: lightblue;
  border-radius: ${(props) => props.theme.space[3]};
`

const OrganisationButtons = styled(TouchableOpacity)`
  elevation: 5;
  margin: ${(props) => props.theme.space[2]} 0;
  padding: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.brand.yellow3};
`

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <OrganisationButtons onPress={handlePress}>
      <Text>{children}</Text>
    </OrganisationButtons>
  )
};


export const PetAdoptionProcedureScreen = () => (
  <SafeArea>
    <Text variant='header'>Pet Adoption Procedure</Text>
    <Spacer size='small' />
    <ScrollView>
      <Spacer size='small' />
      <Title>Becoming a Pet Owner</Title>
      <Container>
        {
          disclaimerText.map(text =>
            <InfoText key={text}>{text}</InfoText>)
        }
      </Container>
      <Spacer size='xLarge' />
      <Title>Adopting from Individual Pet Owners</Title>
      <Container>
        {
          individualProcedureText.map(text =>
            <InfoText key={text}>{text}</InfoText>)
        }
      </Container>
      <Spacer size='xLarge' />
      <Title>Adopting from Animal Welfare Groups</Title>
      <Container>
        <InfoText>{organisationProcedureText[0]}</InfoText>
        <Spacer size='medium' />
        {
          organisationProcedureSteps.map(item =>
            <List>
              <ListItems>{item.step} </ListItems>
              <ListItems>{item.text}</ListItems>
            </List>
          )
        }
        <Spacer size='large' />
        <InfoText>{organisationProcedureText[1]}</InfoText>
        <InfoText>{organisationProcedureText[2]}</InfoText>
        <InfoText>{organisationProcedureText[3]}</InfoText>
      </Container>
      <Spacer size='xLarge' />
      <Title>Links to the Animal Welfare Groups</Title>
      <OrganisationsList>
        {
          organisationLinks.map( item =>
            <OpenURLButton url={item.link} key={item.org}>{item.org}</OpenURLButton>
          )
        }
      </OrganisationsList>
    </ScrollView>
    <Spacer size='large' />
  </SafeArea>
);