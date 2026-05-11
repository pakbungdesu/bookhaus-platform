import { Layout } from '../components/Layout';

export default function About() {
  const sections = [
    { icon: 'pi-book', color: 'text-blue-600', title: 'Our Mission', text: 'To curate a thoughtful collection of books that inspires, educates, and entertains readers of all ages.' },
    { icon: 'pi-globe', color: 'text-green-600', title: 'Our Vibe', text: 'We champion independent voices and diverse genres, creating a space where you can easily find your next great read.' },
    { icon: 'pi-users', color: 'text-purple-600', title: 'Our Promise', text: 'We are committed to providing high-quality books, excellent customer service, and a seamless shopping experience.' }
  ];

  return (
    <Layout>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">About Bookhaus Bookstore 📖✨</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Welcome to <span className="font-bold text-black border-b-2 border-yellow-400">Bookhaus Bookstore</span>.
          </p>
        </section>

        <div className="bg-white p-10 text-center rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
          <div className="space-y-6 text-left">
            {sections.map((s, i) => (
              <section key={i} className="p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md transition duration-300 border border-transparent hover:border-gray-100">
                <h3 className="font-bold text-xl flex items-center gap-3 mb-2">
                  <i className={`pi ${s.icon} ${s.color}`}></i> {s.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{s.text}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}