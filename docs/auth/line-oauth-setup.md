# LINE OAuth Setup Guide

LINE Login supports multiple regional channels. Each region (Japan, Thailand,
Taiwan, Indonesia) requires a separate LINE Login channel configuration.

## Overview

LINE requires:

- ✅ **Separate channel per region** - JP, TH, TW, ID channels
- ✅ **Email permission approval** - Must submit screenshots showing consent
  flow
- ✅ **Channel-specific credentials** - Each channel has its own Client ID and
  Secret

## Step 1: Create LINE Developers Account

1. Go to [LINE Developers Console](https://developers.line.biz/console/)
2. Log in with your LINE account (or create one)
3. Verify your email if prompted

## Step 2: Create a Provider

1. Click **"Create a new provider"**
2. Enter **Provider name**: `Slash & Dice` (or your company/app name)
3. Click **"Create"**

## Step 3: Create LINE Login Channels

You need to create **one channel per region**. Repeat these steps for each
region you want to support:

### For Each Region (JP, TH, TW, ID):

1. Click **"Create a new channel"**
2. Select **"LINE Login"** as the channel type
3. Fill in the form:

   **Channel name**: `Slash & Dice - [Region]`
   - Example: `Slash & Dice - Japan`, `Slash & Dice - Thailand`

   **Channel description**:
   ```
   Unofficial fan community for Dungeon Slasher players. Connect with 
   other players, share strategies, and play together!
   ```

   **App types**: Check `Web app`

   **Email address**: Your contact email

   **Region**: Select the appropriate region:
   - Japan (JP)
   - Thailand (TH)
   - Taiwan (TW)
   - Indonesia (ID)

4. Click **"Create"**

## Step 4: Configure Each Channel

For **each channel** you created:

### Basic Settings

1. Go to **"Basic settings"** tab
2. Note down:
   - **Channel ID** (this is your Client ID)
   - **Channel secret** (this is your Client Secret)

### LINE Login Settings

3. Go to **"LINE Login"** tab
4. Under **Callback URL**, add these URLs:
   ```
   http://localhost:5173/api/auth/callback/line-[region]
   http://localhost:3000/api/auth/callback/line-[region]
   https://slash-and-dice.xingshuu.deno.net/api/auth/callback/line-[region]
   ```

   Replace `[region]` with: `jp`, `th`, `tw`, or `id`

   **Examples:**
   - For Japan channel: `http://localhost:5173/api/auth/callback/line-jp`
   - For Thailand channel: `http://localhost:5173/api/auth/callback/line-th`
   - For Taiwan channel: `http://localhost:5173/api/auth/callback/line-tw`
   - For Indonesia channel: `http://localhost:5173/api/auth/callback/line-id`

5. Click **"Update"**

## Step 5: Request Email Permission

⚠️ **Important**: LINE requires manual approval before you can access user
emails.

### Prepare Screenshots

Before submitting, you need screenshots showing your consent flow:

1. Go to your login page (e.g., `http://localhost:5173/en/login`)
2. Take screenshots showing:
   - **Initial state**: Consent checkbox unchecked, providers disabled
   - **Consent explanation**: The "Email Permission" section clearly visible
   - **Checkbox checked**: User consenting to email usage
   - **LINE button**: Ready to click after consent

**What LINE wants to see:**

- ✅ Clear explanation of why you need email
- ✅ User must explicitly consent (checkbox)
- ✅ Privacy policy link visible
- ✅ Terms of service link visible

### Submit Email Permission Request

For **each channel**:

1. Go to **"LINE Login"** tab
2. Scroll to **"Email address permission"** section
3. Click **"Apply"**
4. Upload your consent flow screenshots
5. In the description field, explain:
   ```
   We request email permission for:

   1. Account Recovery - Users can recover their account if they lose access
   2. Customer Support - We can provide support when users need help

   Our app requires explicit user consent before accessing email. Users must:
   - Read the email permission explanation
   - Check a consent checkbox
   - Accept our Privacy Policy and Terms of Service

   Email addresses are never shared with third parties.

   Privacy Policy: https://your-domain.com/en/privacy
   Terms of Service: https://your-domain.com/en/terms
   ```
6. Click **"Submit"**

### Approval Timeline

- **Status**: Shows "Applied" while pending
- **Review time**: 1-3 business days (sometimes faster)
- **Notification**: You'll receive email when approved/rejected

**While waiting:**

- LINE will show the email permission in the consent screen
- Users will see they're granting email access
- But `email: undefined` in your app until approved
- You can test with other providers (Google, Discord) meanwhile

## Step 6: Add to .env File

Open `app/.env` and add credentials for each channel:

```properties
# LINE OAuth - https://developers.line.biz/console/
# Format: LINE_[REGION]_CLIENT_ID and LINE_[REGION]_CLIENT_SECRET
# Note: Client ID = Channel ID, Client Secret = Channel Secret

# Japan Channel
LINE_JP_CLIENT_ID=your-channel-id-here
LINE_JP_CLIENT_SECRET=your-channel-secret-here

# Thailand Channel (optional)
LINE_TH_CLIENT_ID=your-channel-id-here
LINE_TH_CLIENT_SECRET=your-channel-secret-here

# Taiwan Channel (optional)
LINE_TW_CLIENT_ID=your-channel-id-here
LINE_TW_CLIENT_SECRET=your-channel-secret-here

# Indonesia Channel (optional)
LINE_ID_CLIENT_ID=your-channel-id-here
LINE_ID_CLIENT_SECRET=your-channel-secret-here
```

**Note**: You can configure just one region for testing, or all four for full
coverage.

## Step 7: Test the Integration

1. Restart your Deno server:
   ```bash
   deno task dev
   ```

2. Go to `http://localhost:5173/en/login`

3. You should see "Sign in with LINE" button enabled (after checking the consent
   checkbox)

4. Click it - you'll see a dropdown to select region (JP/TH/TW/ID)

5. Select a region and test the OAuth flow!

## What Data LINE Provides

**Before email approval:**

- ✅ **User ID** - Unique LINE user ID
- ✅ **Display Name** - User's LINE display name
- ✅ **Profile Picture** - User's LINE avatar
- ❌ **Email** - `undefined` (until approved)

**After email approval:**

- ✅ **Email** - User's LINE registered email
- ✅ All of the above

## Regional Differences

### Japan (JP)

- **Primary market**: Largest LINE user base
- **Language**: Japanese
- **Recommended**: Start with JP channel for testing

### Thailand (TH)

- **Market**: Very popular in Thailand
- **Language**: Thai
- **Users**: Expect Thai language support

### Taiwan (TW)

- **Market**: Popular in Taiwan
- **Language**: Traditional Chinese
- **Users**: Expect Traditional Chinese support

### Indonesia (ID)

- **Market**: Growing LINE user base
- **Language**: Indonesian
- **Users**: Expect Indonesian language support

## Troubleshooting

### Error: redirect_uri_mismatch

- Check callback URL format: `/api/auth/callback/line-[region]`
- Must match exactly (no trailing slash)
- Region code must be lowercase: `jp`, `th`, `tw`, `id`

### Error: Email permission not approved

- Status shows "Applied" → Still waiting for LINE review
- Check your email for LINE notifications
- Usually takes 1-3 business days

### Email returns undefined

- Email permission not yet approved
- Or user denied email access during LINE login
- Check Better Auth logs for details

### Channel dropdown not showing

- Make sure you have multiple LINE channels configured
- If only one channel is configured, it auto-selects
- Check that env vars are properly set

## Production Deployment

When deploying to production:

1. For **each channel**, go to **LINE Login** tab
2. Add production callback URL:
   ```
   https://your-production-domain.com/api/auth/callback/line-[region]
   ```
3. Click **"Update"**
4. Update `.env` in production with the same credentials
5. If email permission was approved for dev, it works in production too!

## Multi-Channel Strategy

### Recommended Approach:

**Start with Japan (JP):**

- Largest user base
- Good for initial testing
- Request email permission approval

**Add other regions later:**

- Based on your user demographics
- Each region requires separate email approval
- Can add/remove regions anytime

**Or cover all regions:**

- Set up all 4 channels from the start
- Request email approval for each
- Users can choose their region at login

## LINE OAuth Advantages

✅ **Huge Asian market** - 200M+ active users\
✅ **Mobile-first** - Users very familiar with LINE Login\
✅ **Regional targeting** - Serve specific markets\
✅ **Rich profiles** - LINE users often have detailed profiles\
✅ **Free to use** - No costs for OAuth authentication

## Important Notes

1. **Email approval is per channel** - If you have 4 channels, you need 4
   approvals
2. **Keep consent clear** - LINE reviewers are strict about consent flow
3. **Use correct callback format** - `line-jp`, `line-th`, etc. (not just
   `line`)
4. **Channel secrets are sensitive** - Never commit to git or share publicly

## Next Steps After Approval

Once email permission is approved:

- ✅ Users can sign in with LINE
- ✅ Email is automatically provided
- ✅ Full user profile available
- ✅ Same experience as Google/Discord OAuth

Good luck with your LINE integration! 🎌
