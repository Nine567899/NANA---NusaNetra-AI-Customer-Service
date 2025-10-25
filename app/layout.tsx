import type { Metadata } from 'next'
import './globals.css'
import WalletContextProvider from '@/components/WalletContextProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Web3 AI Customer Service | Layanan Pelanggan AI Web3',
  description: 'Decentralized AI-powered customer support with Solana integration | Dukungan pelanggan AI terdesentralisasi dengan integrasi Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <WalletContextProvider>
            {children}
          </WalletContextProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
