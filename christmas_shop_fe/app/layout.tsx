import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './navbar/page'
import Footer from './footer/page'
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Online Christmas Shop',
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
        <main className="flex flex-col items-center justify-between 2xl:px-96 lg:px-56">
          {children}
        </main>
        <Footer />
        <Script src="https://scripts.sirv.com/sirvjs/v3/sirv.js" />
      </body>
    </html>
  )
}
