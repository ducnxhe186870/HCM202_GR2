import { create } from "zustand";
import { auth } from "../services/firebaseService";
import { onAuthStateChanged, signInAnonymously, type User } from "firebase/auth";

type AuthState = {
  user: User | null;
  uid: string | null;
  loading: boolean;
};

export const useAuthStore = create<AuthState>(() => ({
  user: null,
  uid: null,
  loading: true,
}));

onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({
    user,
    uid: user?.uid ?? null,
    loading: false,
  });
});

signInAnonymously(auth).catch((err) => {
  console.error("Anonymous sign-in failed:", err);
});
