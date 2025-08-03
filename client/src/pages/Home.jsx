import React from 'react';
import './Home.css'; // Import external CSS for styling
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="home-title">Welcome to AI Chatbot Builder</h1>
        <p className="home-subtitle">
          Create your own personalized chatbot with custom behavior, tone, and personality — no coding required!
        </p>
        <div className="cta-buttons">
          {/* <Link to ="./Login" className="cta-button primary">Get Started</Link> */}
          <Link to="./login" className="cta-button primary">Get Started</Link>
          <Link to="./SignUp" className="cta-button primary">Try Demo</Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🤖 No Coding Required</h3>
            <p>Build sophisticated chatbots using our intuitive drag-and-drop interface</p>
          </div>
          <div className="feature-card">
            <h3>🎨 Custom Personality</h3>
            <p>Define your bot's tone, style, and behavior to match your brand perfectly</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Deploy Instantly</h3>
            <p>Launch your chatbot on websites, social media, or messaging platforms in minutes</p>
          </div>
          <div className="feature-card">
            <h3>📊 Analytics Dashboard</h3>
            <p>Track conversations, user satisfaction, and bot performance in real-time</p>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Design Your Bot</h3>
            <p>Choose personality, responses, and conversation flows</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Train & Test</h3>
            <p>Upload knowledge base and test conversations</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Deploy & Monitor</h3>
            <p>Launch on your platform and track performance</p>
          </div>
        </div>
      </div>

      <div className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            <p>"Built a customer service bot in 30 minutes. Game changer!"</p>
            <span>- Sarah M., E-commerce</span>
          </div>
          <div className="testimonial">
            <p>"The analytics helped us improve customer satisfaction by 40%"</p>
            <span>- Mike T., SaaS Company</span>
          </div>
        </div>
      </div>

      <div className="final-cta">
        <h2>Ready to Build Your AI Assistant?</h2>
        <p>Join thousands of businesses already using our platform</p>
        {/* <a href="/create-bot" className="cta-button primary large">Build Your Bot Now</a> */}
        <Link to="./create-bot" className="cta-button primary large">Build Your Bot Now</Link>
      </div>
    </div>
  );
};

export default Home;
