'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const SUGGESTED_PROMPTS = [
  'Is this actually for someone like me?',
  'What am I really committing to?',
  'How does the 90/10 model work in practice?',
  'What if I don\'t want to scale?',
  'How does this protect embodiment?',
  'What makes this different from just hiring someone?',
  'What happens if I leave?',
]

const CHAT_INTRO =
  'Ask anything about fit, scope, expectations, boundaries, or economics. This conversation is here to help you think clearly, not to persuade you.'

export function DecideChatSection() {
  const [input, setInput] = useState('')
  const [messages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([])

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {CHAT_INTRO}
      </p>

      <div className="flex flex-wrap gap-2">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <Button
            key={prompt}
            type="button"
            variant="outline"
            size="sm"
            className="h-auto py-2 px-3 text-left font-normal whitespace-normal"
            onClick={() => setInput(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>

      <div className="rounded-lg border border-input bg-muted/20 min-h-[240px] flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto min-h-[160px]">
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Your conversation will appear here. Use a prompt above or type below.
            </p>
          ) : (
            <ul className="space-y-3">
              {messages.map((m, i) => (
                <li
                  key={i}
                  className={`text-sm ${m.role === 'user' ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  {m.text}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-3 border-t border-border">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              if (input.trim()) {
                // Wire to agent when ready
                setInput('')
              }
            }}
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="min-h-[80px] resize-none"
              rows={2}
            />
            <Button type="submit" size="sm" className="self-end shrink-0">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
