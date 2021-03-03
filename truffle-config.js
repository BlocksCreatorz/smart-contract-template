const dotenv = require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  contracts_directory: "./src/contracts",
  migrations_directory: "./migrations",
  contracts_build_directory: "./src/abis",
  // Config for verification: truffle run verify BEP20Token@{contract-address} --network bsc_testnet
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    bscscan: process.env.BSC_SCAN_KEY,
    etherscan: process.env.ETHER_SCAN_KEY,
  },
  networks: {
    dev: {
      host: "ganache", // this is the trick to get truffle container working with gnache one!
      port: 8545,
      network_id: "*",
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider({
          mnemonic: {
            phrase: process.env.SEED,
          },
          provider: process.env.FORKED_URL,
          addressIndex: 0,
        });
      },
      network_id: 42,
      gas: 5000000,
      gasPrice: 25000000000,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      // To avoid running out of gas: https://github.com/trufflesuite/truffle/issues/1308
      version: "^0.8.0",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
