import fs from 'fs';
import path from 'path'; // Import the path module

async function processNFTDataFromFile(filePath) {
    try {
        // Read data from JSON file
        const rawData = await fs.promises.readFile(filePath);
        const attestations = JSON.parse(rawData);

        // Process data
        const sumidColumn = attestations.reduce((sum, item) => sum + item.id, 0);

        // Print sum of id column
         console.log("Sum of id column:", sumidColumn);

        // Determine image file name based on sumidColumn
        let imageFileName;
        if (sumidColumn < 2) {
            imageFileName = 'Nfts/nft_1.png';
        } else {
            imageFileName = 'Nfts/nft_2.png';
        }

        // Extract the base name of the file (without the path)
        const fileName = path.basename(imageFileName);

        // Return the file name
        return fileName;
    } catch (error) {
        console.error('Error processing NFT data from file:', error);
        return null;
    }
}

// Usage example:
const filePath = './offChain/basedNounsDao.json';
processNFTDataFromFile(filePath)
    .then(fileName => {
        if (fileName) {
            console.log('NFT image file name:', fileName);
            // Further processing or actions with the file name
        } else {
            console.log('Failed to process NFT data.');
        }
    })
    .catch(error => {
        console.error('Error in main program:', error);
    });
