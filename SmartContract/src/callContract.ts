import {
    ContractId,
    ContractFunctionParameters,
    ContractExecuteTransaction,
} from '@hashgraph/sdk'
import { HederaUtility } from './utils/setupUtils'
import dotenv from 'dotenv'
dotenv.config()

const callContract = async () => {
    const hederaUtility = new HederaUtility()

    const client = hederaUtility.getClient()

    const contractId = ContractId.fromString(process.env.CONTRACT_ID)
    console.log('The smart contract ID is ' + contractId)

    //Create the transaction to update the contract message
    const contractExecTx = await new ContractExecuteTransaction()
        //Set the ID of the contract
        .setContractId(contractId)
        //Set the gas for the contract call
        .setGas(100000)
        //Set the contract function to call
        .setFunction(
            'function1',
            new ContractFunctionParameters().addUint16(5).addUint16(6)
        )

    //Submit the transaction to a Hedera network and store the response
    const submitExecTx = await contractExecTx.execute(client)

    //Get the receipt of the transaction
    const receipt = await submitExecTx.getReceipt(client)

    //Confirm the transaction was executed successfully
    console.log('The transaction status is ' + receipt.status.toString())

    // a record contains the output of the function
    const record = await submitExecTx.getRecord(client)

    console.log(
        'The function output is ' + record.contractFunctionResult?.getUint160()
    )

    process.exit()
}

callContract()
