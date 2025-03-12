# React Native Drawer Navigation Test

A simple React Native project with drawer navigation and stack navigation setup.

## Features

- Drawer Navigation
- Stack Navigation
- Custom Drawer Content
- Multiple Screens
- TypeScript Support

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. For iOS, install CocoaPods:

```bash
cd ios && pod install && cd ..
```

## Running the App

### iOS

```bash
npx react-native run-ios
```

### Android

```bash
npx react-native run-android
```

## Project Structure

```
src/
├── components/
│   └── CustomDrawerContent.tsx
├── navigation/
│   ├── DrawerNavigator.tsx
│   ├── StackNavigator.tsx
│   ├── SettingsStackNavigator.tsx
│   └── index.ts
└── screens/
    ├── HomeScreen.tsx
    ├── DetailsScreen.tsx
    └── SettingsScreen.tsx
```

## Dependencies

- React Navigation
- React Native Gesture Handler
- React Native Reanimated
- React Native Safe Area Context
- React Native Screens

## Notes

This project was created for testing drawer navigation in React Native.
