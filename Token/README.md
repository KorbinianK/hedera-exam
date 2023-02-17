## Run the script

Execute `npm run create:token:fungible` to create a fungible token
Execute `npm run do:token:atomicSwap` to do the atomic swap

Token ID must be in .env

## Result

### Create

```bash
npm run create:token:fungible

> hedera-account@1.0.0 create:token:fungible
> ts-node src/createFungibleTokens.ts

Token created with ID: 0.0.3503944
```

### Swap

```bash
❯ npm run do:token:atomicSwap

> hedera-account@1.0.0 do:token:atomicSwap
> ts-node src/atomicSwap.ts

- Token association with the users account: SUCCESS

[...]
ReceiptStatusError: receipt for transaction 0.0.14092@1676648254.463052035 contained error status INSUFFICIENT_ACCOUNT_BALANCE
```

Sadly I ran out of time to put enough Hbar on the accounts, but the script should work
