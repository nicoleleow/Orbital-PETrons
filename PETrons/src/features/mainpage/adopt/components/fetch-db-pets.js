import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../../../../firebase/firebase-config";

export const GetPetsData = async () => {
  const petsCol = collection(db, 'put-up-for-adoption');
  const petsOverview = await getDocs(petsCol);
  petsList = petsOverview.docs.map(doc => doc.data());
}