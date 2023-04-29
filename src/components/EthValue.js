import React, { useState } from "react";
import { ethers } from "ethers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EthBalance() {
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date());
  const [balance, setBalance] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const provider = new ethers.JsonRpcProvider(
      "https://mainnet.infura.io/v3/64ac682fbe2746de9f7bf443b6f13f67"
    );

    const timestamp = Math.round(date.getTime() / 1000); // Convert date to timestamp in seconds
    const blockNumber = await provider.getBlockNumber(timestamp);
    console.log("Block number at date:", blockNumber);

    const balance = await provider.getBalance(address, blockNumber);
    const ethBalance = ethers.formatEther(balance);
    console.log("ETH balance:", ethBalance);
    setBalance(ethBalance);
  };

  return (
    <div className="eth-balance">
      <h2>Ethereum Balance Calculator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date:
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </label>
        <br />
        <button type="submit">Check ETH Balance</button>
      </form>
      <h3>ETH balance on {date.toDateString()}:</h3>
      <p>{balance} ETH</p>
    </div>
  );
}

export default EthBalance;
