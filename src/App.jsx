import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppNavbar from './component/Navbar';
import './css/App.css'

const App = () => {
  return (
    <Router>
      <div className='container'>
      <Helmet>
        <meta name="google-adsense-account" content="ca-pub-1738524832177465" />
      </Helmet>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};


const Home = () => {
  const [j_bet, setJBet] = useState('');
  const [value1, setValue1] = useState('');
  const [money, setMoney] = useState(10);
  const [result, setResult] = useState('');
  const [betAngka, setBetAngka] = useState('');
  const [betResult, setBetResult] = useState('');
  const [betResultMessage, setBetResultMessage] = useState('');
  const [showFireworks, setShowFireworks] = useState(false); // Define showFireworks state
  const [history, setHistory] = useState([]); // State for storing history
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;

    if (inputValue.length <= 1) {
      switch (inputName) {
        case "jbet":
          setJBet(inputValue);
          break;
        case "input1":
          setValue1(inputValue);
          break;
        default:
          break;
      }
    }
  };

  const handlePlay = () => {
    fetch('https://api.bergu.sonopay.net/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: "hellobet2", j_angka: 10, j_bet: j_bet })
    })
    .then(response => response.json())
    .then(data => {
      setBetAngka(data.bet_angka);
      setBetResult(data.bet_result);
      setBetResultMessage(data.result);
      setResult(data.result);
      
      const newEntry = { betAngka: data.bet_angka, betResult: data.bet_result, betResultMessage: data.result };
      setHistory(prevHistory => [...prevHistory, newEntry]);
    })
    .catch(error => console.error('Error:', error));
  };


  const validate = () => {
    if (result === 'win'){
      if (betResult === 9 ){
        setMoney(parseInt(money) + 100);
          setShowFireworks(true);
          setTimeout(() => {
            setShowFireworks(false);
          }, 10000);
          //setResult('super win');
      }
      else {
        setMoney(parseInt(money) + 10);
        //setResult(data.result);
      }
    } 
    else {
      setMoney(parseInt(money) - 1);
    }
  };

  const validate2 = () => {
    if (money === 0){
      alert('Uang habis! Deposit lagi.');
      setMoney(10);
    }
  };

  return (
    <div className="box">

      <marquee behavior="" direction="">Pastikan angka kolom 1 dan kolom 2 sama untuk menbapatkan kemenangan.</marquee>
      <h1 className="box_spin">FreeBet</h1>

      <div className="box_spin">
        <input 
          type="text" 
          name="jbet"
          className="input_spin"
          value={j_bet}
          placeholder='?'
          onChange={handleChange}
          style={{color:'red'}}
        />
        <h1 style={{color:'yellow',marginLeft:'10px',marginRight:'10px'}}>
          =
        </h1>
        <input 
          type="text" 
          name="input1"
          className="input_spin"
          placeholder='!'
          value={betResult}
          onChange={handleChange}
          style={{color:'blue'}}
        />
      </div>
      <div className="box_spin">
        <button className="btn_spin" onClick={() => {handlePlay(); validate(); validate2();}}>PLAY</button>
      </div>
      <div className="box_spin">

        <span style={{fontSize:'bold'}}>Your Bet:
          <span style={{marginRight:'10px',color:'red'}}> {betAngka}</span>
        </span>
        <span style={{fontSize:'bold'}}>Bet Result:
          <span style={{marginRight:'10px',color:'blue'}}> {betResult}</span>
        </span>
        <span style={{fontSize:'bold'}}>Status:
          <span style={{marginRight:'10px',color:'red'}}> {betResultMessage}</span>
        </span>

      </div>

      <div className="box_box">
        <h1 className="box_spin">money: $
          <span id='money' style={{color:"red", marginLeft:"10px"}}>
            {money}
          </span>
        </h1>
      </div>
      <div className="box_box">
        <span className="box_spin">super win 
          <h1  style={{color:"red", marginLeft:"10px",marginRight:"10px"}}>
            9 
          </h1><h3> +100</h3>
        </span>
        <span className="box_spin">
          all win +10
        </span>
      </div>

      <div className="box_box">
        <div className="box_spin">
        <table>
          <thead>
            <tr>
              <th>Bet Angka</th>
              <th>Bet Result</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr data-result={betResultMessage.toLowerCase()}>
              <td>{betAngka}</td>
              <td>{betResult}</td>
              <td>{betResultMessage}</td>
            </tr> */}
            {history.map((entry, index) => (
              <tr key={index} betResultMessage={entry.betResultMessage}>
                <td>{entry.betAngka}</td>
                <td>{entry.betResult}</td>
                <td>{entry.betResultMessage}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      {showFireworks && <div className="fireworks"></div>} {/* Show fireworks if state is true */}
    </div>
  );
};

export default App;
