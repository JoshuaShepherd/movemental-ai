import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, role, clarify, corpusLink, message } = body as {
      name?: string
      email?: string
      role?: string
      clarify?: string
      corpusLink?: string
      message?: string
    }
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }
    // TODO: send email or store in DB
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
