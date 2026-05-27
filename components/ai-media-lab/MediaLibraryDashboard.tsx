'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CategoryTabs } from './CategoryTabs'
import { MediaCard } from './MediaCard'
import { 
  Plus, 
  Upload, 
  Search, 
  Grid, 
  List,
  Folder,
  Image,
  Video,
  Music,
  FileText,
  Settings,
  HelpCircle
} from 'lucide-react'

interface MediaItem {
  id: string
  title: string
  type: 'video' | 'image' | 'audio' | 'document'
  thumbnailUrl?: string
  duration?: string
  lastModified?: string
  folderId?: string
}

interface Folder {
  id: string
  name: string
  icon?: 'folder' | 'image' | 'video' | 'audio' | 'document'
}

interface MediaLibraryDashboardProps {
  /** Media items */
  media: MediaItem[]
  /** Folders */
  folders?: Folder[]
  /** Selected folder ID */
  selectedFolderId?: string | null
  /** Folder selection handler */
  onFolderSelect?: (folderId: string | null) => void
  /** Media click handler */
  onMediaClick?: (mediaId: string) => void
  /** Upload handler */
  onUpload?: () => void
  /** Create new handler */
  onCreateNew?: () => void
  /** Custom class name */
  className?: string
}

const folderIcons = {
  folder: Folder,
  image: Image,
  video: Video,
  audio: Music,
  document: FileText,
}

export function MediaLibraryDashboard({
  media,
  folders = [],
  selectedFolderId = null,
  onFolderSelect,
  onMediaClick,
  onUpload,
  onCreateNew,
  className,
}: MediaLibraryDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeTab, setActiveTab] = useState('all')

  const filteredMedia = media.filter((item) => {
    // Filter by folder
    if (selectedFolderId && item.folderId !== selectedFolderId) {
      return false
    }

    // Filter by search
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by tab/type
    if (activeTab !== 'all' && item.type !== activeTab) {
      return false
    }

    return true
  })

  const tabs = [
    { id: 'all', label: 'All Media' },
    { id: 'video', label: 'Videos', icon: Video },
    { id: 'image', label: 'Images', icon: Image },
    { id: 'audio', label: 'Audio', icon: Music },
  ]

  return (
    <div className={cn('flex h-full', className)}>
      {/* Sidebar */}
      <aside className="w-64 border-r p-4 flex flex-col">
        {/* Actions */}
        <div className="space-y-2 mb-6">
          <Button onClick={onCreateNew} className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Create New
          </Button>
          <Button onClick={onUpload} variant="outline" className="w-full gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>

        {/* Folders */}
        <div className="flex-1">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Library
          </h3>
          <nav className="space-y-1">
            <button
              onClick={() => onFolderSelect?.(null)}
              className={cn(
                'flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md transition-colors',
                selectedFolderId === null
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <Folder className="h-4 w-4" />
              All Media
            </button>

            {folders.map((folder) => {
              const Icon = folderIcons[folder.icon || 'folder']
              return (
                <button
                  key={folder.id}
                  onClick={() => onFolderSelect?.(folder.id)}
                  className={cn(
                    'flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md transition-colors',
                    selectedFolderId === folder.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {folder.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Bottom nav */}
        <div className="border-t pt-4 mt-4 space-y-1">
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground rounded-md transition-colors">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground rounded-md transition-colors">
            <HelpCircle className="h-4 w-4" />
            Help
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search media..."
                className="w-full h-10 pl-10 pr-4 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'grid'
                    ? 'bg-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'list'
                    ? 'bg-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4">
            <CategoryTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              showIcons={false}
            />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 overflow-auto">
          {filteredMedia.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Folder className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">No media found</h3>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Upload or create new media to get started
              </p>
              <div className="flex items-center gap-2 mt-4">
                <Button onClick={onUpload} variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button onClick={onCreateNew} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                'grid gap-4',
                viewMode === 'grid'
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                  : 'grid-cols-1'
              )}
            >
              {filteredMedia.map((item) => (
                <MediaCard
                  key={item.id}
                  {...item}
                  onClick={() => onMediaClick?.(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
