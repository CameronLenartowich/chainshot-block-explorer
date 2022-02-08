import React, {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios'

function App() {

  const [currentBlock, setCurrentBlock] = useState("")
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState("")

  useEffect(() => {
    getCurrentBlock()
  }, [])

  const getCurrentBlock = () => {
    axios.get('http://localhost:5000/current-block').then((res) => {
      setCurrentBlock(res.data)
    }).catch((err) => console.log(err))
  }

  const getBalance = (address) => {
    axios.post('http://localhost:5000/get-balance', {address}).then((res) => {
      setBalance(res.data)
    }).catch((err) => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ethereum Block Explorer</h1>
        
        <h2>Get Current Block Number</h2>
        <button
          onClick={() => getCurrentBlock()}
        >
          Get Current Block
        </button>
        <p>Current Block: {currentBlock}</p>
        
        <div>
          <h2>Get Rinkeby Balance</h2>
          <input 
            type='text'
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <button
            onClick={() => getBalance(address)}
          >
            Search
          </button>
          <p>Balance: {balance}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
