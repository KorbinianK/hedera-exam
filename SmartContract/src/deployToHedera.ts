import {
    ContractCreateFlow,
    PrivateKey,
    AccountBalanceQuery,
} from '@hashgraph/sdk'
import { HederaUtility } from './utils/setupUtils'
import dotenv from 'dotenv'
dotenv.config()

const deployToHedera = async () => {
    // Set up the client and accounts
    const hederaUtility = new HederaUtility()

    const client = hederaUtility.getClient()

    const wallets = hederaUtility.getWallets()
    const accounts = hederaUtility.getAccounts()

    let contract = require('../artifacts/contracts/certificationC3.sol/CertificationC1.json')
    const bytecode = contract.bytecode

    // Create the transaction
    const contractCreate = new ContractCreateFlow()
        .setGas(100000)
        // .setAdminKey(
        //     PrivateKey.fromString(process.env.PRIVATE_KEY_01).publicKey
        // )
        .setAdminKey(wallets.account01.publicKey)
        .setBytecode(bytecode)
        .sign(accounts.account01.privateKey)

    // Sign the transaction with the client operator key and submit to a Hedera network
    const txResponse = contractCreate.execute(client)

    // Get the receipt of the transaction
    const receipt = (await txResponse).getReceipt(client)

    // Get the new contract ID
    const newContractId = (await receipt).contractId

    //Log the smart contract ID
    console.log('The smart contract ID is ' + newContractId)

    process.exit(1)
}

deployToHedera()
