import React, { createContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const sendVerificationEmail = (user) => {
    return sendEmailVerification(user);
  };

  const profileUpdate = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const updateAuthData = () => {
    const updateUser = auth.currentUser;
    console.log(updateUser);
    setUser(updateUser);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const githubSignIn = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  };

  const twitterSignIn = () => {
    const twitterProvider = new TwitterAuthProvider();
    return signInWithPopup(auth, twitterProvider);
  };

  const facebookSignIn = () => {
    const facebookProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookProvider);
  };

  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const authInfo = {
    user,
    updateAuthData,
    loading,
    createUser,
    sendVerificationEmail,
    profileUpdate,
    signIn,
    googleSignIn,
    githubSignIn,
    twitterSignIn,
    facebookSignIn,
    passwordReset,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
