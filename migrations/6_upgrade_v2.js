const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");

const V2 = artifacts.require("V2");
const V3 = artifacts.require("V3");

module.exports = async function (deployer, network, accounts) {
  const instance = await V2.deployed().then(async (v2) => {
    return upgradeProxy(v2.address, V3, { deployer });
  });

  console.log("Upgraded", instance.address);
};
