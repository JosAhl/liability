'use client'
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import Footer from "@/components/Footer"

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/login');
  const isRegPage = pathname.startsWith('/register');

  return (
    <html lang="en" className={inter.className}>
      <body>
        {/* Only show Navbar if not on auth pages */}
        <header>
        {!isAuthPage && !isRegPage && <Navbar />}
        </header>
        <main className={isAuthPage ? 'auth-page' : ''}>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
