"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  User, 
  onAuthStateChanged,
  signInWithPopup, 
  signInWithRedirect,
  signOut,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isSigningIn: boolean;
  isLoggingOut: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Check if error is a popup-related error that should trigger redirect fallback
function isPopupError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.includes('auth/popup-closed-by-user') || 
           error.message.includes('auth/cancelled-popup-request') ||
           error.message.includes('auth/popup-blocked');
  }
  return false;
}

// Custom error class for user-friendly error messages
export class SignInError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'SignInError';
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    // Prevent multiple simultaneous sign-in attempts
    if (isSigningIn) {
      console.log('Sign in already in progress');
      return;
    }

    setIsSigningIn(true);
    
    try {
      const provider = new GoogleAuthProvider();
      // Add additional scopes if needed
      provider.addScope('profile');
      provider.addScope('email');
      
      // Attempt popup sign-in first
      try {
        await signInWithPopup(auth, provider);
      } catch (popupError) {
        // If popup fails (blocked or closed), use redirect as fallback
        // Only redirect if it's a genuine popup error, not some other auth error
        if (isPopupError(popupError)) {
          console.log('Popup sign-in failed, falling back to redirect:', popupError);
          await signInWithRedirect(auth, provider);
        } else {
          // Re-throw if it's a different error
          throw popupError;
        }
      }
    } catch (error) {
      // Convert Firebase errors to user-friendly messages
      // Firebase errors have a 'code' property with format 'auth/code'
      if (error instanceof Error && 'code' in error) {
        const errorCode = (error as { code: string }).code;
        
        switch (errorCode) {
          case 'auth/popup-closed-by-user':
          case 'auth/cancelled-popup-request':
            throw new SignInError(
              'Sign-in was cancelled. Please try again and complete the sign-in process.',
              errorCode
            );
          case 'auth/popup-blocked':
            throw new SignInError(
              'Popup was blocked by your browser. Please allow popups for this site or try again.',
              errorCode
            );
          case 'auth/account-exists-with-different-credential':
            throw new SignInError(
              'An account already exists with a different sign-in method. Please use the original method.',
              errorCode
            );
          default:
            throw new SignInError(
              'Failed to sign in. Please try again.',
              errorCode
            );
        }
      }
      // Re-throw any other errors
      throw error;
    } finally {
      setIsSigningIn(false);
    }
  };

const logout = async () => {
    // Prevent multiple simultaneous logout attempts
    if (isLoggingOut) {
      console.log('Logout already in progress');
      return;
    }

    setIsLoggingOut(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isSigningIn, isLoggingOut, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
