import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar } from './components'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Plex',
  description: 'Get Movies,Tv Shows Recommendation/Suggestions based on Genre.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className="bg-[#071b38]"> */}
      <body className="bg-[#071b38] body">
        <Navbar />

        {children}

      </body>
    </html>
  )
}
