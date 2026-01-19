# Firebase Setup Instructions

## Environment Variables

Create a `.env` file in the root directory with the following content:

```env
VITE_FIREBASE_API_KEY=AIzaSyDnjWHhM1FVx5YhjZxsdco6wt-aD6VlBRs
VITE_FIREBASE_AUTH_DOMAIN=fitness-app-c4ce5.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fitness-app-c4ce5
VITE_FIREBASE_STORAGE_BUCKET=fitness-app-c4ce5.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=345263492453
VITE_FIREBASE_APP_ID=1:345263492453:web:5b4b5a772affb09b3be58c
```

**Important**: The `.env` file is already in `.gitignore` and will not be committed to version control.

## Firebase Authentication Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **Fitness app** (fitness-app-c4ce5)
3. Navigate to **Authentication** → **Sign-in method**

4. Enable **Email/Password** provider:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

5. Enable **Google** provider:
   - Click on "Google"
   - Toggle "Enable" to ON
   - Enter a project support email (your email address)
   - Click "Save"

## Testing the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173` (or the port shown in terminal)

3. Test registration:
   - Go to `/register`
   - Create a new account with email and password
   - You should be automatically logged in and redirected to the dashboard

4. Test login:
   - Logout from the dashboard
   - Go to `/login`
   - Log in with your credentials
   - You should be redirected to the dashboard

5. Test Google sign-in:
   - Go to `/login` or `/register`
   - Click "Continue with Google" button
   - Sign in with your Google account
   - You should be automatically logged in and redirected to the dashboard

6. Test protected routes:
   - Logout
   - Try to access any route (you'll be redirected to `/login`)
   - Log in again (email/password or Google) to access protected routes

## Troubleshooting

- **Firebase errors**: Make sure Email/Password and Google authentication are enabled in Firebase Console
- **Google sign-in popup blocked**: Make sure your browser allows popups for the site
- **Environment variables not loading**: Restart the dev server after creating `.env` file
- **CORS errors**: Check that your Firebase project settings are correct
- **Google sign-in not working**: Verify Google provider is enabled and project support email is set
