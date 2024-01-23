import { Auth, UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth: Auth = getAuth();

export const signUp =async (email: string, password: string): Promise<UserCredential> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
}

export const signIn =async (email: string, password: string): Promise<UserCredential> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
}

export const signOut =async (): Promise<void> => {
    try {
        await signOut();
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
}