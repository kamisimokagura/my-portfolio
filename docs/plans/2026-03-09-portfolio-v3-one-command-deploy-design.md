## Goal

Make Vercel production release for `portfolio-v3` a single command that is safe to run repeatedly.

## Chosen Approach

Use `.\scripts\deploy-vercel-production.ps1` as the only entry point for normal releases.

The script should:

1. build the app
2. create a Vercel production deployment
3. ensure the custom domains exist at the project level
4. reattach the custom domains to the production alias
5. verify that `kamikagura.com` returns `200` and `www.kamikagura.com` redirects to the apex

## Non-Goals

- No automatic OneDrive sync
- No Git push or commit automation
- No preview-only workflow changes

## Reasoning

This keeps the production workflow simple and close to the current Vercel setup. It also avoids the earlier failure mode where account-level domains existed but project-level domains were missing, which caused public access to fail with `401`.
