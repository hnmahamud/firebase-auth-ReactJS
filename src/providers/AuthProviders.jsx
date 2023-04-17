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

// Context api
export const AuthContext = createContext(null);

// Firebase auth
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user with email password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Send verification email
  const sendVerificationEmail = (user) => {
    return sendEmailVerification(user);
  };

  // Update profile data in firebase
  const profileUpdate = (updateName, updatePhoto) => {
    return updateProfile(auth.currentUser, {
      displayName: updateName,
      photoURL: updatePhoto,
    });
  };

  // Update profile data in local state
  const updateAuthData = (updateName, updatePhoto) => {
    setUser({ ...user, displayName: updateName, photoURL: updatePhoto });
  };

  // SignIn with email password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // SignIn with google
  const googleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // SignIn with github
  const githubSignIn = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  };

  // SignIn with twitter
  const twitterSignIn = () => {
    const twitterProvider = new TwitterAuthProvider();
    return signInWithPopup(auth, twitterProvider);
  };

  // SignIn with facebook
  const facebookSignIn = () => {
    const facebookProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookProvider);
  };

  // Password reset
  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Logout
  const logOut = () => {
    return signOut(auth);
  };

  // onAuthStateChanged for hold login user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    updateAuthData,
    loading,
    setLoading,
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
    // Send data to all using context api
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
