function Coin({ side }) {
    const imageUrl = side === 'heads' ? 'PATH TO YOUR IMAGE OF HEADS' : 'PATH TO IMAGE OF TAILS JPG';
    return (
      <div>
        <img src={imageUrl} alt={side} style={{ width: '100px', height: '100px' }} />
      </div>
    );
  }
  
  export default Coin;
  