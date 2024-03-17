import { SchemaRegistry, EAS } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
const fs = require('fs').promises;

const dfd = require("danfojs-node") ;


async function getTotalAttestations() {
    // Initialize EAS contract and provider
    const schemaRegistryContractAddress = "0x4200000000000000000000000000000000000020";
    const provider = new ethers.JsonRpcProvider("https://sleek-bold-wind.base-mainnet.quiknode.pro/00a0a05164872187ea592d0c69906a4affe0be13/");
    const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
    schemaRegistry.connect(provider);

    const schemaUID = "0x251738edaada1c1fabac0f9d05174205c4e76183c2ae920e18263ce74297966b";
    const EASContractAddress = "0x4200000000000000000000000000000000000021";

    const eas = new EAS(EASContractAddress);
    eas.connect(provider);

    const uid = "0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e";

    const attestations = await eas();
    console.log(attestations);


    ///
    const df = new dfd.DataFrame(attestations);
    const sumidColumn = df.loc({ columns: ["id"] }).sum().values[0];

    

    // Print the DataFrame
    console.log("DataFrame:");
    console.log(df.toString());
    console.log("Sum of second column:", sumidColumn);

    let imageFileName;
        if (sumidColumn < 2) {
            imageFileName = 'nft-1.png';
        } else {
            imageFileName = 'nft-2.png';
        }


        // Read the JPEG image file from the project directory
        const imageData = await fs.readFile(imageFileName);

        // Return the image data
        return imageData;




    //
 //   return   sumidColumn   // attestations;

    /*
    try {
        // Retrieve schema record
        const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });
        schemaRegistry.
        console.log(schemaRecord);

        // Get the total number of attestations from the schema record
        const totalAttestations = schemaRecord.totalAttestations;

        // Return the total number of attestations
        return totalAttestations;
    } catch (error) {
        console.error("Error retrieving total attestations:", error);
        return 0; // Return 0 in case of an error
    }
    */
}

// Example usage
/*
getTotalAttestations().then(total => {
    console.log("Total Attestations:", total);
}).catch(error => {
    console.error("Error:", error);
    */

let attestations = await getTotalAttestations();

console.log(attestations);


