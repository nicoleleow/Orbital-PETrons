import react from "react";
import { initializeApp, getApps, getApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { collection, getDocs } from "firebase/firestore/lite";
import {
  REACT_APP_apiKey,
  REACT_APP_authDomain,
  REACT_APP_projectId,
  REACT_APP_storageBucket,
  REACT_APP_messagingSenderId,
  REACT_APP_appId,
} from "@env";

const firebaseConfig = {
  apiKey: REACT_APP_apiKey,
  authDomain: REACT_APP_authDomain,
  projectId: REACT_APP_projectId,
  storageBucket: REACT_APP_storageBucket,
  messagingSenderId: REACT_APP_messagingSenderId,
  appId: REACT_APP_appId,
};

const app = getApps().length < 1 ? initializeApp(firebaseConfig) : getApp();
export const authentication = getAuth(app);
export const db = getFirestore(app);

export let petsList = [];
export const GetPetsData = async () => {
  const petsCol = collection(db, "put-up-for-adoption");
  const petsOverview = await getDocs(petsCol);
  petsList = petsOverview.docs.map((doc) => [doc.id, doc.data()]);
};

export let chatList = [];
export const GetChatData = async () => {
  const chatCol = collection(db, "chat");
  const chatOverview = await getDocs(chatCol);
  chatList = chatOverview.docs.map((doc) => doc.data());
};

// current user's username and pfp
export let userUsername;
export let userImage;
export const getUserName = async () => {
  const Snapshot = await getDocs(collection(db, "userinfo"));
  Snapshot.forEach((doc) => {
    if (doc.data().email === authentication.currentUser?.email) {
      userUsername = doc.data().username;
      userImage = doc.data().profilepic;
    }
  });
};

// get any user's username with email
export let indivUsername;
export const getIndivUsername = async (inputEmail) => {
  const Snapshot = await getDocs(collection(db, "userinfo"));
  Snapshot.forEach((doc) => {
    if (doc.data().email === inputEmail) {
      indivUsername = doc.data().username;
    }
  });
};

export let storiesList = [];
export const GetStoriesData = async () => {
  const storiesCol = collection(db, "stories");
  const storiesOverview = await getDocs(storiesCol);
  storiesList = storiesOverview.docs
    .map((doc) => [doc.id, doc.data()])
    .sort((x, y) => x[1].date < y[1].date);
};

export let petID;
export const GetPetID = async (
  name,
  gender,
  email,
  short_description,
  image
) => {
  const Snapshot = await getDocs(collection(db, "put-up-for-adoption"));
  Snapshot.forEach((doc) => {
    if (
      doc.data().email === email &&
      doc.data().gender === gender &&
      doc.data().name === name &&
      doc.data().short_description === short_description &&
      doc.data().image === image
    ) {
      petID = doc.id;
    }
  });
};

// list of favourited petIDs (string)
export let userFavouritesList = [];
export const GetUserFavourites = async () => {
  const Snapshot = await getDocs(collection(db, "userinfo"));
  Snapshot.forEach((doc) => {
    if (doc.data().email === authentication.currentUser?.email) {
      userFavouritesList = doc.data().favourites;
    }
  });
};

// get pet details from favourited petIDs
export let favouritesDetails = [];
export const GetFavouritesDetails = async (userFavouritesList) => {
  const Snapshot = await getDocs(collection(db, "put-up-for-adoption"));
  Snapshot.forEach((doc) => {
    if (
      userFavouritesList.includes(doc.id) &&
      favouritesDetails.length < userFavouritesList.length &&
      !favouritesDetails.map((x) => x[0]).includes(doc.id)
    ) {
      favouritesDetails.push([doc.id, doc.data()]);
    } else if (
      !userFavouritesList.includes(doc.id) &&
      favouritesDetails.map((x) => x[0]).includes(doc.id)
    ) {
      favouritesDetails = favouritesDetails.filter((x) => x[0] !== doc.id);
    }
  });
};

export let postID;
export const GetPostID = async (email, date, postText, postImage) => {
  const Snapshot = await getDocs(collection(db, "stories"));
  Snapshot.forEach((doc) => {
    if (
      doc.data().email === email &&
      doc.data().date === date &&
      doc.data().postText === postText &&
      doc.data().postImage === postImage
    ) {
      postID = doc.id;
    }
  });
};

export let postIDList = [];
export const GetPostIDs = async () => {
  const Snapshot = await getDocs(collection(db, "stories"));
  postIDList = Snapshot.docs.map((doc) => doc.id);
};

// list of liked postIDs (string)
export let userLikedPostsList = [];
export const GetUserLikedPosts = async () => {
  const Snapshot = await getDocs(collection(db, "userinfo"));
  Snapshot.forEach((doc) => {
    if (doc.data().email === authentication.currentUser?.email) {
      userLikedPostsList = doc.data().likedPosts;
    }
  });
};
