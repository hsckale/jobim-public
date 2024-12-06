import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_ID",
    appId: "APP_ID",
    measurementId: "MEASUREMENT_ID"
};

// Instanciação do Firebase no app
const app = initializeApp(firebaseConfig);

// Módulo de autenticação do Firebase
const auth = getAuth();

// Módulo do banco de dados Firestore
const db = getFirestore();

// Módulo do Cloud Storage
const storage = getStorage();

// Detectar se está rodando em localhost ou 127.0.0.1 e conectar ao emulador
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
}

export { app, auth, storage, db };