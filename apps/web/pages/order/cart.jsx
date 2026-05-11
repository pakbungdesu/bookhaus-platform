// pages/order/cart.jsx
import { useState } from 'react';

export default function Cart({ initialCart, initialTotal }) {
  const [cart, setCart] = useState(initialCart || []);
  const [total, setTotal] = useState(initialTotal || 0);

  const updateQty = async (id, qty) => {
    const res = await fetch('/order/cart/update', { 
      method: 'POST', 
      body: JSON.stringify({ productId: id, quantity: qty }),
      headers: {'Content-Type': 'application/json'}
    });
    if (res.ok) location.reload(); // Or update state for smoother feel
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <h1 className="p-6 text-2xl font-bold border-b">Shopping Cart</h1>
          <table className="w-full">
            <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4">Book</th>
                <th className="px-6 py-4 text-center">Quantity</th>
                <th className="px-6 py-4 text-right">Subtotal</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.productId} className="border-b border-gray-50">
                  <td className="px-6 py-4 font-medium">{item.book.title}</td>
                  <td className="px-6 py-4 text-center">
                    <input type="number" value={item.quantity} onChange={(e) => updateQty(item.productId, e.target.value)}
                           className="w-16 border rounded text-center" />
                  </td>
                  <td className="px-6 py-4 text-right font-bold">${(item.unitPrice * item.quantity).toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-red-500"><i className="pi pi-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-6 bg-gray-50 flex justify-end gap-4">
             <button className="bg-green-600 text-white px-8 py-2.5 rounded-lg font-bold">Confirm Purchase</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}