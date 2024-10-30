import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FirebaseOptions, getApps, initializeApp } from 'firebase/app';
import {
  Auth,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useApolloClient } from '@apollo/client';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// Context to provide Firebase auth object throughout the app
const FirebaseAuthContext = createContext<{ auth: Auth } | null>(null);

// Initialize or return the existing Firebase app instance to avoid re-initializing
const createFirebaseAuth = () => {
  const firebaseApp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const auth = getAuth(firebaseApp);
  auth.setPersistence(browserLocalPersistence); // Use local persistence for authentication

  return auth;
};

// Provider component to set up and provide Firebase Auth context
export const FirebaseProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [firebaseAuthLoading, setFirebaseAuthLoading] = useState(true);
  const auth = useRef(createFirebaseAuth());

  // Wait for Firebase Auth to finish loading and set up before rendering children
  useEffect(() => {
    const unsubscribe = auth.current.onIdTokenChanged(() => {
      setFirebaseAuthLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (firebaseAuthLoading) {
    return null; // render nothing while waiting for firebase finished to avoid running queries with no token
  }

  return (
    <FirebaseAuthContext.Provider value={{ auth: auth.current }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

// Hook to access Firebase Auth object context safely
export const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (!context) {
    throw new Error('useFirebaseAuth must be used within a FirebaseProvider');
  }
  return context;
};

// Hook providing Firebase authentication methods
export const useFirebaseAuthLogic = () => {
  const { auth } = useFirebaseAuth();

  const getToken = useCallback(async () => {
    return (await auth.currentUser?.getIdToken()) ?? null;
  }, [auth]);

  const login = useCallback(
    (email: string, password: string) =>
      signInWithEmailAndPassword(auth, email, password),
    [auth],
  );

  const register = useCallback(
    (email: string, password: string) =>
      createUserWithEmailAndPassword(auth, email, password),
    [auth],
  );

  const resetPassword = useCallback(
    (email: string) => sendPasswordResetEmail(auth, email),
    [auth],
  );

  const logout = useCallback(() => auth.signOut(), [auth]);

  return {
    getToken,
    login,
    register,
    resetPassword,
    logout,
  };
};

// Watcher to handle Firebase Authentication state changes for Apollo Client
export const FirebaseAuthWatcher: React.FC = () => {
  const client = useApolloClient();
  const { auth } = useFirebaseAuth();

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(() => {
      // reset cache & refetch active queries on auth state change (login, sign out, token expiry, etc.)
      client.resetStore();
    });
    return () => unsubscribe();
  }, [auth, client]);

  return null;
};

// Wrapper component to set up Firebase authentication in Apollo Link and provide token for each request
export const FirebaseLinkContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const client = useApolloClient();
  const { getToken } = useFirebaseAuthLogic();
  const [mountedLink, setMountedLink] = useState(false);

  // set up Apollo Client to use Firebase token in headers
  useEffect(() => {
    client.defaultContext.getToken = getToken;
    setMountedLink(true); // ensure the component is only mounted after getToken is setup
  }, [client, getToken]);

  return mountedLink ? children : null;
};
