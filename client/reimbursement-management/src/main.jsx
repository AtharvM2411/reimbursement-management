import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { Toaster } from "react-hot-toast";

import "./globals.css";

import App from "./App.jsx";

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <>
      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 3500,

          style: {
            background: "#111318",
            color: "#ffffff",
            border:
              "1px solid rgba(255,255,255,0.08)",

            borderRadius: "18px",

            padding: "14px 16px",

            boxShadow:
              "0 10px 40px rgba(0,0,0,0.35)",
          },

          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ffffff",
            },
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </>
  </StrictMode>
);