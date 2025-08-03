import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateBot from './pages/CreateBot';
import BotPreview from './pages/BotPreview';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup';
import Chat from './pages/Chat';

// inside your <Routes>



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-bot" element={<CreateBot />} />
        <Route path="/bot-preview" element={<BotPreview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;