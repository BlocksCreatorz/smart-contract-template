// Created contracts
const OmniaSwap = artifacts.require("OmniaSwap");
const ForceSend = artifacts.require("ForceSend");
const DAI = artifacts.require("DAI");
//Module loading
require("chai").use(require("chai-as-promised")).should();
const truffleAssert = require("truffle-assertions");
const Utils = require("./Utils.js");

contract("OmniaSwap", (accounts) => {
  let dai;
  const DAIaddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
  const oracleAddress = "0x07E4120dD7411a49e091a20FA0be33a183C35d60";

  before(async () => {
    // Load Contracts
    omniaSwap = await OmniaSwap.new(oracleAddress);
    // Instanciate DAI
    dai = await DAI.at(DAIaddress);
  });

  describe.skip("DAI minting", async () => {
    it("should send ether to the Dai contract", async () => {
      // Send 1 eth to daiAddress to have gas to mint.
      // Uses ForceSend contract, otherwise just sending
      // a normal tx will revert.
      const forceSend = await ForceSend.new();
      await forceSend.go(dai.address, { value: Utils.toWei("1") });
      let ethBalance = await Utils.getETHBalance(dai.address);
      ethBalance = parseFloat(Utils.fromWei(ethBalance));
      expect(ethBalance).to.be.gte(1);
    });

    it("transfers 10 DAI to accounts[1]", async () => {
      await truffleAssert.passes(
        dai.transfer(accounts[1], Utils.toWei("10"), { from: DAIaddress })
      );

      let DAIBalance = await Utils.getDAIBalance(accounts[1]);
      DAIBalance = parseFloat(Utils.fromWei(DAIBalance));
      expect(DAIBalance).to.be.gte(1);
    });
  });
});
