import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import Link from 'next/link';

export default function Wishlist() {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch('/api/favorite');
        const data = await res.json();
        setFavorites(data.favorites || []);
        setUser(data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const removeItem = async (productId) => {
    try {
      const res = await fetch('/api/favorite/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
      if (res.ok) {
        // Filter out the item immediately for a smooth UI
        setFavorites(favorites.filter(fav => fav.book.productId !== productId));
      }
    } catch (err) {
      alert("Failed to remove item.");
    }
  };

  if (loading) return <Layout><div className="py-40 text-center"><i className="pi pi-spin pi-spinner text-4xl"></i></div></Layout>;

  return (
    <Layout user={user}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          My Wishlist <span className="text-red-500">❤️</span>
        </h1>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((fav) => (
              <div key={fav.book.productId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                  <img 
                    src={`/api/book/image/${fav.book.productId}`} 
                    alt={fav.book.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 truncate">{fav.book.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{fav.book.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      ${Number(fav.book.price).toFixed(2)}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => removeItem(fav.book.productId)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition">
                        <i className="pi pi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-400">Your wishlist is empty.</p>
            <Link href="/book/search" className="text-blue-600 font-bold mt-4 inline-block">Go find some books!</Link>
          </div>
        )}
      </div>
    </Layout>
  );
}