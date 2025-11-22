import React, { useState } from "react";
import { ethers } from "ethers";

export default function TokenForm({ contract, account, darkMode }) {
  const [recipient, setRecipient] = useState("");     // for transfer
  const [transferAmount, setTransferAmount] = useState(""); // Amount for Transfer

  const [spender, setSpender] = useState("");         // for approve
  const [approveAmount, setApproveAmount] = useState("");   // Amount for Approve

  const [to, setTo] = useState("");                   // TransferFrom recipient
  const [transferFromAmount, setTransferFromAmount] = useState(""); // Amount for TransferFrom

  const [status, setStatus] = useState("");

  // -------------------
  // Transfer
  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!contract) return setStatus("Contract not loaded.");

    try {
      setStatus("Processing transfer...");
      const decimals = await contract.decimals();
      const parsedAmount = ethers.parseUnits(transferAmount, decimals);

      const tx = await contract.transfer(recipient, parsedAmount);
      await tx.wait();

      setStatus("Transfer completed!");
      setRecipient("");
      setTransferAmount("");
    } catch (err) {
      console.error(err);
      setStatus("Transfer failed: " + err.message);
    }
  };

  // -------------------
  // Approve
  const handleApprove = async (e) => {
    e.preventDefault();
    if (!contract) return setStatus("Contract not loaded.");

    try {
      setStatus("Processing approval...");
      const decimals = await contract.decimals();
      const parsedAmount = ethers.parseUnits(approveAmount, decimals);

      const tx = await contract.approve(spender, parsedAmount);
      await tx.wait();

      setStatus("Approval completed!");
      setApproveAmount("");
    } catch (err) {
      console.error(err);
      setStatus("Approval failed: " + err.message);
    }
  };

  // -------------------
  // TransferFrom
  const handleTransferFrom = async (e) => {
    e.preventDefault();
    if (!contract) return setStatus("Contract not loaded.");
    if (!account) return setStatus("No connected address detected.");

    try {
      setStatus("Executing TransferFrom...");
      const decimals = await contract.decimals();
      const parsedAmount = ethers.parseUnits(transferFromAmount, decimals);

      const tx = await contract.transferFrom(account, to, parsedAmount);
      await tx.wait();

      setStatus("TransferFrom successful!");
      setTo("");
      setTransferFromAmount("");
      setSpender("");
    } catch (err) {
      console.error(err);
      setStatus("TransferFrom failed: " + err.message);
    }
  };

  return (
    <form
      className={`mt-6 p-6 rounded-2xl shadow-sm border w-full ${
        darkMode
          ? "bg-gray-700 border-gray-600 text-gray-100"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      {/* Send Tokens */}
      <h2 className="text-lg font-semibold mb-4">Send Tokens</h2>
      <label className="block mb-3">
        <span className="text-sm">Recipient</span>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="0xRecipient..."
          className={`mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-white focus:ring-indigo-500"
              : "bg-gray-50 border-gray-300 text-gray-700 focus:ring-indigo-500"
          }`}
        />
      </label>
      <label className="block mb-4">
        <span className="text-sm">Amount (MTK)</span>
        <input
          type="text"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          placeholder="10"
          className={`mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-white focus:ring-indigo-500"
              : "bg-gray-50 border-gray-300 text-gray-700 focus:ring-indigo-500"
          }`}
        />
      </label>
      <button
        onClick={handleTransfer}
        className="w-full py-2 bg-blue-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition mb-6"
      >
        Send Tokens
      </button>

      {/* Approve */}
      <h2 className="text-lg font-semibold mb-4">Approve</h2>
      <label className="block mb-3">
        <span className="text-sm">Spender Address</span>
        <input
          type="text"
          value={spender}
          onChange={(e) => setSpender(e.target.value)}
          placeholder="0xSpender..."
          className={`mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-white focus:ring-indigo-500"
              : "bg-gray-50 border-gray-300 text-gray-700 focus:ring-indigo-500"
          }`}
        />
      </label>
      <label className="block mb-3">
        <span className="text-sm">Amount (MTK)</span>
        <input
          type="text"
          value={approveAmount}
          onChange={(e) => setApproveAmount(e.target.value)}
          placeholder="10"
          className={`mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-white focus:ring-indigo-500"
              : "bg-gray-50 border-gray-300 text-gray-700 focus:ring-indigo-500"
          }`}
        />
      </label>
      <button
        onClick={handleApprove}
        className="w-full py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition mb-6"
      >
        Approve
      </button>

      {/* TransferFrom */}
      <h2 className="text-lg font-semibold mb-4">TransferFrom</h2>
      <label className="block mb-3">
        <span className="text-sm">Sender Address (from)</span>
        <input
          type="text"
          value={account || ""}
          readOnly
          className={`mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-800 text-gray-100 border-gray-600 focus:ring-indigo-500"
              : "bg-white text-gray-900 border-gray-300 focus:ring-indigo-500"
          }`}
        />
      </label>
      <label className="block mb-3">
        <span className="text-sm">Recipient Address (to)</span>
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="0xTo..."
          className={`mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-white focus:ring-indigo-500"
              : "bg-gray-50 border-gray-300 text-gray-700 focus:ring-indigo-500"
          }`}
        />
      </label>
      <label className="block mb-3">
        <span className="text-sm">Amount (MTK)</span>
        <input
          type="text"
          value={transferFromAmount}
          onChange={(e) => setTransferFromAmount(e.target.value)}
          placeholder="10"
          className={`mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-white focus:ring-indigo-500"
              : "bg-gray-50 border-gray-300 text-gray-700 focus:ring-indigo-500"
          }`}
        />
      </label>
      <button
        onClick={handleTransferFrom}
        className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition mb-4"
      >
        TransferFrom
      </button>

      {status && (
        <p className={`mt-3 text-sm break-words ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          {status}
        </p>
      )}
    </form>
  );
}
