import React, { useState } from "react";
import { ethers } from "ethers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function EthValue() {
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.JsonRpcProvider(
      "https://api.etherscan.io/api"
    );
    const blockNumber = await provider.getBlockNumber(date);
    const block = await provider.getBlock(blockNumber);
    const timestamp = block.timestamp;
    const apiKey = "ADJUI5FEAT4IST27EVZEPJCAKY9D5N4RHN";
    const response = await axios.get(
      `?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
    );
    const balance = ethers.utils.parseEther(response.data.result);

    setValue(ethers.utils.formatEther(balance));
  };

  return (
    <div className="eth-value">
      <h2>Ethereum Value Calculator</h2>
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
        <button type="submit">Check ETH Value</button>
      </form>
      <h3>ETH value on {date.toDateString()}:</h3>
      <p>{value} ETH</p>
    </div>
  );
}

export default EthValue;
