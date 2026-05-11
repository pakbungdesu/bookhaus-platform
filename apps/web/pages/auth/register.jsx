import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Register({ isEmployee = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    position: '',
    birthdate: '',
    gender: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account created successfully! 🎉");
        router.push('/auth/login');
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("A network error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 antialiased font-sans">
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200 p-8 md:p-12 max-w-3xl w-full border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-10">
          <img src="/images/logo.png" alt="Logo" className="max-w-[60px] mx-auto mb-4" />
          <div className="flex items-center justify-center gap-3">
            <i className="pi pi-user-plus text-2xl text-gray-900"></i>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              {isEmployee ? "Employee Registration" : "Registration"}
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name Fields */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2">First Name</label>
              <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2">Last Name</label>
              <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition" />
            </div>

            {/* Birthdate */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2">Birthday</label>
              <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition" />
            </div>

            {/* Gender Selection */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2">Gender</label>
              <div className="flex gap-6 pt-2">
                {['Female', 'Male', 'Other'].map((g) => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} className="accent-black" />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            {/* Account Info */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition" />
            </div>

            {/* Contact Info */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2">Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition" />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-bold text-gray-700 mb-2">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition" />
            </div>
          </div>

          <div className="text-center pt-6">
            <button type="submit" className="w-full md:w-auto px-12 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition shadow-xl shadow-gray-200">
              Create Account
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/auth/login" className="text-sm font-semibold text-blue-900 hover:underline transition">
              Already have an account? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}