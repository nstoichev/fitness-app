/**
 * Maps Firebase Auth error codes to user-friendly error messages
 * @param {string} errorCode - Firebase error code (e.g., 'auth/email-already-in-use')
 * @returns {string} User-friendly error message
 */
export function getAuthErrorMessage(errorCode) {
  const errorMessages = {
    'auth/email-already-in-use': 'This email is already registered. Please log in instead.',
    'auth/user-not-found': 'No account found with this email address.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection and try again.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/operation-not-allowed': 'This operation is not allowed. Please contact support.',
    'auth/invalid-credential': 'Invalid email or password. Please try again.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    'auth/cancelled-popup-request': 'Only one popup request is allowed at a time.',
    'auth/popup-blocked': 'Popup was blocked by your browser. Please allow popups and try again.',
  };

  return errorMessages[errorCode] || 'An error occurred. Please try again.';
}
