import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthPage } from "./pages/auth/AuthPage";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}