# public/downloads

Static download targets for the marketing site. Files here are served at
`/downloads/<filename>` and linked from CTAs across the platform.

## Field Guide PDF

The Movemental Field Guide PDF — *It Starts With Safety* — is generated from
the markdown source at `src/content/field-guide/it-starts-with-safety.md` by
rendering the `/field-guide/safety` route in headless Chromium with print
emulation.

To rebuild:

```bash
pnpm dev                        # in another terminal — keep running
pnpm exec playwright install chromium  # one-time, if not already installed
pnpm field-guide:pdf            # writes ./public/downloads/it-starts-with-safety-v1.pdf
```

Override the source URL with `FIELD_GUIDE_URL` if running on a non-default
port:

```bash
FIELD_GUIDE_URL=http://localhost:4000/field-guide/safety pnpm field-guide:pdf
```

The web view at `/field-guide/safety` and the PDF render from the same source.
Update `it-starts-with-safety.md`, then rerun the script — the PDF stays in
sync automatically.
