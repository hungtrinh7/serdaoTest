# Transactions Management App

A React Native application for managing transactions, tracking balances, and saving data locally using AsyncStorage.

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js (version 14 or higher)
- npm or Yarn
- React Native CLI or Expo CLI (depending on your setup)

## Installation

Follow the steps below to install and run the project locally:

1. **Clone the Repository**:

   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install Dependencies**:
   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Run the Application**:
   For iOS (requires macOS):

   ```bash
   npx react-native run-ios
   ```

   For Android:

   ```bash
   npx react-native run-android
   ```

4. **Start the Metro Bundler** (if not already running):
   ```bash
   npx react-native start
   ```

## Usage

- Add transactions specifying an amount and a beneficiary.
- Automatically updates and saves the balance and transaction history.
- Data is persisted locally using AsyncStorage.

## Commands Overview

| Command                         | Description                                |
| ------------------------------- | ------------------------------------------ |
| `npm install` or `yarn install` | Install all project dependencies.          |
| `npx react-native run-ios`      | Run the app on an iOS simulator.           |
| `npx react-native run-android`  | Run the app on an Android emulator/device. |
| `npx react-native start`        | Start the Metro Bundler for the project.   |
