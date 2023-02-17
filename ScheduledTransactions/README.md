## Scripts

Execute `npm run do:schedule` to schedule a transaction
Execute `npm run do:unschedule` to delete the scheduled transaction

Scheduled ID must be in .env

## Results

```bash

npm run do:schedule

> hedera-account@1.0.0 do:schedule
> ts-node src/createScheduledTransaction.ts

The schedule ID is 0.0.3505516
The scheduled transaction ID is 0.0.14092@1676641471.490869585?scheduled
```
