import React from "react";
import ReactDOM from 'react-dom/client'
import "@mantine/core/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, MantineProvider } from "@mantine/core";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import BuyerDashboard from "./pages/BuyerDashboard";
import Header from "./components/Header";
import EventList from "./components/EventList";
import AddEvent from "./components/AddEvent";
import EventDetail from "./components/EventDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ContactPage from "./pages/contactPage";
import Shop from "./pages/shop/Shop";
import ShopDetailPage from "./pages/shop/shopDetail";
import CartPage from "./pages/shop/Cart";
import App from "./App";
import "./index.css";
import 'flowbite';
import ArtistRoutes from "./pages/artistDashboard/ArtistRoutes";
import '@mantine/core/styles.css';
// ‼️ import carousel styles after core package styles
import '@mantine/carousel/styles.css';

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
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/artwork/:id" element={<ShopDetailPage />} />
            <Route path="/cart" element={<CartPage />} />


            {/* Artist dashboard */}
            <Route path="/artists/*" element={<ArtistRoutes />} />

            {/* <Route
            path="/artists/add-artwork"
            element={
              <ProtectedRoute allowedRoles={["Artist"]}>
                <AddArtwork />
              </ProtectedRoute>
            }
          ></Route> */}

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
