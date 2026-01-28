'use client'

import { DashboardLayout } from '@/components/dashboard'
import {
  LayoutDashboard,
  FileText,
  Video,
  BookOpen,
  Settings,
  Globe,
  BarChart2,
  CreditCard,
  Users,
} from 'lucide-react'

const SIDEBAR_SECTIONS = [
  {
    title: 'Content',
    items: [
      { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Articles', href: '/dashboard/articles', icon: FileText },
      { label: 'Videos', href: '/dashboard/videos', icon: Video },
      { label: 'Courses', href: '/dashboard/courses', icon: BookOpen },
    ],
  },
  {
    title: 'Platform',
    items: [
      { label: 'Site Settings', href: '/dashboard/settings', icon: Settings },
      { label: 'Domains', href: '/dashboard/domains', icon: Globe },
      { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
      { label: 'Team', href: '/dashboard/team', icon: Users },
    ],
  },
]

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout sidebarSections={SIDEBAR_SECTIONS}>
      {children}
    </DashboardLayout>
  )
}
