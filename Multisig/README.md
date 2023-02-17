## Scripts

Execute `npm run create:multisig` to create the multi sig wallet
Execute `npm run send:multisig:fail` to try a transaction with only one signature
Execute `npm run send:multisig:success` to try a transaction with two signatures

## Result

### Create

```bash
❯ npm run create:multisig

> hedera-account@1.0.0 create:multisig
> ts-node src/createMultiSignature.ts

Multisig account ID: 0.0.3506931

```

### Invalid Transaction

```bash
❯ npm run send:multisig:fail

> hedera-account@1.0.0 send:multisig:fail
> ts-node src/sendInvalidTransaction.ts#
[...]
ReceiptStatusError: receipt for transaction 0.0.14092@1676646531.261189659 contained error status INVALID_SIGNATURE
```

### Valid Transaction

```bash
❯ npm run send:multisig:success

> hedera-account@1.0.0 send:multisig:success
> ts-node src/sendValidTransaction.ts

Transaction Status: SUCCESS

```
