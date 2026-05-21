# Static HTML templates (`docs/html`)

## Alan Hirsch — Research Collated viewer

**Canonical URL (after `pnpm reader:serve`):**

http://127.0.0.1:8765/movement_leader_research/alan-hirsch/collated/

Mirrored build output also lives under [`alan-hirsch-research-collated/`](./alan-hirsch-research-collated/).

### Commands

```bash
pnpm docs:alan-hirsch-research-html   # rebuild bundle.json + assets
pnpm reader:serve                     # docs static server (redirects .md → viewer)
pnpm reader:alan-hirsch-collated      # serve + open viewer in browser
```

Clicking `ALAN_HIRSCH_RESEARCH_COLLATED.md` in the file browser now **redirects** to the styled viewer when using `reader:serve` (not plain `python3 -m http.server`).
