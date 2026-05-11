import React from 'react';
import { Layout } from '../components/Layout';

export default function Contact() {
  const contactDetails = [
    {
      icon: 'pi-envelope',
      label: 'Email',
      value: 'hello@bookhaus.com',
      subtext: 'For general inquiries and technical questions',
      italic: true,
    },
    {
      icon: 'pi-phone',
      label: 'Phone',
      value: '(555) 555-BOOK',
      subtext: 'For order support and quick questions',
      italic: false,
    },
    {
      icon: 'pi-map-marker',
      label: 'Address',
      value: '123 Library Lane, Reading City',
      subtext: 'Demo Location',
      italic: false,
    },
  ];

  return (
    <Layout>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 flex items-center gap-4 mb-4">
            Contact Us <span className="text-3xl">📱</span>
          </h1>
          <p className="text-lg text-gray-600">
            We love hearing from our fellow book enthusiasts!
          </p>
        </header>

        {/* Contact Info Cards */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
          {contactDetails.map((detail, index) => (
            <div
              key={detail.label}
              className={`flex flex-col md:flex-row p-8 gap-4 ${
                index !== contactDetails.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="md:w-1/3 flex items-center font-bold text-gray-900 gap-3">
                <i className={`pi ${detail.icon}`}></i> {detail.label}
              </div>
              <div className="flex-1">
                <span className={`${detail.italic ? 'italic' : ''} text-gray-700 block`}>
                  {detail.value}
                </span>
                <span className="text-xs text-gray-400">{detail.subtext}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Business Hours Section */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-8 py-4 font-bold border-b border-gray-200">
            Business Hours
          </div>
          <div className="p-8">
            <p className="text-gray-600 mb-6">
              We are an online demo store, so our website is always open!
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl flex items-center gap-4 text-blue-800">
              <i className="pi pi-info-circle text-xl"></i>
              <div>
                <strong className="block">Customer Support:</strong>
                <span className="text-sm">
                  Monday – Friday, 9:00 AM – 5:00 PM (PST)
                </span>
              </div>
            </div>

            <p className="mt-8 italic font-medium text-gray-800">
              Thank you for visiting Bookhaus Bookstore!
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}