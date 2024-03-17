import readline from 'readline';
import fs from 'fs';
import listAttestations from './functions/basedNouns.js';
import processNFTDataFromFile from './createNfts.js'
import getSortedVotesData from './functions/apecoinProposalVotes.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function getInput() {
    return new Promise((resolve, reject) => {
        rl.question('1 to pull , 2 to process, 3 to create nft and 4 is bed time): ', (answer) => {
            resolve(answer);
        });
    });
}
/*
below you will find the switch that calls all the other functions. 
*/
async function main() {
    let exitLoop = false;
    while (!exitLoop) {
        const option = await getInput();
        switch (option.toLowerCase()) {
            case '1':
            const sortedVotesData = await getSortedVotesData();
            fs.writeFile('./offChain/sortedVotesData.json', JSON.stringify(sortedVotesData, null, 2), (err) => {
                if (err) {
                    console.error('Error writing to file:\n', err);
                } else {
                    console.log('Data written to file: sortedVotesData.json');
                }
            });
                break;
            case '2':
                const basedNouns = await listAttestations();
                fs.writeFile('./offChain/basedNounsDao.json', JSON.stringify(basedNouns, null, 2), (err) => {
                    if (err) {
                        console.error('Error writing attestationList to file:', err);
                    } else {
                        console.log('Nouns attestations written to file: basedNounsDao.json');
                    }
                });
                break;
            case '3':
                console.log('Option 3 selected');
                const filePath = './offChain/basedNounsDao.json';
                const fileName = await processNFTDataFromFile(filePath);
                if (fileName) {
                    console.log('NFT image file name:', fileName);
                    // Further processing or actions with the file name
                } else {
                    console.log('Failed to process NFT data.');
                }
                break;
            case '4':
                console.log('Exiting...');
                exitLoop = true;
                break;
            default:
                console.log('Invalid option. Please try again.');
        }
    }
    rl.close();
}

main().catch(error => {
    console.error('Error in main program:', error);
});
