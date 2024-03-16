import axios from 'axios';

async function listAttestations() {
    try {
        const response = await axios.post('https://base.easscan.org/graphql', {
            query: `
                query Attestations {
                    attestations(take: 25, orderBy: {time: desc}) {
                        id
                     
                    }
                }
            `
        });

        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.error('Error fetching attestations:', error);
    }
}

listAttestations();
