import React, { useCallback } from "react";
import { Alert, Linking, ScrollView } from "react-native";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/spacer/spacer.component";

import { licensingGuidelines, licensingNotes } from "../components/licensing-dogs-info";

import {
  SafeArea,
  Container,
  Title,
  InfoText,
  LinksList,
  LinkButtons,
} from "./faq-pages.styles";

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
    <LinkButtons onPress={handlePress}>
      <Text>{children}</Text>
    </LinkButtons>
  )
};

export const LicensingDogsScreen = () => (
    <SafeArea>
    <Text variant='header'>Licensing of Dogs</Text>
    <Spacer size='small' />
    <ScrollView>
      <Spacer size='small' />
      <Title>General Guidelines</Title>
      <Container>
        {
          licensingGuidelines.map(text =>
            <InfoText key={text}>{text}</InfoText>)
        }
      </Container>
      <Spacer size='xLarge' />
      <Title>Note:</Title>
      <Container>
        {
          licensingNotes.map(text =>
            <InfoText key={text}>{text}</InfoText>)
        }
      </Container>
      <LinksList>
        <OpenURLButton
          url='https://www.nparks.gov.sg/avs/pets/owning-a-pet/licensing-a-pet/dog-licensing'>
          NParks Dog Licensing Information Page
        </OpenURLButton>
      </LinksList>
    </ScrollView>
    <Spacer size='large' />
  </SafeArea>
);