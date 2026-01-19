# Authentication Service Contract

**Feature**: 001-user-auth  
**Date**: 2025-01-27  
**Type**: Service Interface Contract

## Overview

This contract defines the interface for the authentication service layer. The service wraps Firebase Authentication SDK to provide a clean, testable interface for the React application.

## Service Interface

### `authService.register(email: string, password: string): Promise<User>`

**Purpose**: Register a new user account

**Parameters**:
- `email` (string, required): User's email address
- `password` (string, required): User's password

**Returns**: `Promise<User>` - Firebase User object on success

**Errors**:
- `auth/email-already-in-use`: Email is already registered
- `auth/invalid-email`: Email format is invalid
- `auth/weak-password`: Password does not meet requirements
- `auth/operation-not-allowed`: Registration is disabled
- `auth/network-request-failed`: Network error occurred

**Behavior**:
- Creates new user account in Firebase Auth
- Automatically logs in the user after registration
- Returns User object with uid, email, and metadata

**Example**:
```javascript
try {
  const user = await authService.register('user@example.com', 'password123');
  console.log('User registered:', user.uid);
} catch (error) {
  console.error('Registration failed:', error.code);
}
```

---

### `authService.login(email: string, password: string): Promise<User>`

**Purpose**: Authenticate an existing user

**Parameters**:
- `email` (string, required): User's email address
- `password` (string, required): User's password

**Returns**: `Promise<User>` - Firebase User object on success

**Errors**:
- `auth/user-not-found`: No user found with this email
- `auth/wrong-password`: Password is incorrect
- `auth/invalid-email`: Email format is invalid
- `auth/user-disabled`: User account has been disabled
- `auth/too-many-requests`: Too many failed login attempts
- `auth/network-request-failed`: Network error occurred

**Behavior**:
- Validates credentials with Firebase Auth
- Creates authentication session
- Returns User object with uid, email, and metadata

**Example**:
```javascript
try {
  const user = await authService.login('user@example.com', 'password123');
  console.log('User logged in:', user.uid);
} catch (error) {
  console.error('Login failed:', error.code);
}
```

---

### `authService.logout(): Promise<void>`

**Purpose**: Sign out the current user

**Parameters**: None

**Returns**: `Promise<void>`

**Errors**:
- `auth/network-request-failed`: Network error occurred

**Behavior**:
- Signs out current user from Firebase Auth
- Clears authentication tokens
- Destroys current session

**Example**:
```javascript
try {
  await authService.logout();
  console.log('User logged out');
} catch (error) {
  console.error('Logout failed:', error.code);
}
```

---

### `authService.getCurrentUser(): User | null`

**Purpose**: Get the currently authenticated user

**Parameters**: None

**Returns**: `User | null` - Firebase User object if authenticated, null otherwise

**Errors**: None (synchronous operation)

**Behavior**:
- Returns current user if authenticated
- Returns null if no user is authenticated
- Does not trigger network requests

**Example**:
```javascript
const user = authService.getCurrentUser();
if (user) {
  console.log('Current user:', user.uid);
} else {
  console.log('No user authenticated');
}
```

---

### `authService.onAuthStateChanged(callback: (user: User | null) => void): () => void`

**Purpose**: Subscribe to authentication state changes

**Parameters**:
- `callback` (function, required): Callback function called when auth state changes
  - Receives `User | null` as parameter

**Returns**: `() => void` - Unsubscribe function

**Errors**: None

**Behavior**:
- Subscribes to Firebase Auth state changes
- Callback is called immediately with current state
- Callback is called whenever auth state changes (login, logout, token refresh)
- Returns unsubscribe function to stop listening

**Example**:
```javascript
const unsubscribe = authService.onAuthStateChanged((user) => {
  if (user) {
    console.log('User authenticated:', user.uid);
  } else {
    console.log('User signed out');
  }
});

// Later, to unsubscribe:
unsubscribe();
```

---

## Error Handling

### Error Codes

All errors follow Firebase Auth error code format: `auth/error-code`

**Common Error Codes**:
- `auth/email-already-in-use`: Email already registered
- `auth/user-not-found`: User does not exist
- `auth/wrong-password`: Incorrect password
- `auth/invalid-email`: Invalid email format
- `auth/weak-password`: Password too weak
- `auth/too-many-requests`: Too many failed attempts
- `auth/network-request-failed`: Network error
- `auth/user-disabled`: Account disabled
- `auth/operation-not-allowed`: Operation disabled

### Error Object Structure

```typescript
interface AuthError {
  code: string;           // e.g., "auth/email-already-in-use"
  message: string;         // Human-readable error message
  name: string;           // Always "FirebaseError"
}
```

### User-Friendly Error Messages

The service should map Firebase error codes to user-friendly messages:

| Error Code | User Message |
|------------|--------------|
| `auth/email-already-in-use` | "This email is already registered. Please log in instead." |
| `auth/user-not-found` | "No account found with this email address." |
| `auth/wrong-password` | "Incorrect password. Please try again." |
| `auth/invalid-email` | "Please enter a valid email address." |
| `auth/weak-password` | "Password is too weak. Please use at least 6 characters." |
| `auth/too-many-requests` | "Too many failed attempts. Please try again later." |
| `auth/network-request-failed` | "Network error. Please check your connection and try again." |
| `auth/user-disabled` | "This account has been disabled. Please contact support." |
| `auth/operation-not-allowed` | "This operation is not allowed. Please contact support." |

---

## Type Definitions

### User Object (Firebase Auth)

```typescript
interface User {
  uid: string;                    // Unique user ID
  email: string | null;            // User's email
  emailVerified: boolean;         // Email verification status
  displayName: string | null;     // Display name
  photoURL: string | null;        // Profile photo URL
  disabled: boolean;              // Account disabled status
  metadata: {
    creationTime: string;         // Account creation timestamp
    lastSignInTime: string | null; // Last sign-in timestamp
  };
  providerData: Array<{
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    providerId: string;
  }>;
}
```

---

## Testing Contract

### Unit Test Requirements

Each service method must have unit tests covering:

1. **Success cases**: Valid inputs produce expected outputs
2. **Error cases**: Invalid inputs produce appropriate errors
3. **Edge cases**: Empty strings, null values, special characters
4. **Network errors**: Simulated network failures

### Mock Requirements

- Mock Firebase Auth SDK methods
- Mock network requests
- Mock localStorage/sessionStorage for token storage

### Integration Test Requirements

- Test with real Firebase Auth (test project)
- Test authentication flow end-to-end
- Test session persistence across page refreshes
- Test error handling with real Firebase errors

---

## Implementation Notes

1. **Service Location**: `src/services/authService.js`
2. **Firebase Initialization**: Use `services/firebase.js` for Firebase app instance
3. **Error Mapping**: Create error mapping utility for user-friendly messages
4. **Type Safety**: Consider TypeScript or JSDoc for type definitions
5. **Logging**: Log authentication events for debugging (avoid logging sensitive data)

---

## Future Enhancements

- Password reset functionality
- Email verification
- Social login (Google, Facebook, etc.)
- Two-factor authentication
- Account deletion
- Profile management
