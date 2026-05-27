'use client'

import { useState } from 'react'
import { SettingsLayout, DangerZone } from '@/components/user-account'
import { Button } from '@/components/ui/button'
import { Settings, User, CreditCard, Shield, Globe, Bell } from 'lucide-react'

const SETTINGS_SECTIONS = [
  {
    title: 'Account',
    items: [
      { label: 'General', href: '/dashboard/settings', icon: Settings },
      { label: 'Profile', href: '/dashboard/settings/profile', icon: User },
      { label: 'Billing', href: '/dashboard/settings/billing', icon: CreditCard },
      { label: 'Security', href: '/dashboard/settings/security', icon: Shield },
    ],
  },
  {
    title: 'Platform',
    items: [
      { label: 'Domains', href: '/dashboard/settings/domains', icon: Globe },
      { label: 'Notifications', href: '/dashboard/settings/notifications', icon: Bell },
    ],
  },
]

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('My Movemental Site')
  const [siteDescription, setSiteDescription] = useState('')

  return (
    <SettingsLayout
      sections={SETTINGS_SECTIONS}
      title="General Settings"
      description="Manage your site settings and preferences."
      saveAction={{
        label: 'Save Changes',
        onClick: () => {
          // Save settings
        },
      }}
    >
      {/* Site Information */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Site Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Site Description
            </label>
            <textarea
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              rows={3}
              placeholder="A brief description of your site..."
              className="w-full px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <DangerZone
        title="Delete Site"
        description="Permanently delete your site and all its content. This action cannot be undone."
        action={{
          label: 'Delete Site',
          onClick: () => {
            // Delete site
          },
          confirmMessage: 'Are you sure you want to delete this site? All content will be permanently removed.',
        }}
      />
    </SettingsLayout>
  )
}
