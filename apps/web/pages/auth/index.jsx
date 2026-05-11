import React from 'react';
import Link from 'next/link';
import { Layout } from '../../components/Layout';

export default function SignInGateway() {
  return (
    <Layout>
      <main className="min-h-[80vh] flex items-center justify-center p-6 bg-gray-50/50">
        <div className="bg-white p-12 rounded-3xl shadow-2xl shadow-gray-200 border border-gray-100 max-w-2xl w-full text-center">
          
          {/* Logo Section */}
          <div className="py-6">
            <img 
              src="/images/logo.png" 
              alt="Bookhaus" 
              className="max-w-[80px] mx-auto"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Welcome to Bookhaus Bookstore
          </h2>
          
          <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-md mx-auto">
            Your portal for the finest collection of literature and professional management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Customer Login Link */}
            <Link 
              href="/auth/login?role=customer" 
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 hover:-translate-y-1 transition duration-300 shadow-lg shadow-gray-200"
            >
              <i className="pi pi-user"></i> Customer Login
            </Link>
            
            {/* Employee Login Link */}
            <Link 
              href="/auth/login?role=employee" 
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold border border-gray-200 hover:bg-gray-200 hover:-translate-y-1 transition duration-300"
            >
              <i className="pi pi-briefcase"></i> Employee Portal
            </Link>
          </div>

          <p className="mt-10 text-sm text-gray-400">
            Don't have an account? <Link href="/auth/register" className="text-blue-600 font-bold hover:underline">Register here</Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}