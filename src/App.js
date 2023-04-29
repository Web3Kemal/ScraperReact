import React from 'react';
import BalanceForm from './components/BalanceForm';
import { render } from 'react-dom';


function App() {
  return (
    <div>
      <h1>Ethereum Transaction Viewer</h1>
      <BalanceForm />
    </div>
  );
}

render(<App />, document.getElementById('root'));

export default App;
