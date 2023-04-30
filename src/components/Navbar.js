import React from 'react';

function Navbar(props) {
  const { activeTab, handleTabChange } = props;

  const handleBalanceClick = () => {
    handleTabChange('balance');
  };

  const handleEthValueClick = () => {
    handleTabChange('ethValue');
  };

  return (
    <nav>
      <div className="navbar-container">
        <button
          className={activeTab === 'balance' ? 'active' : ''}
          onClick={handleBalanceClick}
        >
          Check Balance
        </button>
        <button
          className={activeTab === 'ethValue' ? 'active' : ''}
          onClick={handleEthValueClick}
        >
          Check ETH Value
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
