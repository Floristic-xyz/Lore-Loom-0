// this function script pulls voting data from apecoin proposals - GraphiQL snapshot api. 
async function getSortedVotesData() {
  const query = `
    query {
      votes (
        first: 1000
        skip: 0
        where: {
          proposal: "0xda81167bae092cbc66bfe5a35abfbf12d96c2577155eed8975bb64514374ae02" 
        }
      ) {
        id
        choice
      }
    }
  `;

  // https://snapshot.org/#/apecoin.eth/proposal/0xda81167bae092cbc66bfe5a35abfbf12d96c2577155eed8975bb64514374ae02

  try {
    const response = await fetch('https://hub.snapshot.org/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any necessary authorization headers here if required
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    // Sort the votes data based on the choice
    data.data.votes.sort((a, b) => {
      if (a.choice < b.choice) {
        return -1;
      }
      if (a.choice > b.choice) {
        return 1;
      }
      return 0;
    });

    //Return sorted votes data
    return data.data.votes;
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of an error
  }
}
export default getSortedVotesData;