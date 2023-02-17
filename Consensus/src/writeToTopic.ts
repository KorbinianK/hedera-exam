import {
    TopicCreateTransaction,
    TopicMessageSubmitTransaction,
} from '@hashgraph/sdk'
import { HederaUtility } from './utils/setupUtils'
import dotenv from 'dotenv'
dotenv.config()

async function writeDate() {
    // Set up the client and accounts
    const hederaUtility = new HederaUtility()

    const client = hederaUtility.getClient()
    const accounts = hederaUtility.getAccounts()

    let transaction = await new TopicMessageSubmitTransaction({
        topicId: process.env.TOPIC_ID,
        message: Date.now().toString(),
    })
        .freezeWith(client)
        .sign(accounts.account01.privateKey)

    let txResponse = await transaction.execute(client)

    //Get the receipt of the transaction
    let receipt = await txResponse.getReceipt(client)

    //Get the status of the transaction
    const transactionStatus = receipt.status
    console.log('The message transaction status ' + transactionStatus)
    process.exit(1)
}

writeDate()
