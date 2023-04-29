const Web3 = require('web3');
const moment = require('moment');
const prompt = require('prompt-sync')();

// Initialize web3
const web3 = new Web3('https://mainnet.infura.io/v3/64ac682fbe2746de9f7bf443b6f13f67');

async function getTransactionData(address, startBlock) {
  // Get current block number
  const currentBlockNumber = await web3.eth.getBlockNumber();
  console.log(`Current block number: ${currentBlockNumber}`);

  // Get transactions for the given address and block range
  const transactions = await getTransactions(address, startBlock, currentBlockNumber);

  // Extract data from transactions
  const transactionData = extractTransactionData(transactions, address);

  // Display data
  console.log(`Total transactions: ${transactionData.length}`);
  console.log(`Total ETH received: ${transactionData.totalReceived} ETH`);
  console.log(`Total ETH sent: ${transactionData.totalSent} ETH`);
  console.log(`Net ETH received: ${transactionData.netReceived} ETH`);
  console.log(`Net ETH sent: ${transactionData.netSent} ETH`);

  // Bonus: Get ETH balance at a specific date
  const dateStr = prompt('Enter date in YYYY-MM-DD format: ');
  const date = moment.utc(dateStr, 'YYYY-MM-DD').toDate();
  const balance = await getBalanceAtDate(address, date);
  console.log(`ETH balance on ${dateStr}: ${balance} ETH`);
}

async function getTransactions(address, startBlock) {
  let blockNumber = startBlock;
  const currentBlock = await web3.eth.getBlockNumber();
  const transactions = [];

  while (blockNumber <= currentBlock) {
    console.log(`Checking block ${blockNumber}`);
    const block = await web3.eth.getBlock(blockNumber, true);
    const blockTransactions = block.transactions;

    for (let txIndex = 0; txIndex < blockTransactions.length; txIndex++) {
      const tx = blockTransactions[txIndex];
      const from = tx.from.toLowerCase();
      const to = tx.to.toLowerCase();
      const value = web3.utils.fromWei(tx.value);

      if (address === from || address === to) {
        const txData = {
          blockNumber: tx.blockNumber,
          timeStamp: block.timestamp,
          from: from,
          to: to,
          value: value,
        };

        transactions.push(txData);
      }
    }

    blockNumber++;
  }

  return transactions;
}


function extractTransactionData(transactions, address) {
  let totalReceived = 0;
  let totalSent = 0;
  const receivedFrom = {};
  const sentTo = {};
  for (const tx of transactions) {
    const value = web3.utils.fromWei(tx.value, 'ether');
    if (tx.to.toLowerCase() === address.toLowerCase()) {
      totalReceived += parseFloat(value);
      if (!receivedFrom[tx.from]) {
        receivedFrom[tx.from] = 0;
      }
      receivedFrom[tx.from] += parseFloat(value);
    } else if (tx.from.toLowerCase() === address.toLowerCase()) {
      totalSent += parseFloat(value);
      if (!sentTo[tx.to]) {
        sentTo[tx.to] = 0;
      }
      sentTo[tx.to] += parseFloat(value);
    }
  }
  const netReceived = totalReceived - totalSent;
  const netSent = totalSent - totalReceived;
  return { totalReceived, totalSent, netReceived, netSent, receivedFrom, sentTo };
}

async function getBalanceAtDate(address, date) {
  const balanceAtDate = await web3.eth.getBalance(address, Math.round(date.getTime() / 1000));
  return web3.utils.fromWei(balanceAtDate, 'ether');
}

// Get user input
const address = prompt('Enter wallet address: ');
const startBlock = parseInt(prompt('Enter start block: '));

// Call main function
getTransactionData(address, startBlock);
