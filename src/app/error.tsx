'use client';

import React from 'react';

// В Next.js 13+ (с App Router) файл, который используется для глобальной обработки ошибок,
// должен называться error.tsx, а не global-error.tsx

export interface GlobalErrorProps {}

export default function Error({}: GlobalErrorProps) {
  // оскільки компонент "Error" замінює кореневий layout "RootLayout", додаємо йому власні теги <html>, <body>
  return (
    <html>
      <body>
        <div>
          <p>Something globally went wrong</p>
        </div>
      </body>
    </html>
  );
}
