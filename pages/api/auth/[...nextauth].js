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
    secret: process.env.JWT_SECRET
}
export default NextAuth(authOptions)