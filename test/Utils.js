// Utils
function toWei(n) {
  return web3.utils.toWei(n.toString(), "ether");
}
function fromWei(n) {
  return web3.utils.fromWei(n.toString());
}
async function getDAIBalance(account) {
  return DAIContract.methods.balanceOf(account).call();
}
async function getETHBalance(account) {
  return web3.eth.getBalance(account);
}

module.exports = {
  toWei: toWei,
  fromWei: fromWei,
  getDAIBalance: getDAIBalance,
  getETHBalance: getETHBalance,
};
