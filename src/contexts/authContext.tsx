import React, { useContext, useState, useEffect, PropsWithChildren } from "react";
import { auth } from "../firebase";
import { User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { UserData } from "../@types/user";

export type ContextType = {
    currentUser: User | null;
    signUp: (userData: UserData) => Promise<UserCredential>;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    logOut: () => Promise<void>;
};

const AuthContext = React.createContext<ContextType| undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error('useAuthContext must be inside the ThemeProvider');

    return context;
}

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const [currentUser, setCurrentUser] = useState<ContextType['currentUser']>(null);
    const [loading, setLoading] = useState(true);

    const signUp = async ({ email, password, firstName, lastName }: UserData): Promise<UserCredential> => {
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

    const signIn = async (email: string, password: string): Promise<UserCredential> => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
        }
    }

    const logOut = async (): Promise<void> => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value: ContextType = {
        currentUser,
        signUp,
        signIn,
        logOut
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
