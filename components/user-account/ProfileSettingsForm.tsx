'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Camera, Twitter, Github, Linkedin, Globe, Plus, Trash2 } from 'lucide-react'

interface SocialLink {
  id: string
  type: 'twitter' | 'github' | 'linkedin' | 'website'
  url: string
}

interface ProfileFormData {
  fullName: string
  email: string
  bio: string
  avatarUrl?: string
  socialLinks: SocialLink[]
}

interface ProfileSettingsFormProps {
  /** Initial form values */
  initialValues?: ProfileFormData
  /** Form submit handler */
  onSubmit?: (data: ProfileFormData) => void
  /** Is form submitting */
  isSubmitting?: boolean
  /** Custom class name */
  className?: string
}

const socialIcons = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  website: Globe,
}

const socialLabels = {
  twitter: 'Twitter',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  website: 'Website',
}

export function ProfileSettingsForm({
  initialValues = {
    fullName: '',
    email: '',
    bio: '',
    socialLinks: [],
  },
  onSubmit,
  isSubmitting = false,
  className,
}: ProfileSettingsFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>(initialValues)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  const addSocialLink = (type: SocialLink['type']) => {
    setFormData({
      ...formData,
      socialLinks: [
        ...formData.socialLinks,
        { id: Date.now().toString(), type, url: '' },
      ],
    })
  }

  const updateSocialLink = (id: string, url: string) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.map((link) =>
        link.id === id ? { ...link, url } : link
      ),
    })
  }

  const removeSocialLink = (id: string) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter((link) => link.id !== id),
    })
  }

  const initials = formData.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?'

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-8', className)}>
      {/* Profile Photo */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Profile Photo</h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {formData.avatarUrl ? (
                <img
                  src={formData.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-primary">{initials}</span>
              )}
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 p-2 bg-background border rounded-full shadow-sm hover:bg-accent transition-colors"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1">
            <Button type="button" variant="outline" size="sm">
              Upload Photo
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              JPG, PNG or GIF. Max 2MB.
            </p>
          </div>
        </div>
      </Card>

      {/* Basic Info */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Basic Information</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full h-24 px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Tell us about yourself..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.bio.length}/280 characters
            </p>
          </div>
        </div>
      </Card>

      {/* Social Links */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Social Links</h3>
        <div className="space-y-3">
          {formData.socialLinks.map((link) => {
            const Icon = socialIcons[link.type]
            return (
              <div key={link.id} className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateSocialLink(link.id, e.target.value)}
                  className="flex-1 h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder={`Your ${socialLabels[link.type]} URL`}
                />
                <button
                  type="button"
                  onClick={() => removeSocialLink(link.id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )
          })}

          {/* Add link buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            {(['twitter', 'github', 'linkedin', 'website'] as const).map((type) => {
              const Icon = socialIcons[type]
              const hasLink = formData.socialLinks.some((l) => l.type === type)
              if (hasLink) return null

              return (
                <Button
                  key={type}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addSocialLink(type)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  Add {socialLabels[type]}
                </Button>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
