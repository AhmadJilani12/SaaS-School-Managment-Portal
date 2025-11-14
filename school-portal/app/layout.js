import '../styles/globals.css';

export const metadata = {
  title: 'School Portal - SaaS Management System',
  description: 'A modern school management system built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}