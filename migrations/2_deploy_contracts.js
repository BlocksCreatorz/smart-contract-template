const DIACoingeckoOracle = artifacts.require("DIACoingeckoOracle");
const ForceSend = artifacts.require("ForceSend");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(DIACoingeckoOracle);
  const oracle = await DIACoingeckoOracle.deployed();

  // To force ETH sending to DAI contract
  await deployer.deploy(ForceSend);
};
