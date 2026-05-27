"use client"

import { ProfileWorkspaceHeader } from "./ProfileWorkspaceHeader"
import { ProfileWorkspaceTabs } from "./ProfileWorkspaceTabs"
import { sampleProfileData } from "@/lib/data/profile-workspace.sample"

export function ProfileWorkspacePage() {
  // In production, this data would come from an API or server component
  const data = sampleProfileData

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <ProfileWorkspaceHeader
          lastUpdated={data.lastUpdated}
          sourcesCount={data.sourcesCount}
        />
        <ProfileWorkspaceTabs data={data} />
      </div>
    </div>
  )
}
