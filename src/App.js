import React, { useState } from 'react';
import BalanceForm from './components/BalanceForm';
import EthValue from './components/EthValue';
import Navbar from './components/Navbar';

function App() {
  const [activeTab, setActiveTab] = useState('balance');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Navbar activeTab={activeTab} handleTabChange={handleTabChange} />
      {activeTab === 'balance' ? <BalanceForm /> : <EthValue />}
    </div>
  );
}

export default App;
