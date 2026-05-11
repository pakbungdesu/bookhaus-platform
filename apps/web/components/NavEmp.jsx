// components/NavEmp.jsx
import Link from 'next/link';

export const NavEmp = ({ user }) => {
  const isManager = user?.position === 'Manager';

  return (
    <nav className="bg-white border-b border-gray-200 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="hidden md:flex items-center gap-6">
          <Link href="/info/home" className="text-gray-600 hover:text-black flex items-center gap-2 text-base font-medium py-5">
            <i className="pi pi-home"></i> Home
          </Link>

          {/* Inventory Dropdown */}
          <div className="relative group">
            <button className="text-gray-600 hover:text-black flex items-center gap-2 text-base font-medium py-5">
              <i className="pi pi-book"></i> Inventory <i className="pi pi-chevron-down text-[10px]"></i>
            </button>
            <div className="absolute hidden group-hover:block bg-white border border-gray-100 shadow-xl rounded-xl py-2 w-48 left-0 transition-all">
              <Link href="/book/add" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                <i className="pi pi-plus mr-2 text-xs"></i> Add New Book
              </Link>
              <Link href="/book/edit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                <i className="pi pi-file-edit mr-2 text-xs"></i> Edit Books
              </Link>
            </div>
          </div>

          {/* Sales Dropdown */}
          <div className="relative group">
            <button className="text-gray-600 hover:text-black flex items-center gap-2 text-base font-medium py-5">
              <i className="pi pi-shopping-cart"></i> Sales <i className="pi pi-chevron-down text-[10px]"></i>
            </button>
            <div className="absolute hidden group-hover:block bg-white border border-gray-100 shadow-xl rounded-xl py-2 w-48 left-0">
              <Link href="/order/active" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Active Orders</Link>
              {isManager && (
                <Link href="/order/completed" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Sales History</Link>
              )}
            </div>
          </div>

          {/* Manager Only: People Dropdown */}
          {isManager && (
            <div className="relative group">
              <button className="text-gray-600 hover:text-black flex items-center gap-2 text-base font-medium py-5">
                <i className="pi pi-users"></i> People <i className="pi pi-chevron-down text-[10px]"></i>
              </button>
              <div className="absolute hidden group-hover:block bg-white border border-gray-100 shadow-xl rounded-xl py-2 w-48 left-0">
                <Link href="/employee/staff" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Staff Directory</Link>
                <Link href="/customer/records" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Customer Records</Link>
              </div>
            </div>
          )}
        </div>

        <Link href="/employee/profile" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center gap-2">
          <i className="pi pi-user"></i> Profile
        </Link>
      </div>
    </nav>
  );
};
