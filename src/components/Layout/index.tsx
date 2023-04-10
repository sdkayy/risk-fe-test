import React from 'react';
import { Header } from '../Header';
import { Ubuntu_Mono } from 'next/font/google';

const ubuntuMono = Ubuntu_Mono({ subsets: ['latin'], weight: ['400', '700'] });

export const Layout = ({ children }: any) => {
  return (
    <div className={`w-full h-full flex flex-col ${ubuntuMono.className}`}>
      <Header />
      {children}
    </div>
  );
};
