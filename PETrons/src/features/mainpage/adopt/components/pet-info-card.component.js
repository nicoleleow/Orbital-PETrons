import React, { useState, useEffect } from "react";
import { Spacer } from "../../../../components/spacer/spacer.component";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

import {
  PetCard,
  PetCardDetails,
  PetInfoCardCover,
  SectionStart,
  SectionEnd,
  Name,
  Age,
  Caption,
  HDBIcon,
  GenderIcon,
} from "./pet-info-card.styles";

export const PetInfoCard = ({ pet }) => {
  // extract pet details
  const { index, item } = pet;
  const {
    ageYears,
    ageMonths,
    totalMonths,
    breed,
    type,
    fee,
    gender,
    HDB_approved,
    name,
    image,
    short_description,
    organisation,
  } = item[1];

  const genderIconType = gender === "Male" ? "male-symbol" : "female-symbol";
  const genderIconColor = gender === "Male" ? "#1260CC" : "#FE046A";

  const isHDBApproved = HDB_approved === "Yes" ? true : false;
  const hdbIcon =
    "https://www.logolynx.com/images/logolynx/e5/e5d49abdb2ad1ac2dff8fb33e138d785.jpeg";

  const [url, setUrl] = useState();
  useEffect(() => {
    const func = async () => {
      const uploadUri = image;
      const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
      const storage = getStorage();
      const reference = ref(storage, filename);
      await getDownloadURL(reference).then((x) => {
        setUrl(x);
      });
    };

    if (url == undefined) {
      func();
    }
  }, []);

  return (
    <PetCard elevation={5}>
      <PetInfoCardCover key={name} source={{ uri: url }} />
      <PetCardDetails>
        <SectionStart>
          <Name>{name}</Name>
          <Spacer size="small" />
          <Caption>{breed}</Caption>
          <Spacer size="small" />
          {(() => {
            if (totalMonths < 12) {
              return <Age>{ageMonths} months old</Age>;
            } else {
              if (totalMonths % 12 === 0) {
                if (totalMonths < 24) {
                  return <Age>{ageYears} year old</Age>;
                } else {
                  return <Age>{ageYears} years old</Age>;
                }
              } else {
                if (totalMonths < 24) {
                  return (
                    <Age>
                      {ageYears} year {ageMonths} months old
                    </Age>
                  );
                } else {
                  return (
                    <Age>
                      {ageYears} years {ageMonths} months old
                    </Age>
                  );
                }
              }
            }
          })()}
        </SectionStart>
        <SectionEnd>
          {isHDBApproved && <HDBIcon source={{ uri: hdbIcon }} />}
          <Spacer size="medium" position="right" />
          <GenderIcon name={genderIconType} color={genderIconColor} size={20} />

          <Spacer size="small" position="right" />
        </SectionEnd>
      </PetCardDetails>
    </PetCard>
  );
};
