const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const MyToken = await ethers.getContractFactory("MyToken");

  // Initial token supply (example: 1,000,000 tokens)
  const initialSupply = ethers.utils.parseUnits("1000000", 18);

  // Deploy the contract (pass constructor arguments)
  const myToken = await MyToken.deploy(initialSupply);

  // Wait for deployment to complete
  await myToken.deployed();

  console.log("MyToken deployed to:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
