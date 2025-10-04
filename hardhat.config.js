require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("ts-node/register");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.28",
  networks: {
    moonbase: {
      url: "https://rpc.api.moonbase.moonbeam.network", // RPC para Moonbase Alpha (testnet EVM de Polkadot/Paseo)
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1287,
    },
  },
  etherscan: {
    apiKey: {
      moonbase: process.env.MOONSCAN_API_KEY || "", // Para verificación en Moonscan
    },
    customChains: [
      {
        network: "moonbase",
        chainId: 1287,
        urls: {
          apiURL: "https://api-moonbase.moonscan.io/api",
          browserURL: "https://moonbase.moonscan.io/",
        },
      },
    ],
  },
};
