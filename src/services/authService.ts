import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

interface UserData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export const signUp = async ({ email, password, firstName, lastName }: UserData ): Promise<UserCredential> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(userCredential.user, {
            displayName: `${firstName} ${lastName}`,
        });

        return userCredential;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
}

export const signIn = async (email: string, password: string): Promise<UserCredential> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
}

export const signOut = async (): Promise<void> => {
    try {
        await signOut();
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
}