import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import LoginSuccess from "./components/LoginSuccess"
import './App.css'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/success/:userId" element={<LoginSuccess />} />
    </Routes>
  </Router>
);

export default App
