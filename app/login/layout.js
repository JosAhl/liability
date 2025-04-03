import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Login - Yrgos LIA-event 2025",
  description: "Logga in till Yrgos LIA-event",
};

export default function AuthLayout({ children }) {
  return (
    <div className="auth-container">
      {children}
    </div>
  );
}