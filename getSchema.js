import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { QuickNodeProvider, ethers } from "ethers";

import dotenv from 'dotenv'
dotenv.config()

const schemaRegistryContractAddress = "0x4200000000000000000000000000000000000020";
const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

const provider = new ethers.JsonRpcProvider(process.env.QUICKNODE_RPC_URL)
schemaRegistry.connect(provider);

const schemaUID = "0x7f0c06286c4ec7eed415a6c76bf57093f5ed14eba6aafe75ce09cb68d1d73b79";

const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });

console.log(schemaRecord);
