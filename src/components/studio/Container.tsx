"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export function Container({ children, className, width = 'default' }: { children: React.ReactNode; className?: string, width?: 'default' | 'narrow' | 'reading' }) {
  return (
    <div className={cn(
      "mx-auto px-4 sm:px-6 lg:px-12 w-full",
      width === 'default' && "max-w-[1200px]",
      width === 'narrow' && "max-w-[740px]",
      width === 'reading' && "max-w-[640px]",
      className
    )}>
      {children}
    </div>
  );
}
