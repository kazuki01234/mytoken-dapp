require("dotenv").config();
const { ethers } = require("hardhat");

// Deployed contract address
const tokenAddress = process.env.TOKEN_ADDRESS;
// Recipient address
const recipient = process.env.RECIPIENT_ADDRESS;

async function main() {
    // Connect to Hardhat provider
    const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_URL);

    // Create wallet
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // Create contract instance
    const abi = [
        "function balanceOf(address) view returns (uint256)",
        "function transfer(address to, uint amount) returns (bool)"
    ];
    const token = new ethers.Contract(tokenAddress, abi, wallet);

    // Check own balance
    const myBalance = await token.balanceOf(wallet.address);
    console.log("My balance:", ethers.utils.formatUnits(myBalance, 18));

    // Test transfer (example: send 0.01 token)
    const tx = await token.transfer(recipient, ethers.utils.parseUnits("0.01", 18));
    console.log("Transaction sent:", tx.hash);

    // Wait for transaction to be mined
    await tx.wait();
    console.log("Transfer completed!");
}

main().catch((err) => {
    console.error(err);
});
