import React from "react";
import ReactDOM from 'react-dom/client'
import "@mantine/core/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, MantineProvider } from "@mantine/core";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import ArtistDashboard from "./pages/artistDashboard/ArtistDashboard";
import AddArtwork from "./pages/artistDashboard/AddArtwork";
import BuyerDashboard from "./pages/BuyerDashboard";
import Header from "./components/Header";
import EventList from "./components/EventList";
import AddEvent from "./components/AddEvent";
import EventDetail from "./components/EventDetail";
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

const theme = createTheme({

    colors: {
      'amber': ['#D97706'],
    }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Artist dashboard */}
            <Route
            path="/artists"
            element={
              <ProtectedRoute allowedRoles={["Artist"]}>
                <ArtistDashboard />
              </ProtectedRoute>
            }
          ></Route>
            <Route
            path="/artists/add-artwork"
            element={
              <ProtectedRoute allowedRoles={["Artist"]}>
                <AddArtwork />
              </ProtectedRoute>
            }
          ></Route>

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
