This repo is made to be a base template to create a smart contracts repo (only) with Gitlab CI to run lint, format & solidity-test jobs.

The whole project is dockerized: ganache container for local blockchain & truffle containter to run your tests.
The trick to connnect ganache container to the truffle one is located in truffle-config.js:
**networks.dev.host = ganache**, allows truffle container to use ganache one (spend so much time to find this xD, thanks a lot [to](https://medium.com/@lzhou1110/the-complete-truffle-suite-on-docker-truffle-ganache-drizzle-47ab18b1ec83)).

Linter: solhint
Formatter: prettier
Husky: do actions before commit, if fails doesn't commit
Lint-staged: do actions only on modified files

## Derivation path to get right address
Using Ledger path: `m/44'/60'/4'/0/0` where `4` is the index of the wanted address. Check [this](https://github.com/ethereum/EIPs/issues/84) for more info.

## What is a proxy?

A proxy is a contract that delegates all of its calls to a second contract, named an implementation contract. A proxy can be upgraded by its admin to use a different implementation contract.
**All state and funds are held in the proxy.**

## Migration to upgrade proxy

In fact all files are needed: the one that has deployed the base contract & the new one.
upgradeProxy() manage on its own which migration to use for update.

## Using proxy in the front or in tests

- Latest implementation ABI contract MUST be use in the front and test AT **proxy.address**

```
const v1 = await V1.at(proxy.address)
v1.oldMethod()
const v2 = await V2.at(proxy.address)
v2.newMethod()
```
