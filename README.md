# LUMORA Android starter

A native React Native / Expo starter for the LUMORA entertainment app, using the brand palette and a mobile-first navigation layout.

## What is included
- Native Android-ready app shell with Home, Explore, Music, My List, and Profile tabs
- Search and genre filters
- In-session saved list
- Responsive movie cards and music rows
- Explicit placeholder messaging for unlicensed/non-playable demo catalogue entries
- Expo EAS profiles for an installable internal APK and a store-ready production build

## Important limitations
This is a starter source project, not a compiled APK. Real movie/music playback, accounts, cloud persistence, analytics, catalogue APIs, content licensing, privacy/terms, and store assets still need implementation. Demo titles are placeholders and must not be represented as licensed media. The Android package ID `com.lumora.entertainment` is a suggested default; change it if it is already taken or you have a different namespace.

## Run locally
Requires Node.js and an Expo account for cloud builds.

```bash
npm install
npx expo start
```

## Build an installable APK
Install/login to EAS CLI, then run:

```bash
npx eas-cli@latest login
npx eas-cli@latest build:configure
npx eas-cli@latest build --platform android --profile preview
```

The `preview` profile requests an APK for direct device installation. For Google Play submission, use the `production` profile, which defaults to an Android App Bundle (AAB):

```bash
npx eas-cli@latest build --platform android --profile production
```

Cloud build requires an Expo account and the project must be uploaded to EAS. Publishing on Google Play additionally requires a Google Play developer account and signed release configuration.
