'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const CLARIFY_OPTIONS = [
  '',
  'Fit and alignment',
  'The structured offer',
  'Time and embodiment expectations',
  'Ownership and IP',
  'Onboarding process',
  'Other',
]

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const body = {
      name: data.get('name'),
      email: data.get('email'),
      role: data.get('role'),
      clarify: data.get('clarify') || undefined,
      corpusLink: data.get('corpusLink') || undefined,
      message: data.get('message'),
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setStatus('done')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-white/90">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-white/90">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="role" className="block text-sm font-medium text-white/90">
          Role / context
        </label>
        <input
          id="role"
          name="role"
          type="text"
          required
          placeholder="e.g. movement leader, organization leader"
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="clarify" className="block text-sm font-medium text-white/90">
          What are you hoping to clarify?
        </label>
        <select
          id="clarify"
          name="clarify"
          className={inputClass + ' cursor-pointer'}
        >
          {CLARIFY_OPTIONS.map((opt) => (
            <option key={opt || 'none'} value={opt} className="bg-sage-900 text-white">
              {opt || 'Select one (optional)'}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="corpusLink" className="block text-sm font-medium text-white/90">
          Primary website or corpus link
        </label>
        <input
          id="corpusLink"
          name="corpusLink"
          type="url"
          placeholder="https://..."
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-white/90">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="A few sentences about what you're considering."
          className={
            'rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 resize-none min-h-[100px]'
          }
        />
      </div>

      {status === 'done' && (
        <p className="text-sm text-sage-300">
          We received your request. We will respond when we have reviewed it.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-scarlet-rush-400">
          Something went wrong. You can email hello@movemental.ai directly.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === 'sending'}
        className="w-full rounded-lg bg-scarlet-rush-500 hover:bg-scarlet-rush-600 text-white font-medium"
      >
        {status === 'sending' ? 'Sending…' : 'Request a conversation'}
      </Button>
    </form>
  )
}
