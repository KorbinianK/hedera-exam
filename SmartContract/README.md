## Run the scripts

Execute `npx hardhat compile` once to compile the contract

Execute `npm run do:contract:deploy` to deploy the contract
Execute `npm run do:contract:call` to call the contract
Execute `npm run do:contract:delete` to delete the contract

Contract ID must be in .env

## Result

### Deploy

```bash
❯ npm run do:contract:deploy

> hedera-account@1.0.0 do:contract:deploy
> ts-node src/deployToHedera.ts

The smart contract byte code file ID is 0.0.3504359
The smart contract ID is 0.0.3504360
```

### Call

```bash
❯ npm run do:contract:call

> hedera-account@1.0.0 do:contract:call
> ts-node src/callContract.ts

The smart contract ID is 0.0.3506863
The transaction status is SUCCESS
The function output is 30
```

### Delete

```bash
❯ npm run do:contract:delete

> hedera-account@1.0.0 do:contract:delete
> ts-node src/deleteContract.ts

The smart contract ID is 0.0.3506863
The transaction consensus status is 22

```
