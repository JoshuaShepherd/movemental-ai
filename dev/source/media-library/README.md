# Source: Media Library

Staging and manifest data for the **media library** used by movement-leader templates and the app. Assets are stored in `public/media-library/`; this folder holds indexes and manifests per leader.

## Dave Ferguson

- **Manifest:** [dave-ferguson/manifest.json](./dave-ferguson/manifest.json)
- **Assets in public:**  
  - Headshots (including logo): `public/media-library/images/headshots/dave-ferguson/`  
  - Book covers: `public/media-library/images/books/dave-ferguson/`
- **Template:** `html/dave-ferguson/` references these paths via `../../public/media-library/...`; the sync script rewrites to `/media-library/...` when copying to `public/templates/dave-ferguson/`.

To add or change assets: update files in `public/media-library/`, then update the manifest and template refs as needed.
