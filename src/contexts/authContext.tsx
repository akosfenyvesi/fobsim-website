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
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { UserData } from "../@types/user";
import { concatenateDisplayName } from "../utils/displayNameUtils";

export type ContextType = {
  currentUser: User | null;
  signUp: (userData: UserData) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  sendResetPasswordEmail: (email: string) => Promise<void>;
  confirmUserEmail: (oobCode: string) => Promise<void>;
  confirmResetPassword: (oobCode: string, newPassword: string) => Promise<void>;
  updateUserProfile: (userData: UserData) => Promise<void>; // TODO return type
  deleteAccount: () => Promise<void>;
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
        displayName: concatenateDisplayName(firstName, lastName),
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

  const updateUserProfile = async (userData: UserData) => {
    // TODO: if user signed in a long time ago, need to reauthenticate!
    if (auth.currentUser) {
      try {
        if (userData.firstName && userData.lastName)
          await updateProfile(auth.currentUser, {
            displayName: concatenateDisplayName(
              userData.firstName,
              userData.lastName
            ),
          });
      } catch (error) {
        throw error;
      }

      if (userData.password)
        try {
          await updatePassword(auth.currentUser, userData.password);
        } catch (error) {
          throw error;
        }
    }
  };

  const deleteAccount = async (): Promise<void> => {
    if (auth.currentUser) return await deleteUser(auth.currentUser);
  };

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
    updateUserProfile,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
