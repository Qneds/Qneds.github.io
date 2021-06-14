import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBevFglsDo81vsiROHL7gHK9IYoEdwAY2E",
    authDomain: "lab6-c271e.firebaseapp.com",
    projectId: "lab6-c271e",
    storageBucket: "lab6-c271e.appspot.com",
    messagingSenderId: "717128845514",
    appId: "1:717128845514:web:ef1c10c38ea28c5ce34c33",
    measurementId: "G-VMB776V65B"
  };


if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const timeStamp = firebase.firestore.FieldValue.serverTimestamp();


export const addUserData = async(user, userData) => {
    return firestore.collection("users").doc(user.uid).set({
        ...userData
    });
}

export const getUserData = async(user) => {
    return firestore.collection("users").doc(user.uid).get();
}

export const updateUserData = async(user, userData) => {
    return firestore.collection("users").doc(user.uid).update({
        ...userData
    });
}

export const addOffer = (offer) => {
    return firestore.collection("offers").add({
        ...offer
    });
}

export const getAllOffers = () => {
    return firestore.collection("offers")
    .where("state", "==", "Available").get();
}

export const getAllOffersQ = (q) => {
    return firestore.collection("offers")
    .orderBy("auto").startAt(q).endAt(q+'\uf8ff')
    .where("state", "==", "Available")
    .get();
}

export const updateOffer = (offer) => {
    return firestore.collection("offers").doc(offer.id).update({
        ...offer.data
    });
}

export const addOfferToHistory = (entity) => {
    return firestore.collection("borrowHistory").add({
        ...entity
    });
}

export const setLastDateInOfferBorrows = (id) => {
    return firestore.collection("borrowHistory").doc(id).update({
        returnDate: timeStamp
    });
}

export const getAllUsersOffer = (user) => {
    return firestore.collection("offers").where("owner", "==", user.uid).get();
}

export const getOffer = (id) => {
    return firestore.collection("offers").doc(id).get();
}

export const getAllUsersOfferQ = (user, q) => {
    return firestore.collection("offers").where("owner", "==", user.uid)
    .orderBy("auto").startAt(q).endAt(q+'\uf8ff')
    .get();
}

export const getBorrowedQ = (user, q) => {
    return firestore.collection("offers").where("borrowedBy", "==", user.uid)
    .orderBy("auto").startAt(q).endAt(q+'\uf8ff')
    .get();
}

export const getBorowed = (user) => {
    return firestore.collection("offers").where("borrowedBy", "==", user.uid).get();
}

export const getBorowedHistory = (user) => {
    return firestore.collection("borrowHistory")
    .where("userId", "==", user.uid).get();
}

export const getHistoryDoc = (id) => {
    return firestore.collection("borrowHistory").doc(id).get();
}

export const getBorowedOfferHistory = (user, offerId) => {
    return firestore.collection("borrowHistory").where("offerId", "==", offerId)
    .where("userId", "==", user.uid).where("returnDate", "==", "").get();
}