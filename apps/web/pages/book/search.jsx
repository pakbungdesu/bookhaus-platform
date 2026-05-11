import { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { BookGallery } from '../../components/BookGallery';

export default function Search() {
  const [filters, setFilters] = useState({ title: '', author: '', genre: '', page: 1 });
  const [searchResult, setSearchResult] = useState({
    books: [],
    pagination: { current: 1, total: 1, totalItems: 0 },
    user: null
  });

  const genres = ["Classic", "Science Fiction", "Fiction", "Technology", "Young Adult", "Fantasy", "Horror", "Thriller", "Non-Fiction", "Mystery", "Children", "Philosophy"];

  const handleSearch = async () => {
    const params = new URLSearchParams(filters);
    try {
      const res = await fetch(`/api/book/search?${params.toString()}`);
      const data = await res.json();
      setSearchResult(data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(handleSearch, 300);
    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <Layout user={searchResult.user}>
      <main className="max-w-6xl mx-auto px-4 py-12 min-h-[70vh]">
        <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <i className="pi pi-search text-blue-600"></i> Find a Book 📚
          </h2>
          
          <div className="mt-6 flex flex-wrap gap-4">
            {/* Title Search */}
            <input 
              type="text" 
              placeholder="Search by title..." 
              className="flex-1 min-w-[200px] px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition"
              value={filters.title}
              onChange={(e) => setFilters({...filters, title: e.target.value, page: 1})}
            />

            {/* Author Search */}
            <input 
              type="text" 
              placeholder="Search by author..." 
              className="flex-1 min-w-[200px] px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition"
              value={filters.author}
              onChange={(e) => setFilters({...filters, author: e.target.value, page: 1})}
            />

            {/* Genre Filter */}
            <select 
              className="flex-0.5 min-w-[150px] px-4 py-2.5 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-600 transition"
              value={filters.genre}
              onChange={(e) => setFilters({...filters, genre: e.target.value, page: 1})}
            >
              <option value="">All Genres</option>
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
           <BookGallery 
             books={searchResult.books} 
             pagination={searchResult.pagination} 
             user={searchResult.user} 
             onPageChange={(newPage) => setFilters({...filters, page: newPage})} 
           />
        </div>
      </main>
    </Layout>
  );
}