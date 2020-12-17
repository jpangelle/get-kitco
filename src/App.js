import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [price, setPrice] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/get-kitco');
      setPrice(data.price);
      return data;
    })();
  }, []);

  return <div className="App">{price}</div>;
}

export default App;
