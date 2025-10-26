"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-amber-50 to-rose-50 opacity-70"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-block mb-6">
                <span className="text-6xl diamond-sparkle">✨</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#FFC0CB] via-pink-600 to-[#D8A39D] text-transparent bg-clip-text leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
                {t.heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/demo"
                  className="px-10 py-4 bg-gradient-to-r from-[#FFC0CB] to-[#D8A39D] text-white rounded-lg font-semibold hover-lift shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] text-center"
                >
                  {t.heroCtaDemo}
                </Link>
                <Link
                  href="/demo"
                  className="px-10 py-4 bg-gradient-to-r from-[#FFC0CB] to-[#D8A39D] text-white rounded-lg font-semibold hover-lift shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] text-center"
                >
                  {t.heroCtaConnect}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-2xl shadow-lg hover-lift border border-pink-100">
                <div className="text-4xl mb-4 text-pink-600">✨</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{t.featureTitle1}</h3>
                <p className="text-gray-600 leading-relaxed">{t.featureDesc1}</p>
              </div>

              <div className="p-8 bg-white rounded-2xl shadow-lg hover-lift border border-pink-100">
                <div className="text-4xl mb-4 text-pink-600">✨</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{t.featureTitle2}</h3>
                <p className="text-gray-600 leading-relaxed">{t.featureDesc2}</p>
              </div>

              <div className="p-8 bg-white rounded-2xl shadow-lg hover-lift border border-amber-100">
                <div className="text-4xl mb-4 text-amber-600">✨</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{t.featureTitle3}</h3>
                <p className="text-gray-600 leading-relaxed">{t.featureDesc3}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FFC0CB] to-[#D8A39D] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'id' 
                ? 'Siap Mengubah Layanan Pelanggan Anda?'
                : 'Ready to Transform Your Customer Service?'}
            </h2>
            <p className="text-xl mb-8 text-pink-100">
              {language === 'id'
                ? 'Bergabunglah dengan masa depan dukungan pelanggan AI dengan teknologi blockchain'
                : 'Join the future of AI-powered customer support with blockchain technology'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="px-8 py-4 bg-white text-pink-700 rounded-lg font-semibold hover-lift shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t.heroCtaDemo}
              </Link>
              <Link
                href="/whitepaper"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-pink-700 transition-all duration-300"
              >
                {t.navWhitepaper}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
