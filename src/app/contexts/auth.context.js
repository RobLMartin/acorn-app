import React, { useContext, useState, useEffect } from "react";
import {
  auth,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  collection,
  addDoc,
  default as db,
} from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const signup = async (email, password, formData, logo) => {
    const { restaurantName, streetAddress, city, state, zip } = formData;
    let newDB = collection(db, "restaurantDetails");
    const res = await createUserWithEmailAndPassword(auth, email, password);

    addDoc(newDB, {
      userId: res.user.uid,
      restaurantName,
      streetAddress,
      city,
      state,
      zip,
    });
    if (logo) {
      const fileRef = ref(storage, `/logo/${res.user.uid}.png`);

      try {
        await uploadBytes(fileRef, logo);
        const photoURL = await getDownloadURL(fileRef);

        await updateProfile(res.user, { photoURL: photoURL });
      } catch (err) {
        console.log(err);
      }
    }

    return res;
  };
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth).then(() => navigate("/auth"));
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function saveEmail(email) {
    return updateEmail(currentUser, email);
  }

  function savePassword(password) {
    return updatePassword(currentUser, password);
  }

  async function uploadAvatar(image) {
    const fileRef = ref(storage, `${currentUser.uid}.png`);

    try {
      await uploadBytes(fileRef, image);
      const photoURL = await getDownloadURL(fileRef);

      await updateProfile(currentUser, { photoURL: photoURL });
    } catch (err) {
      console.log(err);
    }
  }

  function removeAvatar() {
    return updateProfile(currentUser, { photoURL: "" });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    saveEmail,
    savePassword,
    uploadAvatar,
    removeAvatar,
    isAuth: currentUser !== null,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
