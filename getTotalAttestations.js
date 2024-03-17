// Using base main net to fetch total attestation data on Nouns DAO for winners 

import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { QuickNodeProvider, ethers } from "ethers";

import dotenv from 'dotenv'
dotenv.config()


async function getTotalAttestations() {
    // Initialize EAS contract and provider
    const schemaRegistryContractAddress = "0x4200000000000000000000000000000000000020";
    const provider = new ethers.JsonRpcProvider(process.env.QUICKNODE_RPC_URL)
    const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
    schemaRegistry.connect(provider);

    try {
        // Retrieve schema record
        const schemaUID = "0x251738edaada1c1fabac0f9d05174205c4e76183c2ae920e18263ce74297966b";
        const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });

        // Get the total number of attestations from the schema record
        const totalAttestations = schemaRecord.totalAttestations;

        // Return the total number of attestations
        return totalAttestations;
    } catch (error) {
        console.error("Error retrieving total attestations:", error);
        return 0; // Return 0 in case of an error
    }
}

// Example usage
getTotalAttestations().then(total => {
    console.log("Total Attestations:", total);
}).catch(error => {
    console.error("Error:", error);
});
// didnt work out 