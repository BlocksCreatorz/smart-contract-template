const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");

const V1 = artifacts.require("V1");
const V2 = artifacts.require("V2");

module.exports = async function (deployer, network, accounts) {
  const instance = await V1.deployed().then(async (v1) => {
    return upgradeProxy(v1.address, V2, { deployer });
  });

  console.log("Upgraded", instance.address);
};
