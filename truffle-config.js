require("dotenv").config();
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
    development: {
      host: "ganache", // this is the trick to get truffle container working with gnache one!
      port: 8545,
      network_id: "*",
    },
    kovan: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: process.env.SEED,
          },
          providerOrUrl: process.env.KOVAN,
          addressIndex: 0,
          //// Using Ledger path
          //// 4 is the index of 0x....81C6 => CreateLinX: Deployer 1
          // derivationPath: "m/44'/60'/4'/0/0",
          shareNonce: true,
        }),
      network_id: 42,
      gas: 5000000,
      gasPrice: 25000000000,
      skipDryRun: true,
      production: true,
    },
  },
  compilers: {
    solc: {
      // To avoid running out of gas: https://github.com/trufflesuite/truffle/issues/1308
      version: "0.8.3",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
