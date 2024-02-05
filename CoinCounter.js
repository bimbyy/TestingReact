import React, { useState } from 'react';
import Coin from './Coin';
import Counter from './Counter';

function App() {
  const [coin, setCoin] = useState({ side: 'heads', heads: 0, tails: 0 });

  const flipCoin = () => {
    const isHeads = Math.random() < 0.5;
    setCoin((prevCoin) => ({
      side: isHeads ? 'heads' : 'tails',
      heads: isHeads ? prevCoin.heads + 1 : prevCoin.heads,
      tails: !isHeads ? prevCoin.tails + 1 : prevCoin.tails,
    }));
  };

  return (
    <div>
      <h2>Let's flip a coin!</h2>
      <button onClick={flipCoin}>Flip Coin</button>
      <Coin side={coin.side} />
      <Counter heads={coin.heads} tails={coin.tails} />
    </div>
  );
}

export default App;
