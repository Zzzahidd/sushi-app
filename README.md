# 🍣 Sushi Delivery App

A full-stack Sushi food ordering and delivery application built with **React Native (Expo)** on the frontend and **Node.js, Express & MongoDB** on the backend.

---

## 📁 Project Structure

```
Sushi/
├── backend/               # Express.js REST API, Socket.io, & MongoDB
│   ├── config/            # DB, Stripe, Nodemailer, Swagger, Firebase configs
│   ├── controllers/       # API controllers (Auth, Cart, Orders, Products, Stripe, etc.)
│   ├── middleware/        # JWT Authentication, Role-based Admin checks, Uploads
│   ├── models/            # Mongoose Schemas (User, Order, Product, Cart, Address, etc.)
│   ├── routes/            # Express route modules
│   ├── socket/            # Real-time tracking and chat socket handlers
│   ├── utils/             # Helper utilities (Token generation, etc.)
│   ├── server.js          # Entry point for backend
│   └── .env.example       # Template for backend environment variables
│
├── SushiFoodApp/          # Expo React Native Frontend App
│   ├── app/               # Expo Router file-based screens (Auth, Tabs, Checkout, Tracking)
│   ├── assets/            # Sushi images, category icons, splash & app icons
│   ├── components/        # Reusable UI components (Home, Menu, Cart, Tracking, Review)
│   ├── constants/         # Static datasets & theme constants
│   ├── data/              # Mock data & catalog items
│   ├── app.json           # Expo project configuration
│   └── .env.example       # Template for frontend environment variables
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or newer)
- **npm** or **yarn**
- **Expo Go** app on your physical mobile device (or Android/iOS emulator)
- **MongoDB** database instance (MongoDB Atlas or local)

---

### 2. Backend Setup

1. Open a terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Configure your `.env` variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   STRIPE_SECRET_KEY=your_stripe_secret_key
   EMAIL=your_email@gmail.com
   EMAIL_PASSWORD=your_gmail_app_password
   ```

5. Start the backend server:
   ```bash
   node server.js
   # Or with auto-reload:
   npx nodemon server.js
   ```

- 🚀 API Running at: `http://localhost:5000`
- 📘 Swagger Documentation: `http://localhost:5000/api-docs`

---

### 3. Frontend Setup (SushiFoodApp)

1. Open a new terminal and navigate to `SushiFoodApp/`:
   ```bash
   cd SushiFoodApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Configure `EXPO_PUBLIC_API_URL` in `.env`:
   - **iOS Simulator / Web**: `http://localhost:5000/api`
   - **Android Emulator**: `http://10.0.2.2:5000/api`
   - **Physical Phone (Expo Go)**: `http://<YOUR_COMPUTER_IP>:5000/api`

5. Start the Expo development server:
   ```bash
   npm start
   ```

6. Press `a` for Android, `i` for iOS, `w` for Web, or scan the QR code with **Expo Go**.

---

## 🛠️ Tech Stack

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose ODM**
- **JWT (JSON Web Tokens) & Bcrypt**
- **Stripe API** for payment processing
- **Socket.io** for real-time live order tracking
- **Nodemailer** for email & OTP verification
- **Swagger UI** for interactive API documentation
- **Winston & Morgan** for structured logging

### Frontend
- **React Native 0.81 & React 19**
- **Expo SDK 54** with **Expo Router v6** (File-based routing)
- **TypeScript**
- **React Native Reanimated & Gesture Handler**
- **React Hook Form & Zod**

---

## 🔒 Security Note
All sensitive environment variables (`.env`, `google-services.json`, `firebase-key.json`) are automatically ignored by `.gitignore` to prevent secret leaks to version control.
