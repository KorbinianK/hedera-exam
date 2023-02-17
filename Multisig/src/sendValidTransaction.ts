import { TransferTransaction, Hbar, AccountId } from '@hashgraph/sdk'
import { HederaUtility } from './utils/setupUtils'
import dotenv from 'dotenv'
dotenv.config()

async function sendValidTransaction() {
    // Set up the client and accounts
    const hederaUtility = new HederaUtility()

    const client = hederaUtility.getClient()
    const accounts = hederaUtility.getAccounts()
    const wallets = hederaUtility.getWallets()

    const amount = Hbar.fromTinybars(100000000) // 10 hbars

    const nodeId = []
    nodeId.push(new AccountId(3))

    const transferTransaction = new TransferTransaction()
        .addHbarTransfer(process.env.MULTI_SIG, amount.negated())
        .addHbarTransfer(accounts.account04.accountId, amount)
        .setNodeAccountIds(nodeId)
        .freezeWith(client)

    // Sign the transaction
    transferTransaction.sign(accounts.account01.privateKey)
    transferTransaction.sign(accounts.account02.privateKey)

    // Execute the transaction and get the receipt
    const transactionResponse = await transferTransaction.execute(client)
    const receipt = await transactionResponse.getReceipt(client)

    // Log the receipt status
    console.log(`Transaction Status: ${receipt.status.toString()}`)
    process.exit(1)
}

sendValidTransaction()
