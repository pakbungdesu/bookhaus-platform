import React from 'react';

export const Footer = () => (
  <footer className="bg-gray-50 pt-12 pb-8 border-t border-gray-200 mt-12">
    <div className="max-w-6xl mx-auto px-4 flex flex-wrap gap-10">
      <div className="flex-1 min-w-[250px]">
        <h3 className="text-xl font-bold tracking-tighter mb-3">BOOKHAUS</h3>
        <p className="text-gray-500 text-sm leading-relaxed">Your cozy corner for literary discovery and passionate reading.</p>
      </div>
      
      <div className="flex-1 min-w-[250px]">
        <h4 className="font-bold mb-4 text-gray-900">Follow Us</h4>
        <div className="space-y-2">
          <a href="#" className="block text-sm text-blue-600 hover:underline">Instagram</a>
          <a href="#" className="block text-sm text-blue-600 hover:underline">Twitter</a>
          <a href="#" className="block text-sm text-blue-600 hover:underline">Facebook</a>
        </div>
      </div>
      
      <div className="flex-1 min-w-[250px]">
        <h4 className="font-bold mb-4 text-gray-900">Contact</h4>
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
          <i className="pi pi-envelope"></i> <span>hello@bookhaus.com</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <i className="pi pi-map-marker"></i> <span>123 Library Lane, Reading City</span>
        </div>
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-4 text-center mt-12">
      <hr className="border-gray-200 mb-6" />
      <p className="text-xs text-gray-400">© 2026 Bookhaus Bookstore Project. Built with NestJS & Next.js.</p>
    </div>
  </footer>
);