import React from 'react';
import Link from 'next/link';

export const BookGallery = ({ books, pagination, user, onPageChange }) => {
  // 1. Handle Empty State
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-32 text-gray-400">
        <i className="pi pi-search text-5xl mb-4"></i>
        <p>No books found.</p>
      </div>
    );
  }

  // 2. Pagination Range Logic
  const getPageRange = () => {
    let start = Math.max(1, pagination.current - 2);
    let end = Math.min(pagination.total, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    
    const range = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  };

  return (
    <>
      {/* Header Info */}
      <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
          Total Results: <span className="text-blue-600">{pagination.totalItems}</span> Books
        </h2>
      </div>

      {/* Book List */}
      <div className="divide-y divide-gray-50">
        {books.map((book) => (
          <div key={book.productId} className="group flex flex-col md:flex-row p-8 hover:bg-blue-50/30 transition duration-300 items-center gap-10">
            {/* Image */}
            <div className="relative shrink-0">
              <img 
                src={`/api/book/image/${book.productId}`} 
                alt={book.title}
                className="w-32 h-44 object-cover rounded-xl shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1 transition duration-300" 
              />
            </div>
            
            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900">
                <Link href={`/book/view/${book.productId}`} className="hover:text-blue-600 transition">
                  {book.title}
                </Link>
              </h3>
              <p className="text-gray-500 mt-2 text-lg">
                by <span className="font-semibold text-gray-800">{book.author}</span>
              </p>
              
              <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                <div className="text-2xl font-black text-red-600">
                  ${Number(book.price).toFixed(2)}
                </div>
                <div className="h-4 w-px bg-gray-200"></div>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <i key={i} className={`pi ${i <= Math.round(book.avgRating) ? 'pi-star-fill' : 'pi-star'} text-sm`}></i>
                  ))}
                  <span className="text-gray-400 text-xs ml-1">({book.avgRating || '0.0'})</span>
                </div>
              </div>
            </div>

            {/* Desktop Meta */}
            <div className="hidden lg:flex flex-col items-center px-10 border-x border-gray-100">
              <div className="text-gray-400 text-sm mb-2"><i className="pi pi-calendar mr-1"></i>{book.year}</div>
              <div className="text-gray-400 text-sm"><i className="pi pi-tag mr-1"></i>{book.genre}</div>
            </div>

            {/* Action Button */}
            <div className="shrink-0">
              {user?.DTYPE === 'Employee' ? (
                <Link 
                  href={`/book/edit-view/${book.productId}`} 
                  className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                >
                  Edit Book <i className="pi pi-pencil text-xs"></i>
                </Link>
              ) : (
                <Link 
                  href={`/book/view/${book.productId}`} 
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-blue-600 transition"
                >
                  View Book <i className="pi pi-arrow-right text-xs"></i>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      {pagination.total > 1 && (
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-center items-center gap-4">
          {pagination.current > 1 && (
            <button 
              type="button" 
              onClick={() => onPageChange(pagination.current - 1)}
              className="p-2 text-gray-400 hover:text-blue-600 transition"
            >
              <i className="pi pi-chevron-left"></i>
            </button>
          )}

          <div className="flex items-center gap-1">
            {getPageRange().map((i) => (
              <button 
                key={i}
                type="button" 
                onClick={() => onPageChange(i)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-bold transition
                ${i === pagination.current 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600'}`}
              >
                {i}
              </button>
            ))}
          </div>

          {pagination.current < pagination.total && (
            <button 
              type="button" 
              onClick={() => onPageChange(pagination.current + 1)}
              className="p-2 text-gray-400 hover:text-blue-600 transition"
            >
              <i className="pi pi-chevron-right"></i>
            </button>
          )}

          <span className="ml-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Page {pagination.current} of {pagination.total}
          </span>
        </div>
      )}
    </>
  );
};