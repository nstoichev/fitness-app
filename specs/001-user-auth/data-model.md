# Data Model: User Authentication and Access Control

**Feature**: 001-user-auth  
**Date**: 2025-01-27

## Entities

### User Account

**Description**: Represents a registered user in the fitness application system.

**Storage**: Firebase Authentication (primary) + Firestore (extended profile data - future)

**Key Attributes**:
- `uid` (string, required, unique): Firebase-generated unique identifier
- `email` (string, required, unique): User's email address, used for login
- `emailVerified` (boolean): Whether email has been verified (future feature)
- `displayName` (string, optional): User's display name (future feature)
- `createdAt` (timestamp): Account creation timestamp (Firebase Auth provides)
- `lastLoginAt` (timestamp): Last successful login timestamp (Firebase Auth provides)
- `photoURL` (string, optional): User profile photo URL (future feature)

**Relationships**:
- One User Account can have multiple Authentication Sessions
- One User Account can have multiple Workout Sessions (future feature)
- One User Account can have multiple Exercise Records (future feature)

**Validation Rules**:
- Email must be valid format (validated by Firebase Auth)
- Email must be unique (enforced by Firebase Auth)
- Password must meet Firebase Auth requirements (minimum 6 characters by default, can be customized)
- Email length: max 320 characters (RFC 5321 standard)

**State Transitions**:
```
[Not Registered] → [Registering] → [Registered & Authenticated]
[Registered] → [Logging In] → [Authenticated]
[Authenticated] → [Logging Out] → [Unauthenticated]
[Authenticated] → [Session Expired] → [Unauthenticated]
```

**Firebase Auth Fields** (managed by Firebase):
- `uid`: Unique user ID
- `email`: User email
- `emailVerified`: Email verification status
- `displayName`: Display name
- `photoURL`: Profile photo URL
- `disabled`: Account disabled status
- `metadata`: Creation and last sign-in timestamps
- `providerData`: Authentication provider information

---

### Authentication Session

**Description**: Represents an active user authentication session.

**Storage**: Firebase Authentication (handled automatically by Firebase SDK)

**Key Attributes**:
- `user` (User object): Reference to authenticated User Account
- `accessToken` (string): Firebase ID token for API authentication (managed by SDK)
- `refreshToken` (string): Token for refreshing access token (managed by SDK)
- `expiresAt` (timestamp): Token expiration timestamp (managed by SDK)
- `createdAt` (timestamp): Session creation timestamp (managed by SDK)

**Relationships**:
- Belongs to one User Account (via `user.uid`)

**Validation Rules**:
- Token must be valid (checked by Firebase SDK)
- Token must not be expired (checked by Firebase SDK)
- User account must not be disabled (checked by Firebase SDK)

**State Transitions**:
```
[No Session] → [Authenticating] → [Active Session]
[Active Session] → [Refreshing] → [Active Session]
[Active Session] → [Expired] → [No Session]
[Active Session] → [Logout] → [No Session]
```

**Firebase Implementation**:
- Firebase Auth SDK automatically manages sessions
- Tokens stored in browser localStorage/sessionStorage (managed by SDK)
- `onAuthStateChanged` observer tracks session state changes
- Token refresh handled automatically by SDK

---

## Data Flow

### Registration Flow
```
User Input (email, password)
  ↓
Client Validation (email format, password strength)
  ↓
Firebase Auth: createUserWithEmailAndPassword()
  ↓
Firebase creates User Account
  ↓
Firebase returns User object with uid
  ↓
Automatic login (session created)
  ↓
User redirected to main app
```

### Login Flow
```
User Input (email, password)
  ↓
Client Validation (email format, password not empty)
  ↓
Firebase Auth: signInWithEmailAndPassword()
  ↓
Firebase validates credentials
  ↓
Firebase returns User object + tokens
  ↓
Session established (tokens stored by SDK)
  ↓
User redirected to main app
```

### Session Persistence Flow
```
Page Load / App Start
  ↓
Firebase SDK checks localStorage for tokens
  ↓
If tokens exist:
  ↓
Firebase validates token with backend
  ↓
If valid: User authenticated, session active
  ↓
If invalid/expired: User unauthenticated, redirect to login
```

### Logout Flow
```
User clicks logout
  ↓
Firebase Auth: signOut()
  ↓
Firebase clears tokens from storage
  ↓
Session destroyed
  ↓
User redirected to login page
```

---

## Firestore Collections (Future)

### users (Extended Profile Data)

**Note**: This collection is for future features. Authentication data is stored in Firebase Auth.

**Structure** (future):
```javascript
users/{uid}
  - displayName: string
  - preferences: object
  - workoutStats: object
  - createdAt: timestamp
  - updatedAt: timestamp
```

**Security Rules** (future):
- Users can read/write their own document
- No other users can access

---

## Validation Rules Summary

### Email Validation
- Format: Must match RFC 5322 email format
- Uniqueness: Enforced by Firebase Auth
- Length: Max 320 characters

### Password Validation
- Minimum length: 6 characters (Firebase default, can be customized)
- Recommended: 8+ characters with mix of letters, numbers, symbols
- Validation: Client-side for UX, server-side for security

### Session Validation
- Token validity: Checked by Firebase SDK
- Token expiration: Handled automatically by SDK
- User account status: Checked by Firebase SDK

---

## Data Migration Considerations

**Current State**: No existing data to migrate

**Future Considerations**:
- If migrating from another auth system: Import users via Firebase Admin SDK
- If adding email verification: Update existing users' `emailVerified` field
- If adding profile data: Create Firestore `users` collection for extended profiles

---

## Security Considerations

1. **Password Storage**: Handled by Firebase Auth (hashed, never stored in plain text)
2. **Token Security**: Tokens stored in browser storage (localStorage/sessionStorage), protected by HTTPS
3. **Token Refresh**: Automatic refresh by Firebase SDK before expiration
4. **Session Management**: Firebase handles session lifecycle, including expiration
5. **Error Messages**: Generic error messages to prevent user enumeration attacks
6. **Rate Limiting**: Firebase Auth includes built-in rate limiting for login/registration attempts
