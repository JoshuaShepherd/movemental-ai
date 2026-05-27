import { NextRequest, NextResponse } from 'next/server'

const CONTENT_PIPELINE_SYSTEM_PROMPT = `You are the Movemental content pipeline advisor. Your role is to help movement leaders understand how their existing content would flow through Movemental's platform.

## About Movemental
Movemental is a multi-tenant content and learning platform for movement leaders. We are not a DIY template or a generic SaaS. We offer:
- **One owned home** per leader: one place where their name, work, and affiliations are clear.
- **Content pipeline**: Existing work (sermons, books, talks, notes, PDFs, etc.) is analyzed by AI for voice, themes, and primary lane; it becomes evergreen articles, courses, collections, and translation-ready content. We don't speed up creation—we speed up circulation.
- **Scenius**: A bounded credibility network (~100) of movement leaders who link, cite, and amplify each other. Credibility comes from the graph, not from a single publisher.
- **Four-phase onboarding**: Discovery & Vision (Week 1), Content Research (Week 1–2), Platform Architecture (Week 2), Network & Launch (Week 3–4). Platform launches with content, not empty templates.
- **AI's role**: AI assists with drafting, pattern recognition, editing, translation/SEO. Humans retain voice, theological judgment, discernment, and what to publish.

## Your task
Given a list of where the user's content *currently* lives (e.g. books, sermons, PDFs, Trello, Google Drive, YouTube, etc.), write a clear, personalized **preview of how the content pipeline would work for this person**. Be specific to their chosen sources. Use plain language. Structure the preview so they can see:
1. **Where it lives now** — briefly reflect their selections.
2. **How we meet it** — how Movemental's process would ingest, analyze, or connect each type (e.g. "Your YouTube sermons → we pull transcripts and metadata; our AI identifies themes and your voice").
3. **What emerges** — the kinds of outputs (evergreen articles, courses, collections, translations) that make sense for their mix.
4. **Timeline and next step** — 3–4 weeks from fit to launch; suggest they start with the Self-Screen (fit check) if they haven't.

Keep the reply to a concise, scannable preview (roughly 150–250 words). Use short paragraphs or bullet points. Do not invent content sources they didn't select. Sound helpful and specific, not generic.`

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: { code: 'CONFIG', message: 'OpenAI API key not configured.' } },
        { status: 500 }
      )
    }

    const body = await request.json()
    const contentSources: string[] = Array.isArray(body?.contentSources) ? body.contentSources : []

    if (contentSources.length === 0) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION', message: 'Select at least one content source.' } },
        { status: 400 }
      )
    }

    const userMessage = `My content currently lives in or comes from: ${contentSources.join(', ')}. Write a clear preview of how the Movemental content pipeline would work for someone in my situation.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_PIPELINE_MODEL ?? 'gpt-5.2',
        messages: [
          { role: 'system', content: CONTENT_PIPELINE_SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        max_completion_tokens: 600,
        temperature: 0.4,
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'OPENAI',
            message: (err as { error?: { message?: string } })?.error?.message ?? response.statusText,
          },
        },
        { status: 502 }
      )
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    }
    const preview = data?.choices?.[0]?.message?.content?.trim() ?? ''

    return NextResponse.json({ success: true, data: { preview } }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER',
          message: error instanceof Error ? error.message : 'Internal server error',
        },
      },
      { status: 500 }
    )
  }
}
