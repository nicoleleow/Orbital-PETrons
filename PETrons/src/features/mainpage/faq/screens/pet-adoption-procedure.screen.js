import React, { useCallback } from "react";
import { Alert, Linking, ScrollView } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";

import {
  organisationLinks,
  individualProcedureText,
  organisationProcedureText,
  organisationProcedureSteps,
} from "../components/pet-adoption-procedure-info";

import {
  Container,
  Title,
  InfoText,
  List,
  ListItems,
  LinksList,
  LinkButtons,
} from "./faq-pages.styles";
import { SafeArea } from "../../../../components/utility/safe-area.component";

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
  );
};

export const PetAdoptionProcedureScreen = () => (
  <SafeArea>
    <Text variant="header">Pet Adoption Procedure</Text>
    <Spacer size="small" />
    <ScrollView>
      <Spacer size="small" />
      <Title>Adopting from Individual Pet Owners</Title>
      <Container>
        {individualProcedureText.map((text) => (
          <InfoText key={text}>{text}</InfoText>
        ))}
      </Container>
      <Spacer size="xLarge" />
      <Title>Adopting from Animal Welfare Groups</Title>
      <Container>
        <InfoText>{organisationProcedureText[0]}</InfoText>
        <Spacer size="medium" />
        {organisationProcedureSteps.map((item) => (
          <List key={item.step}>
            <ListItems>{item.step} </ListItems>
            <ListItems>{item.text}</ListItems>
          </List>
        ))}
        <Spacer size="large" />
        <InfoText>{organisationProcedureText[1]}</InfoText>
        <InfoText>{organisationProcedureText[2]}</InfoText>
        <InfoText>{organisationProcedureText[3]}</InfoText>
      </Container>
      <Spacer size="xLarge" />
      <Title>Links to the Animal Welfare Groups</Title>
      <LinksList>
        {organisationLinks.map((item) => (
          <OpenURLButton url={item.link} key={item.org}>
            {item.org}
          </OpenURLButton>
        ))}
      </LinksList>
    </ScrollView>
    <Spacer size="large" />
  </SafeArea>
);
