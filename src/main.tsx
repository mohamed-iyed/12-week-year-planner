import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// pages
import App from "./pages/Home";
import Journey from "./pages/Journey";
// css
import "./index.css";
// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/journeys/:id" element={<Journey />} />
        <Route
          path="*"
          element={
            <main className="w-screen h-screen flex items-center justify-center bg-black">
              <h1 className="text-red-400 text-6xl">Page Not Found</h1>
            </main>
          }
        />
      </Routes>
    </Router>
  </ContextProvider>
);
