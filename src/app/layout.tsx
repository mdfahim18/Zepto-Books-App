import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import LayoutContainer from './LayoutContainer';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Zepto Books Store',
  description: 'Best book shop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={` antialiased`}>
        <LayoutContainer>
          <Navbar />
          {children}
          <Sidebar />
        </LayoutContainer>
      </body>
    </html>
  );
}
