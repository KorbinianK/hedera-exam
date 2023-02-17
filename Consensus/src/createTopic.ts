import {
    TopicCreateTransaction,
    TopicMessageSubmitTransaction,
} from '@hashgraph/sdk'
import { HederaUtility } from './utils/setupUtils'
import dotenv from 'dotenv'
dotenv.config()

async function createTopic() {
    // Set up the client and accounts
    const hederaUtility = new HederaUtility()

    const client = hederaUtility.getClient()
    const accounts = hederaUtility.getAccounts()
    const wallets = hederaUtility.getWallets()

    //Create a new topic
    let transaction = await new TopicCreateTransaction()
        .setAdminKey(wallets.account01.publicKey)
        .setSubmitKey(wallets.account01.publicKey)
        .freezeWith(client)
        .sign(accounts.account01.privateKey)

    let txResponse = await transaction.execute(client)

    //Get the receipt of the transaction
    let receipt = await txResponse.getReceipt(client)

    //Grab the new topic ID from the receipt
    let topicId = receipt.topicId

    //Log the topic ID
    console.log(`Your topic ID is: ${topicId}`)

    process.exit(1)
}

createTopic()
