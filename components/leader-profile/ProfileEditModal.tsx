'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  X, 
  Camera, 
  Bold, 
  Italic, 
  Link2, 
  Plus, 
  Trash2,
  Youtube,
  Twitter,
  Github,
  Linkedin,
  Globe
} from 'lucide-react'

interface SocialLink {
  id: string
  type: 'twitter' | 'github' | 'linkedin' | 'website' | 'other'
  url: string
}

interface ProfileEditModalProps {
  /** Is the modal open */
  isOpen: boolean
  /** Close handler */
  onClose: () => void
  /** Save handler */
  onSave: (data: ProfileFormData) => void
  /** Initial values */
  initialValues?: ProfileFormData
  /** Custom class name */
  className?: string
}

interface ProfileFormData {
  fullName: string
  tagline: string
  bio: string
  featuredVideo: string
  socialLinks: SocialLink[]
  avatarUrl?: string
}

const socialIcons: Record<SocialLink['type'], typeof Twitter> = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  website: Globe,
  other: Link2,
}

export function ProfileEditModal({
  isOpen,
  onClose,
  onSave,
  initialValues,
  className,
}: ProfileEditModalProps) {
  const [formData, setFormData] = useState<ProfileFormData>(
    initialValues || {
      fullName: '',
      tagline: '',
      bio: '',
      featuredVideo: '',
      socialLinks: [],
    }
  )

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [
        ...formData.socialLinks,
        { id: Date.now().toString(), type: 'website', url: '' },
      ],
    })
  }

  const updateSocialLink = (id: string, updates: Partial<SocialLink>) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.map((link) =>
        link.id === id ? { ...link, ...updates } : link
      ),
    })
  }

  const removeSocialLink = (id: string) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter((link) => link.id !== id),
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'fixed inset-x-4 top-[10%] max-h-[80vh] mx-auto max-w-lg bg-background rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Edit page</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-amber-400 hover:bg-amber-500 text-black">
              Save
            </Button>
          </div>
        </div>

        {/* Form content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile photo */}
          <div>
            <label className="text-sm font-medium mb-2 block">Profile photo</label>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {formData.avatarUrl ? (
                    <img
                      src={formData.avatarUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      {formData.fullName?.charAt(0) || '?'}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 p-2 bg-background border rounded-full shadow-sm hover:bg-accent transition-colors"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Full name */}
          <div>
            <label className="text-sm font-medium mb-2 block">Full name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Jane"
            />
          </div>

          {/* What are you creating */}
          <div>
            <label className="text-sm font-medium mb-2 block">What are you creating?</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-muted-foreground"
              placeholder="creating piano music, building Coronarelief.org, posting"
            />
          </div>

          {/* About me */}
          <div>
            <label className="text-sm font-medium mb-2 block">About me</label>
            <div className="border rounded-lg overflow-hidden">
              {/* Rich text toolbar */}
              <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
                <button
                  type="button"
                  className="p-1.5 rounded hover:bg-accent transition-colors"
                >
                  <span className="text-sm font-medium">A</span>
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded hover:bg-accent transition-colors"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded hover:bg-accent transition-colors"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded hover:bg-accent transition-colors"
                >
                  <Link2 className="h-4 w-4" />
                </button>
              </div>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full h-24 px-3 py-2 text-sm focus:outline-none resize-none"
                placeholder="Hey there! You can get me a coffee here - cheers! :)"
              />
            </div>
          </div>

          {/* Featured video */}
          <div>
            <label className="text-sm font-medium mb-2 block">Featured video</label>
            <div className="relative">
              <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="url"
                value={formData.featuredVideo}
                onChange={(e) => setFormData({ ...formData, featuredVideo: e.target.value })}
                className="w-full h-10 pl-10 pr-3 rounded-lg border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-muted-foreground"
                placeholder="Paste your YouTube or Vimeo link here"
              />
            </div>
          </div>

          {/* Social links */}
          <div>
            <label className="text-sm font-medium mb-2 block">Social links</label>
            <div className="space-y-2">
              {formData.socialLinks.map((link) => {
                const Icon = socialIcons[link.type]
                return (
                  <div key={link.id} className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) =>
                          updateSocialLink(link.id, { url: e.target.value })
                        }
                        className="w-full h-10 pl-10 pr-3 rounded-lg border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="https://www.example.com"
                      />
                    </div>
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
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSocialLink}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add social link
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
