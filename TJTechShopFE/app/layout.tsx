import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './(public)/footer/page'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TJ Tech Shop',
  description: 'Created by: Taylor Joostema',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Script src="https://scripts.sirv.com/sirvjs/v3/sirv.js" />
      </body>
    </html>
  )
}
