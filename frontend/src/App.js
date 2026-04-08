import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('user');
  const [ads, setAds] = useState([]);
  const [myAds, setMyAds] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [sponsored, setSponsored] = useState(false);
  const [price, setPrice] = useState('');
  const [schedule, setSchedule] = useState('');
  const [analytics, setAnalytics] = useState({});

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;

  const fetchAds = async () => {
    const res = await axios.get('http://localhost:5000/ads');
    setAds(res.data);
  };

  const fetchMyAds = async () => {
    const res = await axios.get('http://localhost:5000/myads');
    setMyAds(res.data);
  };

  const fetchAnalytics = async () => {
    const res = await axios.get('http://localhost:5000/analytics');
    setAnalytics(res.data);
  };

  useEffect(() => {
    if (token) {
      // Decode token to get user info
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUser(decoded.username || 'User');
      setRole(decoded.role);
      fetchAds();
      fetchMyAds();
      if (decoded.role === 'admin') fetchAnalytics();
    }
  }, [token]);

  const submitAd = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('sponsored', sponsored);
    formData.append('price', price);
    formData.append('schedule', schedule);
    if (image) formData.append('image', image);

    await axios.post('http://localhost:5000/ads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    setTitle('');
    setDescription('');
    setImage(null);
    setCategory('');
    setSponsored(false);
    setPrice('');
    setSchedule('');
    fetchMyAds();
  };

  const moderateAd = async (id, status) => {
    await axios.put(`http://localhost:5000/ads/${id}/moderate`, { status });
    fetchAds();
  };

  const payForAd = async (adId) => {
    // For simplicity, assume token is provided, in real app use Stripe elements
    const token = 'tok_visa'; // placeholder
    await axios.post('http://localhost:5000/pay', { adId, token });
    alert('Payment successful');
    fetchMyAds();
  };

  const filteredAds = ads.filter(ad =>
    (
      ad.title.toLowerCase().includes(search.toLowerCase()) ||
      ad.description.toLowerCase().includes(search.toLowerCase()) ||
      (ad.category && ad.category.toLowerCase().includes(search.toLowerCase()))
    ) &&
    (
      categoryFilter === '' ||
      (ad.category && ad.category.toLowerCase() === categoryFilter.toLowerCase())
    )
  );

  if (!user) return <Login setUser={setUser} />;

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      background: 'linear-gradient(135deg, #0f2027, #2c5364, #1c92d2)',
      color: '#fff'
    }}>

      <h1 style={{ textAlign: 'center', marginBottom: 5 }}>
        AdFlow Pro 🚀
      </h1>

      <h3 style={{
        textAlign: 'center',
        opacity: 0.8,
        marginBottom: 20
      }}>
        Smart Ad Management System
      </h3>

      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>
        Welcome {user} ({role}) 👋
      </h2>

      {/* Analytics for Admin */}
      {role === 'admin' && (
        <div style={{
          backdropFilter: 'blur(15px)',
          background: 'rgba(255,255,255,0.1)',
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h2>Analytics</h2>
          <p>Total Ads: {analytics.totalAds}</p>
          <p>Approved Ads: {analytics.approvedAds}</p>
          <p>Sponsored Ads: {analytics.sponsoredAds}</p>
          <p>Total Views: {analytics.totalViews}</p>
        </div>
      )}

      {/* Search Panel */}
      <div style={{
        backdropFilter: 'blur(15px)',
        background: 'rgba(255,255,255,0.1)',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        border: '1px solid rgba(255,255,255,0.2)'
      }}>

        <input
          placeholder="Search Ads..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 10,
            border: 'none',
            marginRight: 10
          }}
        />

        <select
          onChange={e => setCategoryFilter(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 10,
            border: 'none'
          }}
        >
          <option value="">All</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Home</option>
          <option>Vehicles</option>
        </select>
      </div>

      {/* Form */}
      <div style={{
        backdropFilter: 'blur(15px)',
        background: 'rgba(255,255,255,0.1)',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        border: '1px solid rgba(255,255,255,0.2)'
      }}>

        <h2>Create Ad</h2>

        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} style={{width:'100%', marginBottom:10}} /><br />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={{width:'100%', marginBottom:10}} /><br />
        <input type="file" onChange={e => setImage(e.target.files[0])} style={{marginBottom:10}} /><br />

        <select value={category} onChange={e => setCategory(e.target.value)} style={{width:'100%', marginBottom:10}}>
          <option>Select Category</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Home</option>
          <option>Vehicles</option>
        </select><br />

        <label>
          <input type="checkbox" checked={sponsored} onChange={e => setSponsored(e.target.checked)} />
          Sponsored
        </label><br />

        {sponsored && (
          <>
            <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} style={{width:'100%', marginBottom:10}} /><br />
            <input type="datetime-local" value={schedule} onChange={e => setSchedule(e.target.value)} style={{width:'100%', marginBottom:10}} /><br />
          </>
        )}

        <button
          onClick={submitAd}
          style={{
            padding: 10,
            borderRadius: 10,
            border: 'none',
            background: 'linear-gradient(135deg, #00f260, #0575e6)',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Submit Ad
        </button>
      </div>

      {/* My Ads */}
      <h2>My Ads</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 20,
        marginBottom: 20
      }}>
        {myAds.map(ad => (
          <div key={ad._id} style={{
            backdropFilter: 'blur(15px)',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 15,
            padding: 15,
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3>{ad.title}</h3>
            <p>Status: {ad.status}</p>
            {ad.status === 'pending' && <p>Waiting for approval</p>}
            {ad.sponsored && !ad.sponsored && <button onClick={() => payForAd(ad._id)}>Pay to Sponsor</button>}
          </div>
        ))}
      </div>

      {/* Admin Moderation */}
      {role === 'admin' && (
        <div>
          <h2>Pending Ads for Moderation</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 20
          }}>
            {ads.filter(ad => ad.status === 'pending').map(ad => (
              <div key={ad._id} style={{
                backdropFilter: 'blur(15px)',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 15,
                padding: 15,
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <h3>{ad.title}</h3>
                <p>{ad.description}</p>
                <button onClick={() => moderateAd(ad._id, 'approved')}>Approve</button>
                <button onClick={() => moderateAd(ad._id, 'rejected')}>Reject</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ads */}
      <h2>Approved Ads</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 20
      }}>
        {filteredAds.map(ad => (
          <div key={ad._id} style={{
            backdropFilter: 'blur(15px)',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 15,
            padding: 15,
            border: '1px solid rgba(255,255,255,0.2)',
            transition: '0.3s'
          }}

          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}

          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          >

            <h3 style={{ marginBottom: 5 }}>
              {ad.title} {ad.sponsored && '⭐'}
            </h3>

            <p style={{
              fontSize: '14px',
              opacity: 0.85
            }}>
              {ad.description}
            </p>

            <span style={{
              display: 'inline-block',
              marginTop: 5,
              padding: '4px 10px',
              borderRadius: 10,
              background: 'rgba(0,255,200,0.2)',
              fontSize: '12px'
            }}>
              {ad.category}
            </span>

            {ad.image && (
              <img 
                src={`data:image/jpeg;base64,${ad.image}`} 
                alt=""
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginTop: "10px"
                }}
              />
            )}

          </div>
        ))}
      </div>

    </div>
  );
}

export default App;