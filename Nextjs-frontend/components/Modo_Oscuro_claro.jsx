'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return; // 

    const storedTheme = localStorage.getItem('color-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window === 'undefined') return; // 👈 protección extra
    const event = new Event('dark-mode');

    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      setIsDark(true);
    }

    document.dispatchEvent(event);
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 
                 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 
                 rounded-lg text-sm p-2.5"
    >
      {!isDark ? (
        // ícono luna
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        // ícono sol
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 
              8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 
              001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414z"
          />
        </svg>
      )}
    </button>
  );
}
