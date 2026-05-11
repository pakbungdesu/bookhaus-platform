import React from 'react';
import { Layout } from '../components/Layout';

export default function Services() {
  const coreServices = [
    { 
      icon: 'pi-book', 
      title: 'Curated Selection', 
      desc: 'Hand-picked titles across Fiction, Non-Fiction, and Tech.' 
    },
    { 
      icon: 'pi-truck', 
      title: 'Fast Shipping', 
      desc: 'Orders processed in 1-2 days. Safe delivery guaranteed.' 
    },
    { 
      icon: 'pi-calendar-plus', 
      title: 'Pre-Orders', 
      desc: 'Be the first to read. Pre-order upcoming bestsellers.' 
    },
    { 
      icon: 'pi-ticket', 
      title: 'Digital Gift Cards', 
      desc: 'The perfect gift for book lovers. Valid everywhere.' 
    }
  ];

  return (
    <Layout>
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Services We Offer 🚚💨
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            At BookHaus Bookstore, we aim to provide more than just books; 
            we offer services designed to enhance your reading life.
          </p>
        </section>

        <hr className="border-gray-200 mb-16" />

        {/* Core Services Grid */}
        <h2 className="text-xl font-bold mb-8 text-gray-900">Our Core Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-16 w-full">
          {coreServices.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition text-center flex flex-col items-center"
            >
              <i className={`pi ${service.icon} text-4xl text-gray-900 mb-6`}></i>
              <h3 className="font-bold text-lg mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* Feature Highlight Box */}
        <div className="bg-white rounded-3xl border border-gray-200 p-10 flex flex-col md:flex-row items-center gap-10 shadow-lg shadow-gray-100">
          <div className="text-5xl text-yellow-400">
            <i className="pi pi-sparkles"></i>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Personalized Recommendations
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our intelligent system analyzes your past purchases and browsing history 
              to suggest books tailored exactly to your unique tastes.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}