const { deployProxy } = require("@openzeppelin/truffle-upgrades");

const V1 = artifacts.require("V1");

module.exports = async function (deployer, network, accounts) {
  const instance = await deployProxy(V1, { deployer });
  console.log("Deployed", instance.address);
};
