import { ScheduleDeleteTransaction } from '@hashgraph/sdk'
import { HederaUtility } from './utils/setupUtils'
import dotenv from 'dotenv'
dotenv.config()

async function deleteScheduledTransaction() {
    // Set up the client and accounts
    const hederaUtility = new HederaUtility()

    const client = hederaUtility.getClient()
    const accounts = hederaUtility.getAccounts()

    const transaction = await new ScheduleDeleteTransaction()
        .setScheduleId(process.env.SCHEDULE_ID)
        .freezeWith(client)
        .sign(accounts.myAccount.privateKey)

    //Sign with the operator key and submit to a Hedera network
    const txResponse = await transaction.execute(client)

    //Get the receipt of the transaction
    const receipt = await txResponse.getReceipt(client)

    //Get the schedule ID
    const scheduleId = receipt.scheduleId
    console.log('The schedule ID is ' + scheduleId)

    //Get the scheduled transaction ID
    const scheduledTxId = receipt.scheduledTransactionId
    console.log('The scheduled transaction ID is ' + scheduledTxId)

    process.exit(1)
}

deleteScheduledTransaction()
