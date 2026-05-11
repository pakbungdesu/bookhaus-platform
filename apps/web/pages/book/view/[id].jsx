import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Layout } from '../../../components/Layout';

export default function ViewBook() {
  const router = useRouter();
  const { id } = router.query;
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBook = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/book/view/${id}`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Failed to fetch book:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);


  const handleFavorite = async () => {
    // 1. Check if user exists and is a Customer
    if (!data?.user || data?.user?.DTYPE !== 'Customer') {
      router.push('/auth/login');
      return;
    }

    const book = data?.book || data;

    try {
      const res = await fetch('/api/favorite/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: book.productId })
      });
      const result = await res.json();
      if (res.ok) alert("Added to Wishlist! ❤️");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-40">
          <i className="pi pi-spin pi-spinner text-4xl text-blue-600 mb-4"></i>
          <p className="text-gray-500">Loading your story...</p>
        </div>
      </Layout>
    );
  }

  const book = data?.book || data;
  const user = data?.user;

  if (!book || !book.title) {
    return (
      <Layout user={user}>
        <div className="py-40 text-center">
          <h1 className="text-2xl font-bold">Book not found</h1>
          <button onClick={() => router.push('/book/search')} className="mt-4 text-blue-600 underline">
            Back to Search
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user}>
      <main className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-16 min-h-[70vh]">
        
        {/* Left: Book Cover */}
        <div className="md:w-1/3 flex justify-center">
          <div className="sticky top-24">
            <img 
              src={`/api/book/image/${book.productId}`} 
              alt={book.title}
              className="w-72 rounded-xl shadow-2xl shadow-gray-400 hover:scale-105 transition duration-500 border-gray-100 object-cover aspect-[2/3]"
              onError={(e) => { e.target.src = 'https://placehold.co/400x600?text=No+Cover+Found'; }}
            />
          </div>
        </div>

        {/* Right: Book Content */}
        <div className="md:w-2/3">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 uppercase tracking-widest font-bold">
            <span className="text-blue-600">{book.genre}</span>
            <span>•</span>
            <span>{book.year}</span>
          </nav>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-4 leading-tight">
            {book.title}
          </h1>
          
          <p className="text-2xl text-gray-500 flex items-center gap-3 mb-10">
            <i className="pi pi-user text-gray-300"></i> 
            By <span className="text-gray-900 font-semibold">{book.author}</span>
          </p>
          
          <div className="bg-white border border-gray-100 rounded-3xl p-8 mb-12 shadow-sm">
            <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-4">About this book</h3>
            <p className="text-lg text-gray-600 leading-relaxed italic">
              "{book.description || 'No description provided.'}"
            </p>
          </div>
          
          <div className="flex items-end gap-3 mb-12">
            <span className="text-7xl font-black text-gray-900 tracking-tighter">
              ${book.price ? Number(book.price).toFixed(2) : "0.00"}
            </span>
            <span className="text-gray-400 font-bold mb-3 uppercase text-xs tracking-widest">USD</span>
          </div>

          <div className="flex flex-wrap gap-4">
             <button 
                onClick={handleFavorite}
                className="px-10 py-5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black hover:-translate-y-1 transition duration-300 shadow-xl cursor-pointer"
              >
                <i className="pi pi-heart mr-2"></i> Save to Favorites
              </button>

              <button className="px-10 py-5 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 hover:-translate-y-1 transition duration-300 shadow-xl shadow-green-100 cursor-pointer">
                <i className="pi pi-shopping-cart mr-2"></i> Add to Cart
              </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}