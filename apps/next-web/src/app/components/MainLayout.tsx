'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Home, Zap, Leaf, Target, Settings, Flame, Award } from 'lucide-react';
import { createPageUrl } from '@foclupus/utils';
import type { PageKey } from '@foclupus/utils';
import { motion } from 'framer-motion';

// ------------------------------------------------
// NAV ITEMS
// ------------------------------------------------
const navItems: Array<{ page: PageKey; name: string; icon: any }> = [
  { page: 'Home', name: 'Home', icon: Home },
  { page: 'FocusMode', name: 'Focus', icon: Zap },
  { page: 'DetoxPath', name: 'Detox', icon: Leaf },
  { page: 'Habits', name: 'Habits', icon: Target },
  { page: 'Profile', name: 'Me', icon: Settings },
];

// ------------------------------------------------
// MAIN LAYOUT
// ------------------------------------------------
export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // active page detection
  const isActive = (page: PageKey) => {
    const url = createPageUrl(page);
    if (page === 'Home') return pathname === '/';
    return pathname.startsWith(url);
  };

  // hide layout on these pages
  const hideLayout =
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/landing') ||
    pathname.startsWith('/focus-mode');

  if (hideLayout) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfcf2]">

      {/* ====================================================== */}
      {/* 1. HEADER — From the SECOND VERSION BUT uses NEXT LINKS */}
      {/* ====================================================== */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b-4 border-[#e8d5c4]/60 shadow-lg z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo → Navigate to Home */}
          <Link href={createPageUrl('Home')}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="h-10 w-10 bg-wolf-red rounded-full flex items-center justify-center shadow-md">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <h1 className="text-xl font-extrabold wolf-text-gradient">Foclupus</h1>
                <p className="text-xs text-[#8b7355]">The Focused Wolf</p>
              </div>
            </motion.div>
          </Link>

          {/* Rank + Settings */}
          <div className="flex items-center space-x-4">

            {/* Rank Badge */}
            <div className="hidden sm:flex items-center space-x-2 bg-[#fdfcf2] p-2 rounded-full border border-[#e8d5c4] shadow-inner">
              <Award className="w-5 h-5 text-[#de8538]" />
              <span className="text-sm font-semibold text-[#2d1810]">Alpha Cub</span>
            </div>

            {/* Settings → Navigate to Profile */}
            <Link href={createPageUrl('Profile')}>
              <motion.button
                className="p-2 rounded-full text-[#8b7355] hover:bg-[#f9f5f0] transition"
                whileHover={{ rotate: 10, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Settings className="w-6 h-6" />
              </motion.button>
            </Link>
          </div>

        </div>
      </header>

      {/* ====================================================== */}
      {/* 2. MAIN CONTENT */}
      {/* ====================================================== */}
      <main className="flex-1 pt-16 pb-20 overflow-auto">
        {children}
      </main>

      {/* ====================================================== */}
      {/* 3. BOTTOM NAV — Second design, but Next.js routing */}
      {/* ====================================================== */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8d5c4] shadow-2xl z-20">
        <div className="max-w-xl mx-auto px-2">
          <div className="flex items-center justify-around h-[70px]">

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.page);

              return (
                <Link 
                  key={item.page}
                  href={createPageUrl(item.page)}
                  className="relative flex flex-col items-center justify-center w-1/5 h-full pt-2 group z-10"
                >
                  {/* Icon + Label */}
                  <div 
                    className={`flex flex-col items-center justify-center p-1 transition-colors duration-200 ${
                      active ? 'text-wolf-red' : 'text-[#8b7355] group-hover:text-[#de8538]'
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-0.5" />
                    <span className="text-xs font-semibold">{item.name}</span>
                  </div>

                  {/* Active Bar */}
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 h-[4px] w-full bg-wolf-red rounded-t-lg shadow-md"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

          </div>
        </div>
      </nav>

    </div>
  );
}
