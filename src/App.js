import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UAH');
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
        const data = await response.json();

        setCurrencies(data);

      } catch (error) {
        console.error('Loading data error: ', error)
      }
    }

    fetchCurrencies()
  }, [])

  useEffect(() => {
    if (currencies.length > 0) {
      const fromRate = currencies.find((currency) => currency.cc === fromCurrency)?.rate || 1;
      const toRate = currencies.find((currency) => currency.cc === toCurrency)?.rate || 1;
      setExchangeRate(toRate / fromRate);
    }
  }, [currencies, fromCurrency, toCurrency]);

  const convertedAmount = (amount * exchangeRate).toFixed(2);

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
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          style={{padding: '5px'}}
        >
          {currencies.map((currency) => (
            <option key={currency.r030} value={currency.cc}>
              {currency.cc}
            </option>
          ))}
        </select>
      </div>
      <p>
        {amount} {fromCurrency} - {convertedAmount} {toCurrency}
      </p>
    </div>
  );
}

export default App;
