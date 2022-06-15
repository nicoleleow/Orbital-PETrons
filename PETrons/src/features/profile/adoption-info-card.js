import React from "react";
import styled from "styled-components/native";
import { Card, Title } from "react-native-paper";
import { View, Text, Image } from "react-native";

import { Spacer } from "../../components/spacer/spacer.component";

const AdoptionCard = styled(Card)`
  margin: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.space[3]};
`;
const AdoptionCardDetails = styled(Card.Content)`
  padding-horizontal: 15px;
  padding-bottom: ${(props) => props.theme.space[3]};
  padding-top: ${(props) => props.theme.space[1]};
  display: flex;
  flex-direction: row;
`;

const AdoptionPetInfoCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[2]};
  // background-color: ${(props) => props.theme.colors.bg.primary};
  background-color: white;
`;

const SectionStart = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Name = styled(Title)`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-family: ${(props) => props.theme.fonts.heading};
  color: ${(props) => props.theme.colors.text.error};
`;

const Caption = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.button};
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.brand.secondary};
`;

export const AdoptionInfoCard = ({ pet = {} }) => {
  const { index, item } = pet;
  const {
    age,
    breed,
    type,
    fee,
    gender,
    organisation,
    name,
    image,
    short_description,
    HDB_approved,
  } = item;

  return (
    <AdoptionCard elevation={5}>
      <AdoptionPetInfoCardCover key={name} source={{ uri: image }} />
      <AdoptionCardDetails>
        <SectionStart>
          <Name>{name}</Name>
          <Spacer size="small" />
          <Caption>{breed}</Caption>
          <Spacer size="small" />
          <Caption>
            {age}, {gender}
          </Caption>
        </SectionStart>
      </AdoptionCardDetails>
    </AdoptionCard>
  );
};
