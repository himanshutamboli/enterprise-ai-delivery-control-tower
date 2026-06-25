# Certificates

Drop your certificate files here (PDF preferred; JPG/PNG also work). A
**"View certificate ↗"** link auto-appears on the Education & Certifications page
**only when the matching file exists** — so there are never broken links.

## Expected filenames

These are the paths referenced in `data/profile.json` → `certifications`:

| Credential | File to add here |
| --- | --- |
| AI Product Management Specialization — Duke | `ai-product-management-duke.pdf` |
| Digital Product Management Specialization — UVA Darden | `digital-product-management-uva.pdf` |
| Certified ScrumMaster (CSM) — Scrum Alliance | `csm-scrum-alliance.pdf` |
| Project Management Specialization — Google | `project-management-google.pdf` |
| Program Management Specialization — Microsoft | `program-management-microsoft.pdf` |
| Data Science PG — Data Trained Institute | `data-science-pg-datatrained.pdf` |

## Adding a future certificate

1. Drop the file here (e.g. `my-new-cert.pdf`).
2. In `data/profile.json`, add a credential under the right `category` (or add a new
   category), with `"file": "/certificates/my-new-cert.pdf"`.
3. Rebuild — the link appears automatically.

## Notes

- If you'd rather link to Google Drive instead of hosting the file, set
  `"file": "https://drive.google.com/..."` (any `http…` URL is used as-is). Make the
  Drive file "Anyone with the link". Repo-hosted files are recommended — faster, and
  they never break when Drive sharing changes.
- Use a different extension if needed (e.g. `.jpg`) — just match it in `profile.json`.
- Certificates may contain personal info; only add what you're comfortable showing publicly.
