import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer"
import "./globals.css"

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Yrgos LIA-event 2025",
  description: "Mingeleventet som för samman branschen och framtidens kreatörer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
