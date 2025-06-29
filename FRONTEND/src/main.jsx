import React from "react";
import ReactDOM from 'react-dom/client'
import "@mantine/core/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./assets/Components/ProtectedRoute";
import ArtistDashboard from "./pages/ArtistDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ContactPage from "./pages/contactPage";
import App from "./App";
import "./index.css";
import 'flowbite';

// Add external scripts
const chatwayScript = document.createElement('script');
chatwayScript.id = 'chatway';
chatwayScript.async = true;
chatwayScript.src = 'https://cdn.chatway.app/widget.js?id=D5aa7Fe1PaOY';
document.head.appendChild(chatwayScript);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <MantineProvider>
        
        <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<App />}>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Artist dashboard */}
            <Route
            path="/artist"
            element={
              <ProtectedRoute allowedRoles={["Artist"]}>
                <ArtistDashboard />
              </ProtectedRoute>
            }
          >
          
          </Route>

          {/* Buyer Account */}
          <Route
            path="/buyer"
            element={
              <ProtectedRoute allowedRoles={["Buyer"]}>
                <BuyerDashboard />
              </ProtectedRoute>
            }
          ></Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </AuthProvider>
  </React.StrictMode>
);
