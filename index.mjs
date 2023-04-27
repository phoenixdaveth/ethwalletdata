import Web3 from 'web3';
import fetch from 'node-fetch';

const web3 = new Web3();
const address = 'YOUR_ETH_ADDRESS';
const etherscanApiKey = 'YOUR_ETHERSCAN_API_KEY';

const startDate = new Date('2021-07-13').getTime() / 1000;
const endDate = new Date('2021-07-15').getTime() / 1000;

async function getTransactionHistory() {
  const response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${etherscanApiKey}`);
  const data = await response.json();
  console.log("Etherscan API response:", data);
  return data.result;
}

// Add the sleep function here
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Update the getHistoricalPrice function
async function getHistoricalPrice(timestamp, retries = 3) {
  try {
    const cryptoCompareApiKey = 'YOUR_CRYPTOCOMPARE_API_KEY';
    const targetTimestamp = Math.round(timestamp.getTime() / 1000);
    console.log('Target timestamp:', targetTimestamp);
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USDT&toTs=${parseInt(targetTimestamp)}&limit=1&api_key=${cryptoCompareApiKey}`
    );
    const data = await response.json();

    console.log('CryptoCompare API response:', data);

    if (!data.Data || !data.Data.Data || data.Data.Data.length === 0) {
      throw new Error('No data received from CryptoCompare API');
    }
    return parseFloat(data.Data.Data[data.Data.Data.length - 1].close);
  } catch (error) {
    console.error('Error fetching historical price:', error);
    if (retries > 0) {
      console.log(`Retrying CryptoCompare API request (${retries} retries remaining)...`);
      await sleep(1000); // Wait for 1 second before retrying
      return await getHistoricalPrice(timestamp, retries - 1);
    } else {
      throw error;
    }
  }
}

async function getDepositData() {
  const transactions = await getTransactionHistory();

  console.log('All transactions:', transactions);

  const incomingTransactions = transactions.filter(tx => {
    const txTimestamp = parseInt(tx.timeStamp);
    return tx.to.toLowerCase() === address.toLowerCase() && txTimestamp >= startDate && txTimestamp <= endDate;
  });

  console.log("Filtered incoming transactions:", incomingTransactions);

  const depositData = [];

  for (const tx of incomingTransactions) {
    const fromAddress = tx.from;
    const timestamp = new Date(parseInt(tx.timeStamp) * 1000);
    const depositAmount = web3.utils.fromWei(tx.value, 'ether');
    const usdValue = await getHistoricalPrice(timestamp, 3) * depositAmount;

    depositData.push({
      fromAddress,
      timestamp: timestamp.toLocaleString(),
      depositAmount,
      usdValue: usdValue.toFixed(2),
    });
  }

  console.table(depositData);
}

getDepositData();
