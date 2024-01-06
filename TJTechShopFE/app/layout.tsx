import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './navbar/page'
import Footer from './footer/page'
import Script from 'next/script';
import '@fortawesome/fontawesome-svg-core/styles.css';

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
        <Navbar />
        <main className="sm:flex sm:flex-col items-center 2xl:px-96 lg:px-56 min-h-screen overflow-hidden">
          {children}
        </main>
        <Footer />

        {/* <Script src="https://scripts.sirv.com/sirvjs/v3/sirv.js" /> */}
      </body>
    </html>
  )
}
