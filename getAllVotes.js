// this script will pull voting data from spookyswap.eth - GraphiQL snapshot api. 
const query = `
  query {
    votes (
      first: 1000
      skip: 0
      where: {
        proposal: "QmPvbwguLfcVryzBRrbY4Pb9bCtxURagdv1XjhtFLf3wHj"
      }
    ) {
      id
      choice
    }
  }
`;

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

  // Output sorted votes data
  console.log("Sorted Votes by Choice:", data.data.votes);
} catch (error) {
  console.error('Error fetching data:', error);
}
