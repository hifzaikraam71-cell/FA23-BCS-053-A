'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Ad {
  _id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  sponsored: boolean;
  user?: { username?: string };
}

export default function AdDetail() {
  const { id } = useParams();
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    if (id) {
      fetchAd();
    }
  }, [id]);

  const fetchAd = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/ads/${id}`);
      setAd(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!ad) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {ad.image && (
            <img src={`data:image/jpeg;base64,${ad.image}`} alt="" className="w-full h-64 object-cover" />
          )}
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-3xl font-bold text-gray-900">{ad.title}</h1>
              {ad.sponsored && <span className="rounded-full bg-amber-200 px-3 py-1 text-sm font-semibold text-amber-900">Sponsored</span>}
            </div>
            <p className="text-gray-600 mt-4 mb-4">{ad.description}</p>
            <p className="text-sm text-gray-500 mb-2">Category: {ad.category}</p>
            <p className="text-sm text-gray-500">Posted by: {ad.user?.username || 'Seller'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}