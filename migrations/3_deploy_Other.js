const Main = artifacts.require("Main");
const Other = artifacts.require("Other");

module.exports = async function (deployer, network, accounts) {
  Main.deployed().then(async (main) => {
    return deployer.deploy(
      Other,
      main.address
    );
  });
};
