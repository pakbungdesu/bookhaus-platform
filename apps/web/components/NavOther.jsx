import Link from 'next/link';

export const NavOther = ({ user }) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Side: Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-black transition flex items-center gap-2">
            <i className="pi pi-home"></i> Home
          </Link>
          <Link href="/book/search" className="text-gray-700 hover:text-black transition flex items-center gap-2">
            <i className="pi pi-book"></i> Product
          </Link>
          <Link href="/service" className="text-gray-700 hover:text-black transition flex items-center gap-2">
            <i className="pi pi-truck"></i> Service
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-black transition flex items-center gap-2">
            <i className="pi pi-info-circle"></i> About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-black transition flex items-center gap-2">
            <i className="pi pi-phone"></i> Contact
          </Link>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/favorite" className="text-gray-700 hover:text-black transition flex items-center gap-2">
                <i className="pi pi-heart"></i> Wishlist
              </Link>
              <Link href="/order/cart" className="text-gray-700 hover:text-black transition flex items-center gap-2">
                <i className="pi pi-shopping-cart"></i> Cart
              </Link>
              <Link href="/customer/profile" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                <i className="pi pi-user"></i> Profile
              </Link>
            </>
          ) : (
            <>
              <div className="relative hidden sm:block">
                <i className="pi pi-search absolute left-3 top-[30%] text-gray-400"></i>
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div className="h-6 w-px bg-gray-200 mx-2"></div>
              <Link href="/auth" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                <i className="pi pi-sign-in"></i> Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
