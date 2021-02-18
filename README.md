This repo is made to be a base template to create a smart contracts repo (only) with Gitlab CI to run lint, format & solidity-test jobs. 

The whole project is dockerized: ganache container for local blockchain & truffle containter to run your tests.
The trick to connnect ganache container to the truffle one is located in truffle-config.js: 
**networks.dev.host = ganache**, allows truffle container to use ganache one (spend so much time to find this xD, thanks a lot [to](https://medium.com/@lzhou1110/the-complete-truffle-suite-on-docker-truffle-ganache-drizzle-47ab18b1ec83)).

Linter: solhint
Formatter: prettier
Husky: do actions before commit, if fails doesn't commit
Lint-staged: do actions only on modified files

