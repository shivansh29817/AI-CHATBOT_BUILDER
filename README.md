# 🤖 AI Chatbot Builder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-green.svg)](https://expressjs.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.0.0-orange.svg)](https://firebase.google.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.5-green.svg)](https://www.mongodb.com/)

<p align="center">
  <img src="./chatbot.svg" alt="AI Chatbot Builder Logo" width="200"/>
</p>

## 📋 Overview

AI Chatbot Builder is a powerful platform that allows users to create, customize, and deploy AI-powered chatbots without any coding knowledge. Design chatbots with unique personalities, tones, and behaviors to enhance customer engagement across websites, social media, or messaging platforms.

## ✨ Features

- 🧠 **No-Code Bot Creation** - Build sophisticated chatbots using our intuitive interface
- 🎭 **Custom Personality** - Define your bot's tone, style, and behavior to match your brand
- 🚀 **Deploy Instantly** - Launch your chatbot on various platforms in minutes
- 📊 **Analytics Dashboard** - Track conversations and bot performance in real-time
- 🔒 **Firebase Authentication** - Secure user authentication and management
- 🔌 **Gemini AI Integration** - Powered by Google's Gemini AI for intelligent responses
- 💾 **MongoDB Database** - Reliable storage for bot configurations and user data

## 🛠️ Tech Stack

### Frontend
- **React** - UI library for building interactive user interfaces
- **React Router** - Navigation and routing for single page application
- **Firebase Auth** - User authentication and management
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications for user feedback
- **TailwindCSS** - Utility-first CSS framework for styling

### Backend
- **Express** - Node.js web application framework
- **MongoDB/Mongoose** - Database and ODM for data storage
- **Firebase Admin** - Server-side Firebase authentication
- **Google Generative AI** - Integration with Gemini AI models
- **Cors** - Cross-origin resource sharing middleware
- **Dotenv** - Environment variable management

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB account
- Firebase account
- Google Generative AI API key (for Gemini)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/shivansh29817/AI-Chatbot_Builder.git
   cd AI-Chatbot_Builder
   ```

2. Install frontend dependencies
   ```bash
   cd client
   npm install
   ```

3. Install backend dependencies
   ```bash
   cd ../server
   npm install
   ```

4. Set up environment variables
   - Create `.env` file in the `client` directory
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

   - Create `.env` file in the `server` directory
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   DEFAULT_API_KEY=your_gemini_api_key
   ```

5. Set up Firebase service account
   - Place your Firebase service account key in `server/firebaseServiceAccountKey.json`

### Running the Application

1. Start the backend server
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend application
   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## 📱 Usage

1. **Create an Account** - Sign up using email or Google authentication
2. **Create a Bot** - Define your bot's name, tone, persona, and behavior
3. **Test Your Bot** - Interact with your bot in the preview mode
4. **Deploy** - Get the integration code to embed on your website
5. **Monitor** - Track conversations and performance in the dashboard

## 🔄 Workflow

1. User creates an account and logs in
2. User creates a new chatbot with custom settings
3. The bot configuration is saved to MongoDB
4. When users interact with the deployed bot, queries are processed through Gemini AI
5. Responses are generated based on the bot's configured personality and tone

## 🌐 Deployment

The application is configured for deployment on Vercel:

- Frontend: Deployed as a static site
- Backend: Deployed as a serverless function

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Shivansh Mishra - [@shivansh](https://github.com/shivansh29817) - shivansh29817@gmail.com

Project Link: [https://github.com/shivansh29817/AI-Chatbot_Builder](https://github.com/shivansh29817/AI-Chatbot_Builder)

---

<p align="center">Made with ❤️ by Shivansh Mishra</p>
