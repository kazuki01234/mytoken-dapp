import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import stakingAbi from "../contracts/Staking.json";
import tokenAbi from "../contracts/MyToken.json";

const STAKING_ADDRESS = import.meta.env.VITE_STAKING_ADDRESS;

export default function Staking({ provider, account, tokenAddress }) {
  const [staking, setStaking] = useState(null);
  const [token, setToken] = useState(null);
  const [staked, setStaked] = useState("0");
  const [earned, setEarned] = useState("0");
  const [amount, setAmount] = useState("");

  // Initialize contracts
  useEffect(() => {
    if (!provider || !account) return;

    (async () => {
      const signer = await provider.getSigner();
      const stakingContract = new ethers.Contract(
        STAKING_ADDRESS,
        stakingAbi.abi,
        signer
      );
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi.abi, signer);

      setStaking(stakingContract);
      setToken(tokenContract);
    })();
  }, [provider, account, tokenAddress]);

  // Refresh staking balances and rewards
  const refresh = useCallback(async () => {
    if (!staking || !account) return;

    const stakedValue = await staking.balances(account);
    const earnedValue = await staking.earned(account);

    setStaked(ethers.formatEther(stakedValue));
    setEarned(ethers.formatEther(earnedValue));
  }, [staking, account]);

  // Refresh on initial load or when staking/account changes
  useEffect(() => {
    if (staking && account) {
      (async () => {
        await refresh();
      })();
    }
  }, [staking, account, refresh]);

  // Deposit tokens
  const deposit = async () => {
    if (!staking || !token) return;
    const wei = ethers.parseEther(amount);

    const tx1 = await token.approve(STAKING_ADDRESS, wei);
    await tx1.wait();

    const tx2 = await staking.deposit(wei);
    await tx2.wait();

    refresh();
  };

  // Withdraw tokens
  const withdraw = async () => {
    if (!staking) return;
    const wei = ethers.parseEther(amount);
    const tx = await staking.withdraw(wei);
    await tx.wait();

    refresh();
  };

  // Claim rewards
  const claim = async () => {
    if (!staking) return;
    const tx = await staking.claimReward();
    await tx.wait();

    refresh();
  };

  return (
    <div className="p-6 bg-gray-700 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Staking DApp</h2>

        {!account && <p className="text-white mb-4">Connect Wallet</p>}

        {account && staking && token && (
        <>
            <p className="text-gray-300 mb-2">Connected: {account}</p>

            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Your Staking Info</h3>
            <p className="text-gray-200">Staked: {staked} MTK</p>
            <p className="text-gray-200 mb-4">Earned: {earned} MTK</p>

            <input
            type="text"
            placeholder="Amount (MTK)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-4 p-2 rounded-md bg-gray-600 text-white placeholder-gray-300"
            />

            <div className="flex space-x-2">
            <button
                onClick={deposit}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
            >
                Deposit
            </button>
            <button
                onClick={withdraw}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-semibold"
            >
                Withdraw
            </button>
            <button
                onClick={claim}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold"
            >
                Claim Reward
            </button>
            </div>
        </>
        )}
    </div>
  );
}
