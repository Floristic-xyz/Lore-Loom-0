import axios from 'axios';

// this async function will check the schema ID for all the attestations within its UID and return them. 
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

        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.error('Error fetching attestations:', error);
    }
}

listAttestations();
