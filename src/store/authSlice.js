import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export const fetchCurrentUser = createAsyncThunk(
  "auth/checkUSerSignIn",
  async () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("onAuthStateChanged", user);

          resolve(user);
        } else {
          resolve(false);
        }
      });
      unsubscribe();
    });
  }
);

export const doSignup = createAsyncThunk("auth/signup", async (item) => {
  const user = createUserWithEmailAndPassword(auth, item.email, item.password)
    .then(async (userCredential) => {
      const userName = userCredential.user;
      const UserAuthId = userCredential.user.uid;
      console.log("UserAuthId", UserAuthId);
      try {
        let newUser = {
          name: item.name,
          email: item.email,
          userID: UserAuthId,
        };

        await addDoc(collection(db, "users"), newUser);

        return newUser;
      } catch (error) {
        toast.error(error);
      }
    })
    .catch((error) => {
      toast.error(error);
    });
  return user;
});

export const doLogin = createAsyncThunk("auth/login", async (item) => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      item.email,
      item.password
    );
    // console.log("login user", user);
    return user;
  } catch (error) {
    toast.error(error);
  }
});
export const userLogoutFirebase = createAsyncThunk('userLogoutFirebase', async () => {
  try {
      await auth.signOut();
      // The user has been signed out.
      console.log("Logout User Slice ..........................")
  } catch (error) {
      console.log('Error signing out:', error);
  }
});
// Define your slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    error: null,
    something: "new data",
    singupUser: {},
    currentUserRequestLoader: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doSignup.fulfilled, (state, action) => {
      let newState = {
        ...state,
        singupUser: action.payload,
      };
      // console.log("newState after signup", newState);

      return newState;
    });

    builder.addCase(doLogin.fulfilled, (state, action) => {
      if (action.payload.user) {
        let newState = {
          ...state,
          user: action.payload.user,
          isLoggedIn: true,
        };
        // console.log("newState after login", newState);

        return newState;
      }

      return {
        ...state,
      };
    });
    builder.addCase(userLogoutFirebase.fulfilled, (state, action) => {
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      console.log("newState after current user start", action);

      if (action.payload) {
        let newState = {
          ...state,
          user: action.payload.user,
          isLoggedIn: true,
          currentUserRequestLoader: false,
        };
        // console.log("newState after current user", newState);

        return newState;
      }

      return {
        ...state,
        currentUserRequestLoader: false,
      };
    });
  },
});

// Export the reducer
export default authSlice.reducer;
