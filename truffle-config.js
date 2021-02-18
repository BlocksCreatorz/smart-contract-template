module.exports = {
  contracts_directory: "./src/contracts",
  migrations_directory: "./migrations",
  contracts_build_directory: "./src/abis",
  networks: {
    dev: {
      host: "ganache", // this is the trick to get truffle container working with gnache one!
      port: 8545,
      network_id: "*",
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
