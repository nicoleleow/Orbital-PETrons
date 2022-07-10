import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBN-1QrWO7woeGf7irPB_wnHt587R5HBXQ",
  authDomain: "petrons-39ae6.firebaseapp.com",
  projectId: "petrons-39ae6",
  storageBucket: "petrons-39ae6.appspot.com",
  messagingSenderId: "806740991321",
  appId: "1:806740991321:web:2e50c56826e07cef8b0048",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);

export let petsList = [];
export const GetPetsData = async () => {
  const petsCol = collection(db, "put-up-for-adoption");
  const petsOverview = await getDocs(petsCol);
  petsList = petsOverview.docs.map((doc) => doc.data());
};

export let chatList = [];
export const GetChatData = async () => {
  const chatCol = collection(db, "chat");
  const chatOverview = await getDocs(chatCol);
  chatList = chatOverview.docs.map((doc) => doc.data());
};

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

export let userPfp;
export const GetUserPfp = async (userName) => {
  const Snapshot = await getDocs(collection(db, "userinfo"));
  Snapshot.forEach((doc) => {
    if (doc.data().username === userName) {
      userPfp = doc.data().profilepic;
    }
  });
};

export let storiesList = [];
export const GetStoriesData = async () => {
  const storiesCol = collection(db, "stories");
  const storiesOverview = await getDocs(storiesCol);
  storiesList = storiesOverview.docs
    .map((doc) => doc.data())
    .sort((x, y) => x.date < y.date);
};

export let postIDList = [];
export const GetPostIDs = async () => {
  const Snapshot = await getDocs(collection(db, "stories"));
  postIDList = Snapshot.docs.map((doc) => doc.id);
}