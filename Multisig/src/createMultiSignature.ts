import { AccountCreateTransaction, Hbar, KeyList } from '@hashgraph/sdk'
import { HederaUtility } from './utils/setupUtils'
import dotenv from 'dotenv'
dotenv.config()

async function createMultiSig() {
    // Set up the client and accounts
    const hederaUtility = new HederaUtility()

    const client = hederaUtility.getClient()
    const accounts = hederaUtility.getAccounts()
    const wallets = hederaUtility.getWallets()

    const keyList = new KeyList(
        [
            wallets.account01.publicKey,
            wallets.account02.publicKey,
            wallets.account03.publicKey,
        ],
        2 // Threshold of 2
    )

    const transaction = await new AccountCreateTransaction()
        .setKey(keyList)
        .setInitialBalance(new Hbar(20))
        .execute(client)

    //Request the receipt of the transaction
    const receipt = await transaction.getReceipt(client)

    //Get the account ID
    const accountId = receipt.accountId

    console.log('Multisig account ID: ' + accountId?.toString())
    process.exit(1)
}

createMultiSig()
