// Created contracts
const OmniaSwap = artifacts.require("OmniaSwap");
const ForceSend = artifacts.require("ForceSend");
// // To import ABI
// const DAI = require("../src/abis/Dai.json");
//Module loading
require("chai").use(require("chai-as-promised")).should();
const truffleAssert = require("truffle-assertions");
const Utils = require("./Utils.js");

contract("OmniaSwap", (accounts) => {
  let DAIContract;
  const DAIaddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
  const oracleAddress = "0x07E4120dD7411a49e091a20FA0be33a183C35d60";

  before(async () => {
    // Load Contracts
    omniaSwap = await OmniaSwap.new(oracleAddress);
    DAIContract = new web3.eth.Contract(DAI.abi, DAIaddress);
    // var receipt = web3.eth.getTransactionReceipt(trHash);
  });

  describe.skip("DAI minting", async () => {
    it("should send ether to the Dai contract", async () => {
      // Send 1 eth to daiAddress to have gas to mint.
      // Uses ForceSend contract, otherwise just sending
      // a normal tx will revert.
      const forceSend = await ForceSend.new();
      await forceSend.go(DAIaddress, { value: Utils.toWei("1") });
      const ethBalance = await Utils.getETHBalance(DAIaddress);
      assert.notEqual(Utils.fromWei(ethBalance), "0");
    });

    it("transfers 10 DAI to accounts[1]", async () => {
      await DAIContract.methods
        .transfer(accounts[1], Utils.toWei("10"))
        .send({ from: DAIaddress });

      const DAIBalance = await Utils.getDAIBalance(accounts[1]);
      assert.notEqual(Utils.fromWei(DAIBalance), "0");
    });
  });
});
