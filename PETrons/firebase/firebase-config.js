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
