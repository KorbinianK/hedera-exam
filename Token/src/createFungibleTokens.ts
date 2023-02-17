import {
    TokenType,
    TokenCreateTransaction,
    TokenSupplyType,
} from '@hashgraph/sdk'
import { HederaUtility } from './utils/setupUtils'
import dotenv from 'dotenv'
dotenv.config()

async function createFungibleToken() {
    // Set up the client and accounts
    const hederaUtility = new HederaUtility()

    const client = hederaUtility.getClient()
    const wallets = hederaUtility.getWallets()
    const accounts = hederaUtility.getAccounts()

    // Create the token
    const tokenName = 'MyFungibleExamToken'
    const tokenSymbol = 'FNGX'

    const tokenSupply = 1000
    const tokenMaxSupply = 1000

    const tokenCreateTransaction = await new TokenCreateTransaction()
        .setTokenName(tokenName)
        .setTokenSymbol(tokenSymbol)
        .setTokenType(TokenType.FungibleCommon)
        .setTreasuryAccountId(wallets.account01.accountId)
        .setInitialSupply(tokenSupply)
        .setSupplyType(TokenSupplyType.Finite)
        .setAdminKey(wallets.account01.publicKey)
        .setSupplyKey(wallets.account01.publicKey)
        .setMaxSupply(tokenMaxSupply)
        .freezeWith(client)
        .sign(accounts.account01.privateKey)

    let tokenCreateSubmit = await tokenCreateTransaction.execute(client)

    let receipt = await tokenCreateSubmit.getReceipt(client)

    const tokenId = receipt.tokenId

    console.log(`Token created with ID: ${tokenId}`)

    process.exit(1)
}

createFungibleToken()
