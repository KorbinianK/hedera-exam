import { ContractId, ContractDeleteTransaction } from '@hashgraph/sdk'
import { HederaUtility } from './utils/setupUtils'
import dotenv from 'dotenv'
dotenv.config()

const deleteContract = async () => {
    const hederaUtility = new HederaUtility()

    const client = hederaUtility.getClient()
    const accounts = hederaUtility.getAccounts()

    const contractId = ContractId.fromString(process.env.CONTRACT_ID)
    console.log('The smart contract ID is ' + contractId)

    const transaction = new ContractDeleteTransaction()
        .setContractId(contractId)
        .setTransferAccountId(accounts.account01.accountId)
        .freezeWith(client)

    //Sign with the admin key on the contract
    const signTx = await transaction.sign(accounts.account01.privateKey)

    //Sign the transaction with the client operator's private key and submit to a Hedera network
    const txResponse = await signTx.execute(client)

    //Get the receipt of the transaction
    const receipt = await txResponse.getReceipt(client)

    //Get the transaction consensus status
    const transactionStatus = receipt.status

    console.log('The transaction consensus status is ' + transactionStatus)

    process.exit()
}

deleteContract()
