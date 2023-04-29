import React, { useState } from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import axios from "axios";

const web3 = new Web3(
  "https://mainnet.infura.io/v3/64ac682fbe2746de9f7bf443b6f13f67"
);

const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getTransactionCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getTransactionDetails",
    "outputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

function BalanceForm() {
  const [address, setAddress] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const [transactions, setTransactions] = useState([]);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleBlockNumberChange = (event) => {
    setBlockNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${blockNumber}&endblock=99999999&sort=asc&apikey=ADJUI5FEAT4IST27EVZEPJCAKY9D5N4RHN`;
    try {
      const response = await axios.get(apiUrl);
      setTransactions(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactionValueInEther = (valueInWei) => {
    return web3.utils.fromWei(valueInWei, "ether");
  };

  return (
    <div>
      <h1>Ethereum Transactions Viewer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input type="text" value={address} onChange={handleAddressChange} />
        </label>
        <br />
        <label>
          Start Block Number:
          <input
            type="text"
            value={blockNumber}
            onChange={handleBlockNumberChange}
          />
        </label>
        <br />
        <button type="submit">Search</button>
      </form>
      {transactions.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Block Number</th>
              <th>Timestamp</th>
              <th>From</th>
              <th>To</th>
              <th>Value (ETH)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.hash}>
                <td>{transaction.blockNumber}</td>
                <td>{new Date(transaction.timeStamp * 1000).toLocaleString()}</td>
                <td>{transaction.from}</td>
                <td>{transaction.to}</td>
                <td>{getTransactionValueInEther(transaction.value)} ETH</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BalanceForm;