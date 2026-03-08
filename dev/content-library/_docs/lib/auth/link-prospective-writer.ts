import { writeService } from '@/lib/services/simplified/write'

/**
 * After signup/email-confirm, attempt to link the new user to an existing
 * prospective writer row in `write` by matching on full_name.
 *
 * Safe to call with missing/empty name — returns silently.
 * Does not overwrite already-linked rows (service enforces linkedUserId IS NULL).
 */
export async function linkProspectiveWriter(
  userId: string,
  fullName: string | null | undefined
): Promise<void> {
  if (!fullName?.trim()) return

  const findResult = await writeService.findUnlinkedByFullName(fullName)
  if (!findResult.ok || !findResult.data) return

  await writeService.linkWriterToUser(findResult.data.id, userId)
}
