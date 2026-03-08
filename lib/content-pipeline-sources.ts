/**
 * Predefined options for "where does your content live?" — used by the
 * Content Pipeline Preview agent on How It Works.
 */
export const CONTENT_PIPELINE_SOURCES = [
  { id: 'books', label: 'Books', category: 'Published' },
  { id: 'sermons', label: 'Sermons', category: 'Spoken' },
  { id: 'sermon-series', label: 'Sermon series', category: 'Spoken' },
  { id: 'talks', label: 'Talks & keynotes', category: 'Spoken' },
  { id: 'pdfs', label: 'PDFs & documents', category: 'Documents' },
  { id: 'desktop-files', label: 'Desktop files & folders', category: 'Documents' },
  { id: 'trello', label: 'Trello', category: 'Tools' },
  { id: 'notion', label: 'Notion', category: 'Tools' },
  { id: 'google-drive', label: 'Google Drive', category: 'Tools' },
  { id: 'dropbox', label: 'Dropbox', category: 'Tools' },
  { id: 'youtube', label: 'YouTube / Vimeo', category: 'Video' },
  { id: 'podcast', label: 'Podcast episodes', category: 'Audio' },
  { id: 'website', label: 'Website / blog', category: 'Web' },
  { id: 'email-newsletters', label: 'Email newsletters', category: 'Web' },
  { id: 'courses-elsewhere', label: 'Courses (other platforms)', category: 'Learning' },
  { id: 'slide-decks', label: 'Slide decks (PowerPoint, Keynote)', category: 'Documents' },
  { id: 'spreadsheets', label: 'Spreadsheets (outlines, planning)', category: 'Documents' },
  { id: 'notes', label: 'Notes (Apple Notes, Evernote, etc.)', category: 'Documents' },
  { id: 'archives', label: 'Archives (old sites, backups)', category: 'Documents' },
] as const

export type ContentSourceId = (typeof CONTENT_PIPELINE_SOURCES)[number]['id']
