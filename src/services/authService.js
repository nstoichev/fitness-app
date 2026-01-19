import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();

export const authService = {
  /**
   * Register a new user with email and password
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<User>} Firebase User object
   */
  register: async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  /**
   * Sign in an existing user with email and password
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<User>} Firebase User object
   */
  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  /**
   * Sign in with Google
   * @returns {Promise<User>} Firebase User object
   */
  signInWithGoogle: async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential.user;
  },

  /**
   * Sign out the current user
   * @returns {Promise<void>}
   */
  logout: async () => {
    await signOut(auth);
  },

  /**
   * Get the currently authenticated user
   * @returns {User | null} Firebase User object if authenticated, null otherwise
   */
  getCurrentUser: () => {
    return auth.currentUser;
  },

  /**
   * Subscribe to authentication state changes
   * @param {function} callback - Callback function called when auth state changes
   * @returns {function} Unsubscribe function
   */
  onAuthStateChanged: (callback) => {
    return firebaseOnAuthStateChanged(auth, callback);
  },
};
