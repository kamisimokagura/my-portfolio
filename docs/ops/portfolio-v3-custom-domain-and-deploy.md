## Source of Truth

Use `C:\Work-Production-Creation-Development\portfolio-v3` as the only production source.

Keep `C:\Users\kamig\OneDrive\ドキュメント\自分のポートフォリオ３` only as an optional manual copy.

## Prerequisites

- Run `npx vercel login` first so the CLI token is stored in `auth.json`.
- Set the `VERCEL_TEAM_ID` environment variable before running `attach-custom-domains.ps1` (or `deploy-vercel-production.ps1`, which calls it):
  ```powershell
  $env:VERCEL_TEAM_ID = '<your Vercel team id>'
  ```

## Current Domain State

- Domain: `kamikagura.com`
- Current DNS provider: Xserver nameservers
- Old web server target: `85.131.209.7`
- New production host: Vercel project `portfolio-v3`
- Contact form endpoint env: `VITE_FORMSPREE_ENDPOINT`

## Contact Form Setting

The contact form sends through Formspree.

- Local development:
  set `VITE_FORMSPREE_ENDPOINT` in `.env.local`
- Production:
  set `VITE_FORMSPREE_ENDPOINT` in the Vercel project environment variables

Current endpoint format:

```text
https://formspree.io/f/...
```

## Required DNS Changes In Xserver

Replace the old web records for the root domain and `www` so they point to Vercel.

- `kamikagura.com`:
  Type `A`
  Value `76.76.21.21`
- `www.kamikagura.com`:
  Type `A`
  Value `76.76.21.21`

If there are existing `A` or `CNAME` records for `@` or `www`, remove or replace the ones pointing at `85.131.209.7`.

## After Changing DNS

Run these commands from `portfolio-v3`:

```powershell
npx vercel domains inspect kamikagura.com
npx vercel domains inspect www.kamikagura.com
.\scripts\attach-custom-domains.ps1
```

When the domain is configured correctly, Vercel will verify the records and issue certificates automatically.

## Deploy Production

```powershell
.\scripts\deploy-vercel-production.ps1
```

This is the normal release command.

It runs:

1. `npm run build`
2. `npx vercel --prod --yes`
3. project-domain checks for `kamikagura.com` and `www.kamikagura.com`
4. custom-domain alias reattachment
5. public checks for:
   - `https://kamikagura.com` returning `200`
   - `https://www.kamikagura.com` redirecting to `https://kamikagura.com/`

If any step fails, the script stops there so the failure point is obvious.

## Optional OneDrive Sync

```powershell
.\scripts\sync-onedrive-copy.ps1
```

This copies the current repository contents into the old OneDrive folder without treating it as the source of truth.

## Safe Retirement Of The Old Server

Do not cancel the old server immediately.

1. Update DNS in Xserver.
2. Wait for `kamikagura.com` to resolve to Vercel.
3. Confirm the site and contact links work on `https://kamikagura.com`.
4. Keep the old server for a few days.
5. Cancel the old web server only after the new setup is stable.

Keep the domain registration active even if you stop using the old hosting server.
