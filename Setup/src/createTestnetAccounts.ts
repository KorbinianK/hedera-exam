import {
    Client,
    PrivateKey,
    AccountCreateTransaction,
    Hbar,
} from '@hashgraph/sdk'
import fs from 'fs'
import { HederaUtility } from './utils/setupUtils'

async function createTestnetAccounts() {
    const hederaUtility = new HederaUtility()

    const myAccountId = hederaUtility.getAccounts().myAccount.accountId
    const myPrivateKey = hederaUtility.getAccounts().myAccount.privateKey

    // Initialize the client with the testnet network
    const client = Client.forTestnet()
    client.setOperator(myAccountId, myPrivateKey)

    // Define account names
    const accountNames = [
        'Account1',
        'Account2',
        'Account3',
        'Account4',
        'Account5',
    ]

    // Create accounts using a for loop
    for (let i = 0; i < accountNames.length; i++) {
        // Generate a new private key
        const privateKey = PrivateKey.generate()

        // Get the public key from the private key
        const publicKey = privateKey.publicKey

        // Create an account creation transaction
        const transaction = await new AccountCreateTransaction()
            .setKey(publicKey)
            .setInitialBalance(Hbar.fromTinybars(1000))
            .setAccountMemo('Testnet account: ' + accountNames[i])
            .execute(client)

        // Get the new account ID
        const receipt = await transaction.getReceipt(client)
        const accountId = receipt.accountId

        console.log(`${accountNames[i]}: ${accountId}`)

        // Write the private and public keys to a text file
        const privateKeyAsString = privateKey.toString()
        const publicKeyAsString = publicKey.toString()
        const accountKeys = `${accountNames[i]}:\nAccountId: ${accountId}\nPrivate Key: ${privateKeyAsString}\nPublic Key: ${publicKeyAsString}\n\n`

        fs.appendFileSync('account-keys.txt', accountKeys)
    }
    process.exit(1)
}

createTestnetAccounts()
