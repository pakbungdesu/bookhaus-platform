// pages/customer/profile.jsx
import { useState } from 'react';

export default function Profile({ customer, orderHistory }) {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">My Profile 👤</h1>
        
        <div className="flex border-b mb-6 gap-8">
          <button onClick={() => setActiveTab('details')} className={`pb-4 px-1 text-sm font-semibold border-b-2 ${activeTab === 'details' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}>
            Account Details
          </button>
          <button onClick={() => setActiveTab('history')} className={`pb-4 px-1 text-sm font-semibold border-b-2 ${activeTab === 'history' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}>
            Order History
          </button>
        </div>

        {activeTab === 'details' ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-2 gap-8">
             <div><label className="text-xs font-bold text-gray-400 uppercase">Full Name</label><p>{customer.person.firstname} {customer.person.lastname}</p></div>
             <div><label className="text-xs font-bold text-gray-400 uppercase">Email</label><p>{customer.person.email}</p></div>
             <div className="col-span-2 flex gap-4 mt-8">
               <a href="/customer/edit" className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg">Edit Profile</a>
               <button className="bg-red-600 text-white px-6 py-2 rounded-lg">Logout</button>
             </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr><th className="px-6 py-4">Order ID</th><th>Date</th><th>Status</th><th className="text-right px-6">Total</th></tr>
              </thead>
              <tbody>
                {orderHistory.map(order => (
                  <tr key={order.orderId} className="border-b last:border-0">
                    <td className="px-6 py-4 font-bold text-blue-600">#{order.orderId}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black">{order.status}</span></td>
                    <td className="text-right px-6 font-bold">${order.orderTotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}