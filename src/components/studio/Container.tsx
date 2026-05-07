"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export function Container({ children, className, width = 'default' }: { children: React.ReactNode; className?: string, width?: 'default' | 'narrow' | 'reading' }) {
  return (
    <div className={cn(
      "mx-auto px-4 sm:px-6 lg:px-12 w-full",
      width === 'default' && "max-w-max",
      width === 'narrow' && "max-w-narrow",
      width === 'reading' && "max-w-(--prose-max)",
      className
    )}>
      {children}
    </div>
  );
}
