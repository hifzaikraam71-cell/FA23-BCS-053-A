import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [ads, setAds] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const fetchAds = async () => {
    const res = await axios.get('http://localhost:5000/ads');
    setAds(res.data);
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const submitAd = async () => {
    await axios.post('http://localhost:5000/ads', {
      title,
      description,
      image
    });
    alert("Ad Submitted!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AdFlow Pro</h1>

      <h2>Create Ad</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} /><br /><br />
      <input placeholder="Description" onChange={e => setDescription(e.target.value)} /><br /><br />
      <input placeholder="Image URL" onChange={e => setImage(e.target.value)} /><br /><br />

      <button onClick={submitAd}>Submit</button>

      <h2>Approved Ads</h2>

      {ads.map(ad => (
        <div key={ad._id}>
          <h3>{ad.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;