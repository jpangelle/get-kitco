import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const { data } = await axios.get('/api/get-kitco');
        setPrice(data.price);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="App">Oh no! Please refresh.</div>;
  }

  return (
    <div className="App">
      <div className="label">Kitco Gold Price</div>
      <div className="price">{price}</div>
    </div>
  );
}

export default App;
