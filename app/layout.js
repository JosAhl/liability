export const metadata = {
  title: "My App",
  description: "My app description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Welcome to My App</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2025 My App</p>
        </footer>
      </body>
    </html>
  );
}
