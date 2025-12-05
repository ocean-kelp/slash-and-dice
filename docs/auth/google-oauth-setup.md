# Google OAuth Setup Guide

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: **"Slash & Dice"** (or your preferred name)
4. Click "Create"

## Step 2: Configure OAuth Consent Screen

1. In the left sidebar, go to **APIs & Services** → **OAuth consent screen**
2. Select **External** user type → Click "Create"
3. Fill in the required fields:
   - **App name**: `Slash & Dice`
   - **User support email**: Your email
   - **App logo**: (Optional) Upload your logo
   - **App domain**:
     - Application home page: `https://your-domain.com`
     - Privacy policy: `https://your-domain.com/en/privacy`
     - Terms of service: `https://your-domain.com/en/terms`
   - **Authorized domains**: Add `your-domain.com` (without https://)
   - **Developer contact email**: Your email
4. Click "Save and Continue"

### Scopes

5. Click "Add or Remove Scopes"
6. Select these scopes:
   - `.../auth/userinfo.email` - See your primary Google Account email address
   - `.../auth/userinfo.profile` - See your personal info, including any
     personal info you've made publicly available
7. Click "Update" → "Save and Continue"

### Test Users (for development)

8. Add test users (your email and any collaborators)
9. Click "Save and Continue"
10. Review and click "Back to Dashboard"

## Step 3: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **"+ Create Credentials"** → **"OAuth client ID"**
3. Select **Application type**: **Web application**
4. Enter **Name**: `Slash & Dice Web Client`

### Authorized JavaScript origins

5. Add these origins:
   ```
   http://localhost:5173
   http://localhost:3000
   https://slash-and-dice.xingshuu.deno.net
   ```

### Authorized redirect URIs

6. Add these redirect URIs:
   ```
   http://localhost:5173/api/auth/callback/google
   http://localhost:3000/api/auth/callback/google
   https://slash-and-dice.xingshuu.deno.net/api/auth/callback/google
   ```

7. Click **"Create"**

## Step 4: Copy Credentials

You'll see a dialog with:

- **Client ID**: Copy this
- **Client Secret**: Copy this

## Step 5: Add to .env File

Open `app/.env` and add:

```properties
# Google OAuth - https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

## Step 6: Test the Integration

1. Restart your Deno server:
   ```bash
   deno task dev
   ```

2. Go to `http://localhost:5173/en/login`

3. You should see "Sign in with Google" button enabled (after checking the
   consent checkbox)

4. Click it and test the OAuth flow!

## Troubleshooting

### Error: redirect_uri_mismatch

- Make sure the redirect URI in Google Console exactly matches:
  `http://localhost:5173/api/auth/callback/google`
- No trailing slashes
- Correct protocol (http vs https)

### Error: Access blocked: This app's request is invalid

- Your OAuth consent screen is not properly configured
- Make sure you added yourself as a test user

### Email not received

- Google automatically provides email (no approval needed!)
- Check Better Auth logs for the user data

## Production Deployment

When deploying to production:

1. Add production domain to **Authorized JavaScript origins**
2. Add production callback URL to **Authorized redirect URIs**
3. Update `.env` in production with the same credentials
4. Consider publishing your OAuth consent screen (removes the "unverified app"
   warning)

## Publishing OAuth Consent Screen (Optional)

For a better user experience without "unverified app" warnings:

1. Go to **OAuth consent screen**
2. Click "Publish App"
3. Google will review (usually 1-2 weeks)
4. Once verified, users won't see scary warnings

For now, keeping it in "Testing" mode is fine for development!
