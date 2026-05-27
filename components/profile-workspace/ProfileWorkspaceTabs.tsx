"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthorProfilePanel } from "./AuthorProfilePanel"
import { AudienceProfilePanel } from "./AudienceProfilePanel"
import { ContentProfilePanel } from "./ContentProfilePanel"
import type { ProfileWorkspaceData } from "@/lib/data/profile-workspace.sample"

interface ProfileWorkspaceTabsProps {
  data: ProfileWorkspaceData
}

export function ProfileWorkspaceTabs({ data }: ProfileWorkspaceTabsProps) {
  return (
    <Tabs defaultValue="author" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
        <TabsTrigger value="author">Author</TabsTrigger>
        <TabsTrigger value="audience">Audience</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
      </TabsList>

      <TabsContent value="author" className="mt-0">
        <AuthorProfilePanel data={data.author} />
      </TabsContent>

      <TabsContent value="audience" className="mt-0">
        <AudienceProfilePanel data={data.audience} />
      </TabsContent>

      <TabsContent value="content" className="mt-0">
        <ContentProfilePanel data={data.content} />
      </TabsContent>
    </Tabs>
  )
}
