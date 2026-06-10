/** Instrument Serif italic emphasis — parity with prototype `em` in titles. */
export function AudienceSerifEm({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <em className="font-serif-display text-[1.06em] font-normal italic text-foreground">
      {children}
    </em>
  );
}
