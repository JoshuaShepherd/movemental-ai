/**
 * Load .env.local so tests can use Supabase (and other) env vars.
 */
import { config } from 'dotenv'
import path from 'node:path'

config({ path: path.resolve(process.cwd(), '.env.local') })
