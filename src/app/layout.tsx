import React from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google'; // імпорт шрифту
import Providers from '@/app/components/providers';
import './globals.css'; // імпорт глобальних стилів

// инициализация шрифта с использованием латинского подмножества, для отрисовки латинских символов.
const font = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
