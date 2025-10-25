"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Whitepaper() {
  const { t, language } = useLanguage();

  const roadmapItems = language === 'id' ? [
    { phase: 'Q1 2025', title: 'Foundation', items: ['Peluncuran platform MVP', 'Integrasi Solana blockchain', 'Model AI dasar'] },
    { phase: 'Q2 2025', title: 'Growth', items: ['Sistem subscription', 'Pay-per-use integration', 'Dashboard analytics'] },
    { phase: 'Q3 2025', title: 'Scaling', items: ['B2B partnerships', 'Multi-language support', 'Advanced AI models'] },
    { phase: 'Q4 2025', title: 'Expansion', items: ['Mobile apps', 'API marketplace', 'Enterprise features'] },
  ] : [
    { phase: 'Q1 2025', title: 'Foundation', items: ['MVP platform launch', 'Solana blockchain integration', 'Basic AI models'] },
    { phase: 'Q2 2025', title: 'Growth', items: ['Subscription system', 'Pay-per-use integration', 'Analytics dashboard'] },
    { phase: 'Q3 2025', title: 'Scaling', items: ['B2B partnerships', 'Multi-language support', 'Advanced AI models'] },
    { phase: 'Q4 2025', title: 'Expansion', items: ['Mobile apps', 'API marketplace', 'Enterprise features'] },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FFC0CB] to-[#D8A39D] text-transparent bg-clip-text">
              {t.whitepaperTitle}
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 leading-relaxed">
                {language === 'id' 
                  ? 'Platform AI Customer Service berbasis blockchain dengan model bisnis token NANA untuk akses yang fleksibel dan scalable.'
                  : 'Blockchain-based AI Customer Service platform with NANA token business model for flexible and scalable access.'}
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-8 text-gray-800">{t.goalsTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-pink-600">
                <h3 className="text-xl font-bold mb-3 text-pink-600">
                  {language === 'id' ? 'Demokratisasi AI CS' : 'Democratize AI CS'}
                </h3>
                <p className="text-gray-600">
                  {language === 'id'
                    ? 'Membuat layanan pelanggan AI dapat diakses oleh bisnis dari semua ukuran dengan harga yang terjangkau dan transparan.'
                    : 'Make AI customer service accessible to businesses of all sizes with affordable and transparent pricing.'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-pink-600">
                <h3 className="text-xl font-bold mb-3 text-pink-600">
                  {language === 'id' ? 'Integrasi Blockchain' : 'Blockchain Integration'}
                </h3>
                <p className="text-gray-600">
                  {language === 'id'
                    ? 'Memanfaatkan teknologi blockchain Solana untuk transaksi yang aman, cepat, dan otomatis dengan biaya rendah.'
                    : 'Leverage Solana blockchain technology for secure, fast, and automatic transactions with low fees.'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-amber-600">
                <h3 className="text-xl font-bold mb-3 text-amber-600">
                  {language === 'id' ? 'Skalabilitas' : 'Scalability'}
                </h3>
                <p className="text-gray-600">
                  {language === 'id'
                    ? 'Platform yang dirancang untuk scale dari UMKM hingga enterprise dengan infrastruktur yang robust.'
                    : 'Platform designed to scale from SMEs to enterprises with robust infrastructure.'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-3 text-green-600">
                  {language === 'id' ? 'Transparansi' : 'Transparency'}
                </h3>
                <p className="text-gray-600">
                  {language === 'id'
                    ? 'Semua transaksi tercatat on-chain untuk transparansi penuh dan audit yang mudah.'
                    : 'All transactions recorded on-chain for full transparency and easy auditing.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-8 text-gray-800">{t.tokenomicsTitle}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-pink-50 to-amber-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4 text-pink-600">{t.subscriptionTitle}</h3>
                <p className="text-gray-700 mb-4">{t.subscriptionDesc}</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    {language === 'id' ? 'Bulanan: 1000 NANA/bulan' : 'Monthly: 1000 NANA/month'}
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    {language === 'id' ? 'Per Jam: 50 NANA/jam' : 'Hourly: 50 NANA/hour'}
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    {language === 'id' ? 'Unlimited queries dalam periode aktif' : 'Unlimited queries during active period'}
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-pink-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4 text-amber-600">{t.payPerUseTitle}</h3>
                <p className="text-gray-700 mb-4">{t.payPerUseDesc}</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    {language === 'id' ? 'Basic query: 5 NANA' : 'Basic query: 5 NANA'}
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    {language === 'id' ? 'Advanced query: 10 NANA' : 'Advanced query: 10 NANA'}
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    {language === 'id' ? 'Pemotongan otomatis dari wallet' : 'Automatic deduction from wallet'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center">{t.roadmapTitle}</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#FFC0CB] to-[#D8A39D] hidden md:block"></div>
              
              <div className="space-y-12">
                {roadmapItems.map((item, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 md:px-8">
                      <div className={`bg-white p-6 rounded-xl shadow-lg ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <div className="text-sm font-semibold text-pink-600 mb-2">{item.phase}</div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                        <ul className={`space-y-2 text-gray-600 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          {item.items.map((subitem, subindex) => (
                            <li key={subindex} className="flex items-start">
                              <span className="mr-2">✨</span>
                              {subitem}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="hidden md:block w-8 h-8 bg-gradient-to-r from-[#FFC0CB] to-[#D8A39D] rounded-full border-4 border-white shadow-lg flex-shrink-0"></div>
                    <div className="flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-8 text-gray-800">
              {language === 'id' ? 'Arsitektur Teknis' : 'Technical Architecture'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{t.blockchainTitle}</h3>
                <p className="text-gray-600">{t.blockchainDesc}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{t.web2BackendTitle}</h3>
                <p className="text-gray-600">{t.web2BackendDesc}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg md:col-span-2">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{t.scalingTitle}</h3>
                <p className="text-gray-600">{t.scalingDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
