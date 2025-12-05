# Discord OAuth Setup Guide

## Step 1: Create Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"**
3. Enter application name: **"Slash & Dice"** (or your preferred name)
4. Accept the Terms of Service
5. Click **"Create"**

## Step 2: Configure Application Settings

### General Information

1. In the left sidebar, go to **General Information**
2. Upload an **App Icon** (optional but recommended)
3. Add a **Description**:
   ```
   Slash & Dice - Unofficial fan community for Dungeon Slasher players. 
   Connect, share strategies, and play together!
   ```
4. Add **Tags**: `gaming`, `community`, `dungeon-slasher`
5. **Save Changes**

### OAuth2 Settings

6. In the left sidebar, go to **OAuth2** → **General**
7. Under **Redirects**, click **"Add Redirect"**
8. Add these redirect URIs (one at a time):
   ```
   http://localhost:5173/api/auth/callback/discord
   http://localhost:3000/api/auth/callback/discord
   https://slash-and-dice.xingshuu.deno.net/api/auth/callback/discord
   ```
9. Click **"Save Changes"**

## Step 3: Copy Credentials

1. Stay on the **OAuth2** → **General** page
2. You'll see:
   - **Client ID**: Copy this (it's visible)
   - **Client Secret**: Click **"Reset Secret"** → Copy the new secret

   ⚠️ **Important**: Save the Client Secret immediately! You won't be able to
   see it again.

## Step 4: Configure Bot Settings (Optional)

If you plan to add Discord bot features later:

1. Go to **Bot** in the left sidebar
2. Click **"Add Bot"** → **"Yes, do it!"**
3. Configure bot settings (username, icon, etc.)
4. **For now, you can skip this** - OAuth login doesn't need a bot

## Step 5: Add to .env File

Open `app/.env` and add:

```properties
# Discord OAuth - https://discord.com/developers/applications
DISCORD_CLIENT_ID=your-client-id-here
DISCORD_CLIENT_SECRET=your-client-secret-here
```

## Step 6: Test the Integration

1. Restart your Deno server:
   ```bash
   deno task dev
   ```

2. Go to `http://localhost:5173/en/login`

3. You should see "Sign in with Discord" button enabled (after checking the
   consent checkbox)

4. Click it and test the OAuth flow!

## What Data Discord Provides

Discord automatically provides:

- ✅ **Email** - User's verified email address (no approval needed!)
- ✅ **Username** - Discord username
- ✅ **Avatar** - User's profile picture
- ✅ **ID** - Unique Discord user ID

## Scopes Used by Better Auth

Better Auth automatically requests these scopes:

- `identify` - Basic account info (username, avatar, ID)
- `email` - User's email address

**Note**: These are standard scopes and don't require special approval.

## Troubleshooting

### Error: redirect_uri_mismatch

- Make sure the redirect URI in Discord Developer Portal exactly matches:
  `http://localhost:5173/api/auth/callback/discord`
- No trailing slashes
- Correct protocol (http vs https)

### Error: Invalid OAuth2 redirect_uri

- Check that you added the redirect URI and clicked "Save Changes"
- Wait a few seconds after saving (Discord needs to propagate changes)

### Email not received

- Discord automatically provides email (no approval needed!)
- Make sure the user's Discord email is verified
- Check Better Auth logs for the user data

## Production Deployment

When deploying to production:

1. Go to **OAuth2** → **General**
2. Add production callback URL to **Redirects**:
   ```
   https://your-production-domain.com/api/auth/callback/discord
   ```
3. Click **"Save Changes"**
4. Update `.env` in production with the same credentials (Client ID and Secret)

## Security Best Practices

### Public Bot vs Private Application

**For authentication only (your use case):**

- Keep **"Public Bot"** disabled if you added a bot
- Your app stays private but users can still OAuth login

**If you want others to add your bot to their servers:**

- Enable **"Public Bot"**
- Configure bot permissions carefully

### Rate Limits

Discord OAuth has generous rate limits:

- 50 requests per second per application
- You won't hit this with normal user logins

## Discord OAuth Advantages

✅ **No approval needed** - Email scope works immediately\
✅ **Gaming audience** - Perfect for game-related communities\
✅ **Rich profiles** - Users often have gaming-themed avatars\
✅ **Fast authentication** - Discord users are familiar with OAuth\
✅ **Future features** - Easy to add Discord bot integration later

## Optional: Add Discord Rich Presence (Future)

If you want to add "Playing Slash & Dice" status to Discord:

1. Go to **Rich Presence** → **Art Assets**
2. Upload game logos/icons
3. Use Discord RPC in your app (separate integration)

For now, OAuth login is all you need! 🎮
