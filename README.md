# Ethereum Transaction History and Historical Prices

This is a handy script I wrote to fetch the transaction history of an Ethereum address and calculate the historical USD value of incoming transactions during a specified time period. It uses the Etherscan API for transaction history and the CryptoCompare API for historical ETH prices.

## Clone the Repository

To get started, clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/ethereum-transaction-history.git

cd ethereum-transaction-history
```
## Dependencies

- Web3
- Node-fetch

## Installation

To install the necessary dependencies, just run:

```bash
npm install web3 node-fetch
```

## How to Use

1. Replace `'YOUR_ETH_ADDRESS'` with the Ethereum address you want to fetch the transaction history for.
2. Replace `'YOUR_ETHERSCAN_API_KEY'` with your Etherscan API key.
3. Replace `'YOUR_CRYPTOCOMPARE_API_KEY'` with your CryptoCompare API key.
4. Update `startDate` and `endDate` with the desired time range for filtering incoming transactions (format: 'yyyy-mm-dd').

To run the script, simply use:

```bash
node index.js
```

## Output

The script will display a neat table with the following columns:

- `fromAddress`: The address that sent the transaction.
- `timestamp`: The date and time when the transaction occurred.
- `depositAmount`: The amount of ETH deposited.
- `usdValue`: The USD value of the deposit at the time of the transaction.

Example output:


## Heads Up!

Keep in mind that the script may fail if you exceed the rate limits of the Etherscan or CryptoCompare APIs. If this happens, you can try running the script again after a while or get a higher API rate limit by subscribing to a paid plan.

## 🙌 Buy Me a Coffee ☕️

If you found this script helpful and it saved you time, consider buying me a coffee as a token of appreciation. It'll keep me energized to create more awesome tools like this! Send your ETH donations to my wallet: **phoenixdav.eth** Thanks!



