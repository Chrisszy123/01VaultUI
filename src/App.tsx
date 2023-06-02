import React, { useState } from "react";
import { WalletContext } from "./context/WalletContext";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Profile from "./pages/Profile";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isActive, setIsActive] = useState(false);
  return (
    <WalletContext.Provider
      value={{ walletAddress, setWalletAddress, isActive, setIsActive }}
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </WalletContext.Provider>
  );
}

export default App;
