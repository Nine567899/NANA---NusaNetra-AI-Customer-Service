"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function About() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FFC0CB] to-[#D8A39D] text-transparent bg-clip-text">
              {t.aboutTitle}
            </h1>
          </div>

          <div className="mb-20">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-pink-50 to-amber-50 p-12 rounded-3xl shadow-xl">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">{t.visionTitle}</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                {t.visionDesc}
              </p>
              
              <h2 className="text-4xl font-bold mb-6 text-gray-800">{t.missionTitle}</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                {t.missionDesc}
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center">
              {language === 'id' ? 'Mengapa NANA AI?' : 'Why NANA AI?'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover-lift">
                <div className="text-5xl mb-4 text-pink-600">✨</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {language === 'id' ? 'Aman & Terdesentralisasi' : 'Secure & Decentralized'}
                </h3>
                <p className="text-gray-600">
                  {language === 'id'
                    ? 'Semua transaksi diamankan oleh blockchain Solana dengan kecepatan tinggi dan biaya rendah.'
                    : 'All transactions secured by Solana blockchain with high speed and low fees.'}
                </p>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover-lift">
                <div className="text-5xl mb-4 text-pink-600">✨</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {language === 'id' ? 'Cepat & Efisien' : 'Fast & Efficient'}
                </h3>
                <p className="text-gray-600">
                  {language === 'id'
                    ? 'AI canggih memberikan respons instant dengan akurasi tinggi untuk kepuasan pelanggan maksimal.'
                    : 'Advanced AI provides instant responses with high accuracy for maximum customer satisfaction.'}
                </p>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover-lift">
                <div className="text-5xl mb-4 text-amber-600">✨</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {language === 'id' ? 'Harga Fleksibel' : 'Flexible Pricing'}
                </h3>
                <p className="text-gray-600">
                  {language === 'id'
                    ? 'Model pay-per-use dan subscription yang sesuai dengan kebutuhan bisnis Anda.'
                    : 'Pay-per-use and subscription models that fit your business needs.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">
              {language === 'id' ? 'Teknologi Kami' : 'Our Technology'}
            </h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-pink-600">Solana Blockchain</h3>
                <p className="text-gray-600">
                  {language === 'id'
                    ? 'Blockchain tercepat dengan 65,000 TPS dan biaya transaksi ~$0.00025'
                    : 'Fastest blockchain with 65,000 TPS and ~$0.00025 transaction fees'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-pink-600">Advanced AI Models</h3>
                <p className="text-gray-600">
                  {language === 'id'
                    ? 'Model bahasa terkini untuk respons yang natural dan akurat'
                    : 'Latest language models for natural and accurate responses'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-amber-600">Web3 Integration</h3>
                <p className="text-gray-600">
                  {language === 'id'
                    ? 'Integrasi seamless dengan wallet Phantom dan Solflare'
                    : 'Seamless integration with Phantom and Solflare wallets'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-green-600">Scalable Infrastructure</h3>
                <p className="text-gray-600">
                  {language === 'id'
                    ? 'Backend yang robust untuk menangani jutaan queries'
                    : 'Robust backend to handle millions of queries'}
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#FFC0CB] to-[#D8A39D] text-white p-12 rounded-3xl shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">{t.contactTitle}</h2>
            <p className="text-xl mb-8 text-pink-100">
              {language === 'id'
                ? 'Tertarik untuk berkolaborasi atau ingin tahu lebih lanjut? Hubungi kami!'
                : 'Interested in collaborating or want to learn more? Contact us!'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@nanaai.io"
                className="px-8 py-4 bg-white text-pink-700 rounded-lg font-semibold hover-lift shadow-lg"
              >
                contact@nanaai.io
              </a>
              <a
                href="https://twitter.com/nanaai_official"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-pink-700 transition-all duration-300"
              >
                {language === 'id' ? 'Ikuti di Twitter' : 'Follow on Twitter'}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
