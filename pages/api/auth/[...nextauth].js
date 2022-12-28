import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { db, storage } from '../../../firebase'
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
   
} from "@firebase/firestore"; import { getDownloadURL, uploadString, ref } from 'firebase/storage';
import { useSession, signOut } from 'next-auth/react'
import { async } from '@firebase/util';
export const authOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

    ],
    callbacks: {
        async session({ session, token }) {
            session.user.tag = session.user.name.split(" ").join("").toLocaleLowerCase()
            session.user.id = token.sub
            return session
        }
    },
    // adapter: FirestoreAdapter({
    //     apiKey: process.env.FIREBASE_API_KEY,
    //     appId: process.env.FIREBASE_APP_ID,
    //     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    //     databaseURL: process.env.FIREBASE_DATABASE_URL,
    //     projectId: process.env.FIREBASE_PROJECT_ID,
    //     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    //     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    //     emulator: {},
    // }),

}
export default NextAuth(authOptions)