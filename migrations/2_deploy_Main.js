const Main = artifacts.require("Main");

module.exports = async function (deployer, network, accounts) {
  return deployer.deploy(Main);
};
