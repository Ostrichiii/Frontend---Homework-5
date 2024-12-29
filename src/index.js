import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import { UserProvider } from './components/UserContext';
import { ThemeProvider } from "./components/ThemeContext";
import { LanguageProvider } from "./components/LanguageContext"; // Nový import

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <LanguageProvider> {/* Přidaný LanguageProvider */}
      <UserProvider>
        <App />
      </UserProvider>
    </LanguageProvider>
  </ThemeProvider>
);