import React from 'react';
import {Layout} from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  const whyWeRead = [
    {
      title: "The Escape",
      icon: "pi-compass",
      img: "/images/whywe2.jpg",
      text: "Travel to distant lands and different eras without ever leaving your favorite chair.",
      reverse: false
    },
    {
      title: "The Connection",
      icon: "pi-heart",
      img: "/images/whywe3.jpg",
      text: "Discover voices that echo your own heart and stories that broaden your world.",
      reverse: true
    },
    {
      title: "The Stillness",
      icon: "pi-moon",
      img: "/images/whywe4.jpg",
      text: "In a fast-paced world, a book is an invitation to breathe, reflect, and just be.",
      reverse: false
    }
  ];

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="w-full overflow-hidden">
        <img 
          src="/images/bookhaus.png" 
          alt="Hero Banner" 
          className="w-full h-64 md:h-[400px] object-cover object-center" 
        />
      </div>

      <main className="max-w-5xl mx-auto px-5 py-16">
        {/* Headlines */}
        <div className="py-10 mt-10">
          <h1 className="text-5xl text-gray-900 text-center font-bold">Lose Yourself in a Story</h1>
          <h1 className="text-5xl text-gray-900 text-center font-bold mt-4 py-2">
            Find Yourself in <span className="italic text-white bg-black px-6 py-1">Books</span>
          </h1>
        </div>

        {/* Why We Read Section */}
        <section className="max-w-4xl mx-auto pb-24 text-center">
          <img src="/images/whywe1.webp" alt="bookshelf" className="max-w-[50%] mx-auto" />
          
          <h2 className="text-4xl font-bold my-16">Why We Read?</h2>

          {whyWeRead.map((item) => (
            <div 
              key={item.title} 
              className={`flex flex-col md:flex-row items-center gap-10 mb-16 text-left ${item.reverse ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 flex justify-center">
                <img src={item.img} alt={item.title} className="max-w-[80%]" />
              </div>
              <div className="flex-1 px-8">
                <div className="flex items-center gap-4 mb-4">
                  <i className={`pi ${item.icon} text-4xl text-gray-900`}></i>
                  <h3 className="text-3xl font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-500 text-lg leading-relaxed max-w-[400px]">
                  {item.text}
                </p>
              </div>
            </div>
          ))}

          {/* CTA Button */}
          <Link 
            href="/book/search" 
            className="inline-block bg-gray-900 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-black hover:-translate-y-1 transition duration-300"
          >
            <i className="pi pi-book mr-2"></i> Browse Our Collection
          </Link>
        </section>
      </main>
    </Layout>
  );
}
