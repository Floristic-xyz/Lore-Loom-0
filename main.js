import getSortedVotesData from './functions/apecoinProposalVotes.js';
import listAttestations from './functions/basedNouns.js';
import fs from 'fs';

async function main() {
    console.log("Starting main program...");
  
    // Call the function to get sorted votes data
    const sortedVotesData = await getSortedVotesData();
  
    // Output the sorted votes data
    //console.log("Sorted Votes by Choice:", sortedVotesData);

    fs.writeFile('./offChain/sortedVotesData.json', JSON.stringify(sortedVotesData, null, 2), (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('Data written to file: sortedVotesData.json');
        }
      });

    // Call the function to list attestations
    const basedNouns = await listAttestations();
  
    // Output the attestation list
    //console.log("Nouns attestations:", basedNouns);

    fs.writeFile('./offChain/basedNounsDao.json', JSON.stringify(basedNouns, null, 2), (err) => {
        if (err) {
            console.error('Error writing attestationList to file:', err);
          } else {
            console.log('Nouns attestations written to file: basedNounsDao.json');
          }
        });

        /*if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('Data written to file: basedNounsDao.json');
        }
      });
      */
  
    console.log("Main program completed.");
}

main().catch(error => {
    console.error('Error in main program:', error);
});
