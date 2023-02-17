import {
    TransferTransaction,
    Hbar,
    PrivateKey,
    ScheduleCreateTransaction,
} from '@hashgraph/sdk'
import { HederaUtility } from './utils/setupUtils'
import dotenv from 'dotenv'
dotenv.config()

async function createScheduledTransaction() {
    // Set up the client and accounts
    const hederaUtility = new HederaUtility()

    const client = hederaUtility.getClient()
    const accounts = hederaUtility.getAccounts()
    const wallets = hederaUtility.getWallets()

    //Create a transaction to schedule
    const transaction = new TransferTransaction()
        .addHbarTransfer(wallets.account01.accountId, Hbar.fromTinybars(-2))
        .addHbarTransfer(wallets.account02.accountId, Hbar.fromTinybars(2))

    //Schedule a transaction
    const scheduleTransaction = await new ScheduleCreateTransaction()
        .setScheduledTransaction(transaction)
        .setAdminKey(wallets.myAccount.publicKey)
        .freezeWith(client)
        .sign(accounts.myAccount.privateKey)

    let txResponse = await transaction.execute(client)

    //Get the receipt of the transaction
    const receipt = await txResponse.getReceipt(client)

    //Get the transaction status
    const transactionStatus = receipt.status
    console.log('The transaction consensus status is ' + transactionStatus)

    process.exit(1)
}

createScheduledTransaction()
