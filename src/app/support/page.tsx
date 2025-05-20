// src/app/support/page.tsx
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Support() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-12 px-6 flex-grow">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Support</h1>
        <p className="text-lg text-gray-600 mb-6">
          Have questions or need assistance? Our team is here to help you with DingerZone.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            Email us at{' '}
            <a href="mailto:support@dingerzone.com" className="text-blue-600 hover:underline">
              support@dingerzone.com
            </a>{' '}
            and we’ll get back to you as soon as possible.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const metadata = {
  title: 'DingerZone Support',
  description: 'Contact the DingerZone support team for assistance with our app and services.',
};