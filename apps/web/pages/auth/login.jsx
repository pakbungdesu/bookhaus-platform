import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  // Capture the role from the URL (?role=employee or ?role=customer)
  const { role } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the role to the backend
        body: JSON.stringify({ email, password, role: role || 'customer' })
      });
      const data = await res.json();

      if (res.ok) {
        router.push('/');
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Network error occurred.");
    }
  };

  // Dynamic Content based on role
  const isEmployee = role === 'employee';
  const loginTitle = isEmployee ? "Employee Portal" : "Customer Login";
  const loginImage = isEmployee ? "/images/employee.jpg" : "/images/customer.jpg";

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        
        {/* Dynamic Image */}
        <div className="hidden md:block md:w-5/12">
          <img src={loginImage} alt="login" className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-7/12 p-10 md:p-16">
          <div className="mb-8">
            <img src="/images/logo.png" alt="Logo" className="max-w-[40px]" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
            {loginTitle}
          </h3>
          <p className="text-gray-500 mb-8 text-sm">Please enter your credentials to access Bookhaus.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com" 
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition" 
              />
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition duration-300 shadow-lg">
              Login as {isEmployee ? 'Staff' : 'Customer'}
            </button>
            
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
               <p className="text-gray-500 text-sm">
                Don't have an account? 
                <Link href="/auth/register" className="text-blue-900 font-bold hover:underline ml-1">Register here</Link>
              </p>
              <Link href="/auth" className="block mt-4 text-xs text-gray-400 hover:text-gray-900 transition">
                ← Back to selection
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}