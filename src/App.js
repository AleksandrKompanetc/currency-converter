import React, {useState} from 'react';
import './App.css';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UAH');

  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h1>Currency Converter (UAH)</h1>
      <div style={{marginBottom: '20px'}}>
        <input 
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)} 
          style={{marginRight: '10px', padding: '5px', width: '100px'}}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          style={{marginRight: '10px', padding: '5px'}}
        >
          {currencies.map((currency) => (
            <option key={currency.r030} value={currency.cc}>
              {currency.cc}
            </option>
          ))}
        </select>
        <span style={{marginRight: '10px'}}>to</span>
      </div>
    </div>
  );
}

export default App;
