import React, {
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { auth } from "../firebase";
import {
  User,
  UserCredential,
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { UserData } from "../@types/user";

export type ContextType = {
  currentUser: User | null;
  signUp: (userData: UserData) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  sendResetPasswordEmail: (email: string) => Promise<void>;
  confirmUserEmail: (oobCode: string) => Promise<void>;
  confirmResetPassword: (oobCode: string, newPassword: string) => Promise<void>;
};

const AuthContext = React.createContext<ContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuthContext must be inside the ThemeProvider");

  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [currentUser, setCurrentUser] =
    useState<ContextType["currentUser"]>(null);
  const [loading, setLoading] = useState(true);

  const signUp = async ({
    email,
    password,
    firstName,
    lastName,
  }: UserData): Promise<UserCredential> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (auth.currentUser) await sendEmailVerification(auth.currentUser);

      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const logOut = async (): Promise<void> => {
    try {
      return await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const sendResetPasswordEmail = async (email: string): Promise<void> => {
    try {
      return await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  const confirmUserEmail = async (oobCode: string): Promise<void> => {
    // TODO: problem here: auth/invalid-action-code
    try {
      return await applyActionCode(auth, oobCode);
    } catch (error) {
      throw error;
    }
  };

  const confirmResetPassword = async (
    oobCode: string,
    newPassword: string
  ): Promise<void> => {
    return await confirmPasswordReset(auth, oobCode, newPassword);
  };

  // const updateUserProfile = async (currentUser: User, userData: UserData) => {};

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: ContextType = {
    currentUser,
    signUp,
    signIn,
    logOut,
    sendResetPasswordEmail,
    confirmUserEmail,
    confirmResetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
