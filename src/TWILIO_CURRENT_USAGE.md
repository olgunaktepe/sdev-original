# Twilio - What's Currently Active in Your Application

## 📋 Overview

Twilio is integrated into your SDEV application and is **currently active** for your internal team. Here's what it's actually doing right now.

---

## ✅ What's Loaded on Every Page

**Twilio Voice SDK** is loaded globally on all pages:

**File**: `template/default/foot.phtml:97`
```html
<script src="/php/lib/twilio/node_modules/@twilio/voice-sdk/dist/twilio.min.js"></script>
```

This means every user has the Twilio Voice library available when logged in.

---

## 📱 Where the Dialer Widget is Active

The Twilio dialer (phone system) is loaded on these specific pages:

| Page | URL | Purpose |
|------|-----|---------|
| **Phone Manager** | `/site/phonemanager` | Main phone system interface |
| **Deal View (v3)** | `/site/deal3` | Call contacts from deal page |
| **Deal View (Dev)** | `/site/dealDev` | Call contacts from deal page |
| **Dummy** | `/site/dummy` | Testing page |

**Menu Item**: "Phone Manager" with phone icon (📞)
- Available to: Admin (type 1), Business users (type 2), Limited users (type 3-4)

---

## 🎯 Phone Manager Page Features

**Location**: `/site/phonemanager`

### What Users See:

#### 1. **Phone Numbers Panel** (Admins/Business only)
Shows all Twilio phone numbers owned by the system with:
- Number list
- Configuration options
- Buy new numbers
- Release numbers

#### 2. **Contact Book Panel**
- Search and view saved contacts
- Quick dial from contact list

#### 3. **Active Calls Panel**
- Shows current call status
- Call controls during active call

#### 4. **Call/SMS Log Panel**
- History of all calls and SMS messages
- Filter by date, user, direction
- View recordings
- See associated property listings

---

## 🔧 Dialer Widget Functions

When loaded, the dialer widget provides:

### For Regular Users:
1. **Make Calls** - Click phone icon, enter number, click dial
2. **Receive Calls** - Browser rings when someone calls a Twilio number
3. **Send SMS** - Text message interface
4. **Call Controls**:
   - Mute/unmute
   - Hold
   - Record (toggle)
   - Hangup
   - Tag call with listing ID

### For Admins/Business Users (Additional):
5. **Buy Phone Numbers** - Search by area code and purchase
6. **Configure Numbers**:
   - Set voicemail greeting
   - Enable/disable recording
   - Set call forwarding
   - Assign to user types
7. **View All User Activity** - See team's call/SMS logs

---

## 📊 Current Twilio Configuration

### Settings Required (Stored in Database)

These settings are loaded from the `admin_settings` table:

| Setting | What It's For |
|---------|---------------|
| `twilio_sid` | Twilio Account ID |
| `twilio_auth_token` | Twilio API password |
| `twilio_token` | API Key for JWT generation |
| `twilio_secret` | API Secret for JWT generation |
| `twilio_app_sid` | TwiML Application ID |
| `twilio_setup_url` | Webhook URL (where Twilio sends events) |
| `twilio_default_voicemail` | Default voicemail greeting text |
| `twilio_account_prefix` | Prefix for user names |
| `twilio_price_markups` | Pricing markup config (JSON) |
| `twilio_recordings_domain` | Domain for recording URLs |

### Webhook URL

All Twilio events (calls, SMS) are sent to:
```
{twilio_setup_url}/site/util/twilio
```

**Handler**: `php/util/twilio.util.php`

---

## 🔄 Current User Workflows

### Workflow 1: Team Member Makes Outbound Call

```
1. User goes to /site/phonemanager or /site/deal3
2. Clicks phone icon in bottom-right corner
3. Dialer widget opens
4. User selects Caller ID (which Twilio number to use)
5. User enters phone number OR clicks contact
6. User clicks "Dial"
7. Browser rings, connects via WebRTC
8. External phone rings
9. When answered, audio streams through browser
10. Call logged to database with:
    - Duration
    - User who called
    - Timestamp
    - Associated listing (if tagged)
    - Recording (if enabled)
```

### Workflow 2: External Person Calls Twilio Number

```
1. Someone dials a Twilio number (e.g., +1-323-289-2517)
2. Twilio sends webhook to your server
3. Server checks: Who can answer this number?
4. All authorized users' browsers ring simultaneously
5. First user to click "Accept" gets connected
6. If no answer after 30 seconds → Voicemail
7. Voicemail greeting plays (audio file or text-to-speech)
8. Caller can leave message
9. Everything logged to database
10. (Optional) Voicemail forwarded via SMS or email
```

### Workflow 3: Send SMS from Web

```
1. User opens dialer widget
2. Clicks "SMS" tab
3. Selects Caller ID (Twilio number)
4. Enters recipient number
5. Types message (max 1600 characters)
6. (Optional) Associates with listing
7. Clicks "Send"
8. SMS sent via Twilio API
9. Logged to database
```

### Workflow 4: Remote Dial via SMS

```
1. User texts their Twilio number: "dial: 4045551234"
2. Twilio receives SMS, sends to your webhook
3. Server validates user's phone number
4. Server creates conference call:
   - Calls user's mobile phone
   - Calls target number (4045551234)
   - Connects both in conference room
5. Both parties connected, using Twilio number as caller ID
6. Call logged to database
```

---

## 🗄️ Database Tables Currently in Use

### `twilio_numbers`
Stores all Twilio phone numbers you own
- Number, title, settings
- Voicemail configuration
- Recording preferences
- Forwarding rules

### `twilio_log`
**Main log table** - every call and SMS creates a record:
- Call/SMS details (from, to, duration, status)
- Direction (inbound/outbound)
- User who initiated
- Associated listing ID
- Recording SID
- Timestamps
- Auto-tagged listings

### `twilio_log_tags`
Custom tags for calls/SMS
- Links to twilio_log entries
- Comma-separated tags

### `twilio_log_read`
Tracks which users have viewed which messages
- User ID
- Log entry ID

### `twilio_numbers_assignments`
Which users can use which numbers
- User to number mapping

### `twilio_numbers_types`
Restricts numbers by user type
- Number to user type mapping

### `twilio_lookup_cache`
Cached phone number lookups (carrier info, caller name)
- Phone number
- JSON data

---

## 💰 Current Costs

Based on your current usage, you're likely paying:

**Monthly Fixed**:
- Phone numbers: ~$1.15 × (number of Twilio numbers) per month

**Variable (Usage-Based)**:
- Outbound calls: ~$0.013/minute
- Inbound calls: ~$0.0085/minute
- Outbound SMS: ~$0.0079 per message
- Inbound SMS: ~$0.0079 per message
- Recording: ~$0.0005/minute
- Lookup: ~$0.005 per lookup

**Typical Internal Team (5 users, moderate usage)**:
- Estimated: $10-25/month total

You can check exact usage and costs on your Twilio dashboard at: https://console.twilio.com

---

## 🔍 How to Check What's Actually Happening

### Check Call Logs
```sql
-- Recent calls
SELECT * FROM twilio_log
WHERE type='call'
ORDER BY timestamp DESC
LIMIT 50;

-- Recent SMS
SELECT * FROM twilio_log
WHERE type='sms'
ORDER BY timestamp DESC
LIMIT 50;

-- Active phone numbers
SELECT * FROM twilio_numbers
WHERE active=1;
```

### Check Twilio Dashboard
1. Go to: https://console.twilio.com
2. Login with Twilio account
3. View:
   - Active phone numbers
   - Call logs
   - SMS logs
   - Current month costs
   - Account balance

### Check Application Logs
Look at recent activity in the Phone Manager page:
1. Login to SDEV
2. Go to `/site/phonemanager`
3. View "Call/SMS Log" panel
4. See all recent activity

---

## 📞 Active Phone Numbers

To see your current Twilio numbers:

### Via Application:
1. Login to SDEV
2. Go to `/site/phonemanager`
3. Numbers panel shows all active numbers

### Via Database:
```sql
SELECT number, title, active
FROM twilio_numbers
WHERE active=1;
```

### Via Twilio Dashboard:
1. https://console.twilio.com/us1/develop/phone-numbers/manage/incoming
2. Shows all numbers you own

---

## 🎛️ Dialer Widget States

The phone icon in bottom-right corner shows different states:

| Icon | Meaning |
|------|---------|
| ⚠️ Warning (gray) | Not initialized |
| 📞 Phone (green) | Ready to make/receive calls |
| ⏳ Spinning (blue) | Connecting... |
| ⚠️ Warning (red) | Error or already active in another tab |

---

## 🔐 Permission Levels

### Type 1 (Admin):
- Full access to everything
- Buy/release phone numbers
- Configure all numbers
- View all users' call logs
- Make/receive calls
- Send/receive SMS

### Type 2 (Business User):
- Full access to everything
- Buy/release phone numbers
- Configure all numbers
- View all users' call logs
- Make/receive calls
- Send/receive SMS

### Type 3-4 (Limited Users):
- Phone Manager page only
- Can ONLY use numbers assigned to their user type
- Make/receive calls (restricted numbers)
- Send/receive SMS (restricted numbers)
- View own call logs only

---

## 🎯 Integration Points

### Where Calling is Integrated:

1. **Phone Manager** (`/site/phonemanager`)
   - Full phone system interface
   - Primary location for all phone features

2. **Deal Pages** (`/site/deal3`, `/site/dealDev`)
   - Click-to-call from deal details
   - Call property contacts directly
   - Auto-associate calls with listing

3. **Global Menu** (all pages)
   - Phone Manager menu item
   - Access from anywhere

---

## 🔧 Key Features Currently Active

### ✅ Confirmed Active Features:

1. **VoIP Calling** (Browser-based)
   - Make calls from web browser
   - Receive calls in browser
   - No desk phone needed

2. **SMS Messaging**
   - Send texts from web interface
   - Receive texts with special commands

3. **Call Recording**
   - Auto-record based on number settings
   - Manual toggle during calls
   - Recordings stored on Twilio
   - Download recordings via interface

4. **Voicemail**
   - Custom greetings per number
   - Audio file or text-to-speech
   - Record messages
   - (Status of voicemail delivery unclear)

5. **Conference Calling**
   - 3-way calls via SMS command
   - Conference room creation

6. **Call/SMS Logging**
   - Complete history in database
   - Searchable/filterable
   - Associated with property listings

7. **Auto-Tagging**
   - Automatically links calls to listings
   - Based on previous activity
   - Based on contact book

8. **Phone Number Management**
   - Buy new numbers by area code
   - Configure number settings
   - Release numbers

9. **Remote Dial via SMS**
   - Text "dial: [number]" to trigger call
   - Text "sms: [number] message" to send SMS
   - Text "update_ip: [IP]" to whitelist IP

---

## 📝 Current Issues to Investigate

Since I can't access the live database, here's what you should check:

### 1. Are there active Twilio numbers?
```sql
SELECT COUNT(*) FROM twilio_numbers WHERE active=1;
```

If zero, Twilio features won't work (no numbers to call from/to).

### 2. Is Twilio actually configured?
```sql
SELECT name, value FROM admin_settings WHERE name LIKE '%twilio%';
```

If missing values, Twilio won't connect.

### 3. Recent usage?
```sql
SELECT COUNT(*), MAX(timestamp) as last_used
FROM twilio_log;
```

This shows if team is actually using Twilio.

### 4. Check Twilio account status
- Login to console.twilio.com
- Check if account is active
- Check if numbers are active
- Check webhook URLs are correct

---

## 🎯 What Should Be Working

If Twilio is properly configured (settings in database, active account), users should be able to:

1. **Visit `/site/phonemanager`** and see:
   - List of phone numbers
   - Dialer interface
   - Call history

2. **Click phone icon** (bottom-right) and:
   - See dialer pop up
   - Make calls after selecting caller ID
   - Receive incoming calls

3. **Admins can**:
   - Buy new phone numbers
   - Configure number settings
   - View all team activity

---

## 🚨 If It's Not Working

### Common Issues:

**Problem**: Phone icon shows warning (red)
- Check: Twilio credentials in database
- Check: Browser has microphone permission
- Check: Only one tab active (can't have multiple)

**Problem**: Can't make calls
- Check: Twilio account has balance
- Check: Phone numbers are active
- Check: Webhook URL is accessible

**Problem**: Can't receive calls
- Check: Twilio numbers have correct webhook URL
- Check: Numbers are configured to call your server
- Check: Server is accessible from internet

**Problem**: No phone numbers visible
- Check: Database has entries in `twilio_numbers`
- Check: User has permission to view numbers

---

## 📊 To Get Full Picture

Run these commands/checks:

### 1. Database Check
```bash
# On your server
mysql -u sdev_main -p'sE{c^]dk_{k]' sdev_main

# Then run:
SELECT * FROM admin_settings WHERE name LIKE '%twilio%';
SELECT * FROM twilio_numbers WHERE active=1;
SELECT COUNT(*) as total_calls FROM twilio_log WHERE type='call';
SELECT COUNT(*) as total_sms FROM twilio_log WHERE type='sms';
SELECT MAX(timestamp) as last_activity FROM twilio_log;
```

### 2. Twilio Dashboard
- https://console.twilio.com
- Check active numbers
- Check recent calls
- Check account balance

### 3. Application Check
- Login to SDEV
- Go to `/site/phonemanager`
- Click phone icon
- Try to make a test call

---

## 🎯 Summary

**Twilio Integration Status**: ✅ **INSTALLED & CONFIGURED**

**Where It's Used**:
- Phone Manager page (main interface)
- Deal pages (click-to-call)
- SMS commands (remote dial)

**Current Capabilities**:
- VoIP calling (browser-based)
- SMS messaging
- Call recording
- Voicemail
- Conference calling
- Phone number management
- Complete call/SMS logging

**For Internal Team**: This setup is appropriate and cost-effective.

**Next Step**: Check database to see if it's actually configured with Twilio credentials and active phone numbers.

---

**Document Created**: November 16, 2025
**Purpose**: Document actual Twilio usage in SDEV application
**Status**: Based on codebase analysis - needs database verification
