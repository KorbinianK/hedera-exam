## Result

createTopic:

```bash
❯ npm run create:topic

> hedera-account@1.0.0 create:topic
> ts-node src/createTopic.ts

Your topic ID is: 0.0.3506831
```

writeToTopic:

```bash
❯ npm run write:topic

> hedera-account@1.0.0 write:topic
> ts-node src/writeToTopic.ts
The message transaction status 22
```

testWritable:

```bash
❯ npm run test:topic

> hedera-account@1.0.0 test:topic
> ts-node src/testWritable.ts
ReceiptStatusError: receipt for transaction 0.0.14092@1676644570.558517811 contained error status INVALID_SIGNATURE
```
