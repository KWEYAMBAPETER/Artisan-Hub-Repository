import React from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./assets/Components/ProtectedRoute";
import ArtistDashboard from "./pages/ArtistDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import Header from "./assets/Components/Header";
import EventList from "./assets/components/EventList";
import AddEvent from "./assets/Components/AddEvent";
import EventDetail from "./assets/Components/EventDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ContactPage from "./pages/contactPage";
import App from "./App";
import "./index.css";

// Get the root element
const container = document.getElementById("root");

// Create a root
const root = createRoot(container);

// Render the app
root.render(
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
