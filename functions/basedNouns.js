import axios from 'axios';

// This async function fetches attestation data from the base main net on Nouns DAO
async function listAttestations() {
    try {
        const response = await axios.post('https://base.easscan.org/graphql', {
            query: `
                query ExampleQuery($attestationsWhere2: AttestationWhereInput) {
                    attestations(where: $attestationsWhere2) {
                        attester
                        id
                    }
                }
            `,
            variables: {
                attestationsWhere2: {
                    schemaId: {
                        equals: "0x7f0c06286c4ec7eed415a6c76bf57093f5ed14eba6aafe75ce09cb68d1d73b79"
                    }
                }
            }
        });

        // Extract attestation data and format it
        const formattedAttestations = response.data.data.attestations.map(attestation => {
            return {
                attester: attestation.attester,
                id: attestation.id
            };
        });

        // Output the formatted attestation list
       // console.log("Formatted Nouns Attestations:", formattedAttestations);

        return formattedAttestations;
    } catch (error) {
        console.error('Error fetching attestations:', error);
        throw error; // Re-throw the error to handle it outside this function if needed
    }
}

// Call the function to list attestations
listAttestations();

export default listAttestations;
