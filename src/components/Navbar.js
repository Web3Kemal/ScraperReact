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
      <ul>
        <li>
          <button
            className={activeTab === 'balance' ? 'active' : ''}
            onClick={handleBalanceClick}
          >
            Check Balance
          </button>
        </li>
        <li>
          <button
            className={activeTab === 'ethValue' ? 'active' : ''}
            onClick={handleEthValueClick}
          >
            Check ETH Value
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
