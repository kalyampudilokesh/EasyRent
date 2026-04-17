// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // Or './index.css' if you prefer global styles here
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Assuming this context exists
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* AuthProvider wraps the entire application to provide authentication context */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);