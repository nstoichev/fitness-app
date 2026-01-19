# Quick Start: User Authentication and Access Control

**Feature**: 001-user-auth  
**Date**: 2025-01-27

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Firebase account (free tier is sufficient)
- Basic knowledge of React and JavaScript

## Setup Steps

### 1. Install Dependencies

```bash
npm install react-router-dom firebase
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### 2. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Authentication**:
   - Go to Authentication → Sign-in method
   - Enable **Email/Password** provider
4. Get Firebase configuration:
   - Go to Project Settings → General
   - Scroll to "Your apps" section
   - Click "Web" icon (`</>`)
   - Copy the Firebase configuration object

### 3. Configure Firebase

Create `src/services/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
```

**Important**: Add `src/services/firebase.js` to `.gitignore` or use environment variables for production.

### 4. Create Authentication Service

Create `src/services/authService.js`:

```javascript
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged
} from 'firebase/auth';
import { auth } from './firebase';

export const authService = {
  register: async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  logout: async () => {
    await signOut(auth);
  },

  getCurrentUser: () => {
    return auth.currentUser;
  },

  onAuthStateChanged: (callback) => {
    return firebaseOnAuthStateChanged(auth, callback);
  }
};
```

### 5. Create Authentication Context

Create `src/context/AuthContext.jsx`:

```javascript
import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### 6. Create Authentication Hook

Create `src/hooks/useAuth.js` (or use the context hook above):

```javascript
import { useAuth as useAuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';

export function useAuth() {
  const { user, loading } = useAuthContext();

  return {
    user,
    loading,
    isAuthenticated: !!user,
    register: authService.register,
    login: authService.login,
    logout: authService.logout
  };
}
```

### 7. Setup React Router

Update `src/main.jsx`:

```javascript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
```

### 8. Create Protected Route Component

Create `src/components/auth/ProtectedRoute.jsx`:

```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

### 9. Create Login Page

Create `src/pages/Login.jsx`:

```javascript
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
```

### 10. Create Register Page

Create `src/pages/Register.jsx`:

```javascript
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}
```

### 11. Update App.jsx with Routes

Update `src/App.jsx`:

```javascript
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            {/* Your protected app content here */}
            <div>Welcome! You are logged in.</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
```

## Testing

### Run Tests

```bash
npm run test
```

### Manual Testing Checklist

- [ ] Register new user with valid email/password
- [ ] Register fails with duplicate email
- [ ] Register fails with invalid email format
- [ ] Register fails with weak password
- [ ] Login with valid credentials
- [ ] Login fails with wrong password
- [ ] Login fails with non-existent email
- [ ] Logout clears session
- [ ] Protected routes redirect to login when not authenticated
- [ ] Session persists across page refresh
- [ ] Already logged-in users redirected away from login/register pages

## Next Steps

1. Add error message mapping (see `contracts/auth-service.md`)
2. Add loading states and UI improvements
3. Add responsive styling
4. Add form validation
5. Implement logout functionality in navigation
6. Add tests for components and services

## Troubleshooting

### Firebase Configuration Errors
- Verify Firebase config values are correct
- Check that Authentication is enabled in Firebase Console
- Ensure Email/Password provider is enabled

### Authentication Not Working
- Check browser console for errors
- Verify Firebase project is active
- Check network connectivity
- Verify Firebase SDK version compatibility

### Session Not Persisting
- Check browser localStorage/sessionStorage
- Verify `onAuthStateChanged` is properly set up
- Check for errors in AuthContext initialization

## Resources

- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [React Router Documentation](https://reactrouter.com/)
- [Feature Specification](./spec.md)
- [Data Model](./data-model.md)
- [Service Contract](./contracts/auth-service.md)
