import React, { useCallback } from "react";
import { Alert, Linking, ScrollView, View} from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";

import { generalQuestions, orgQuestions, surrenderingQuestions } from "../components/faq-questions-answers";

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


export const FrequentlyAskedQuestionsScreen = () => (
  <SafeArea>
    <Text variant='header'>Frequently Asked Questions</Text>
    <Spacer size='small' />
    <ScrollView>
      <Spacer size='small' />
      <Title>General Questions</Title>
      <Container>
        {
          generalQuestions.map(item =>
            <View key={item.qn}>
              <InfoText style={{fontWeight: 'bold'}}>{item.qn}</InfoText>
              {
                item.ans.map(text => 
                  <InfoText key={text}>{text}</InfoText>
                  )
              }
              <Spacer size='xLarge' />
            </View>
          )
        }
      </Container>
      <Spacer size='xLarge' />
      <Title>About Adopting from Organisations</Title>
      <Container>
        {
          orgQuestions.map(item =>
            <View key={item.qn}>
              <InfoText style={{fontWeight: 'bold'}}>{item.qn}</InfoText>
              {
                item.ans.map(text => 
                  <InfoText key={text}>{text}</InfoText>
                  )
              }
              <Spacer size='xLarge' />
            </View>
          )
        }
      </Container>
      <Spacer size='xLarge' />
      <Title>About Putting Your Pet for Adoption</Title>
      <Container>
        {
          surrenderingQuestions.map(item =>
            <View key={item.qn}>
              <InfoText style={{fontWeight: 'bold'}}>{item.qn}</InfoText>
              {
                item.ans.map(text => 
                  <InfoText key={text}>{text}</InfoText>
                  )
              }
            </View>
          )
        }
      </Container>
      <LinksList>
        <OpenURLButton
          url='https://singaporelegaladvice.com/law-articles/adoption-pets-singapore-legal-considerations-procedure/'>
          Legal Considerations for Pet Adoption
        </OpenURLButton>
      </LinksList>
    </ScrollView>
    <Spacer size='large' />
  </SafeArea>
);