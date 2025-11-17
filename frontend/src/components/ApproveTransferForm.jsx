import React, { useState } from "react";
import { ethers } from "ethers";

export default function ApproveTransferForm({ contract, darkMode }) {
  const [spender, setSpender] = useState("");
  const [from, setFrom] = useState(""); // transferFrom sender
  const [to, setTo] = useState("");     // transferFrom recipient
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  // 承認処理
  const handleApprove = async (e) => {
    e.preventDefault();
    if (!contract) return setStatus("Contract not loaded.");

    try {
      setStatus("承認中...");
      const decimals = await contract.decimals();
      const parsedAmount = ethers.parseUnits(amount, decimals);

      const tx = await contract.approve(spender, parsedAmount);
      await tx.wait();

      setStatus("承認完了！");
    } catch (err) {
      console.error(err);
      setStatus("承認失敗: " + err.message);
    }
  };

  // transferFrom 処理
  const handleTransferFrom = async (e) => {
    e.preventDefault();
    if (!contract) return setStatus("Contract not loaded.");

    try {
      setStatus("TransferFrom 実行中...");
      const decimals = await contract.decimals();
      const parsedAmount = ethers.parseUnits(amount, decimals);

      const tx = await contract.transferFrom(from, to, parsedAmount);
      await tx.wait();

      setStatus("TransferFrom 成功！");
      setAmount("");
      setFrom("");
      setTo("");
      setSpender("");
    } catch (err) {
      console.error(err);
      setStatus("TransferFrom 失敗: " + err.message);
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
      <h2 className="text-lg font-semibold mb-4">
        Approve & TransferFrom
      </h2>

      {/* approve 用 spender */}
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

      {/* transferFrom sender */}
      <label className="block mb-3">
        <span className="text-sm">Sender Address (from)</span>
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="0xFrom..."
          className={`mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-white focus:ring-indigo-500"
              : "bg-gray-50 border-gray-300 text-gray-700 focus:ring-indigo-500"
          }`}
        />
      </label>

      {/* transferFrom recipient */}
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

      {/* amount */}
      <label className="block mb-4">
        <span className="text-sm">Amount (MTK)</span>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="10"
          className={`mt-1 w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-white focus:ring-indigo-500"
              : "bg-gray-50 border-gray-300 text-gray-700 focus:ring-indigo-500"
          }`}
        />
      </label>

      {/* 承認ボタン */}
      <button
        onClick={handleApprove}
        className="w-full py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition mb-2"
      >
        Approve
      </button>

      {/* transferFrom ボタン */}
      <button
        onClick={handleTransferFrom}
        className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition"
      >
        TransferFrom
      </button>

      {/* 状態表示 */}
      {status && (
        <p className={`mt-3 text-sm break-words ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          {status}
        </p>
      )}
    </form>
  );
}
