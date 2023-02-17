import {
    TransferTransaction,
    Hbar,
    TokenAssociateTransaction,
} from '@hashgraph/sdk'
import { HederaUtility } from './utils/setupUtils'
import dotenv from 'dotenv'
dotenv.config()

const createAtomicSwap = async () => {
    // Set up the client and accounts
    const hederaUtility = new HederaUtility()

    const client = hederaUtility.getClient()
    const wallets = hederaUtility.getWallets()
    const accounts = hederaUtility.getAccounts()

    const tokenId = process.env.TOKEN_ID

    let associateOtherWalletTx = await new TokenAssociateTransaction()
        .setAccountId(accounts.account01.accountId)
        .setTokenIds([tokenId])
        .freezeWith(client)
        .sign(accounts.account01.privateKey)

    //SUBMIT THE TRANSACTION
    let associateOtherWalletTxSubmit = await associateOtherWalletTx.execute(
        client
    )

    //GET THE RECEIPT OF THE TRANSACTION
    let associateOtherWalletRx = await associateOtherWalletTxSubmit.getReceipt(
        client
    )

    //LOG THE TRANSACTION STATUS
    console.log(
        `- Token association with the users account: ${associateOtherWalletRx.status} \n`
    )

    const atomicSwap = await new TransferTransaction()
        .addHbarTransfer(accounts.account01.accountId, new Hbar(-10))
        .addHbarTransfer(accounts.account02.accountId, new Hbar(10))
        .addTokenTransfer(tokenId, accounts.account02.accountId, -150)
        .addTokenTransfer(tokenId, accounts.account01.accountId, 150)
        .freezeWith(client)

    //Sign the transaction with accountId1 and accountId2 private keys, submit the transaction to a Hedera network
    const txId = await (
        await (
            await atomicSwap.sign(accounts.account01.privateKey)
        ).sign(accounts.account02.privateKey)
    ).execute(client)

    let receipt = await txId.getReceipt(client)

    console.log(receipt)
}

createAtomicSwap()
