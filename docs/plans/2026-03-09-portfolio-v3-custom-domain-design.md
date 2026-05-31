## Goal

Serve the `portfolio-v3` site from `https://kamikagura.com`, redirect `https://www.kamikagura.com` to the apex domain, and make `C:\Work-Production-Creation-Development\portfolio-v3` the single source of truth for future updates.

## Chosen Approach

Use the existing Vercel project `portfolio-v3` as the production host. Add `kamikagura.com` and `www.kamikagura.com` to Vercel, keep DNS at the existing provider for now, and update the DNS records there to point to Vercel.

## Source of Truth

- Authoritative source: `C:\Work-Production-Creation-Development\portfolio-v3`
- Non-authoritative copy: `C:\Users\kamig\OneDrive\ドキュメント\自分のポートフォリオ３`

The OneDrive folder stays available as a manual backup or copy target, but production deploys should only come from `portfolio-v3`.

## Domain Strategy

- Primary URL: `https://kamikagura.com`
- Secondary URL: `https://www.kamikagura.com`
- Redirect: `www` to apex

## DNS Strategy

The domain currently uses Xserver nameservers, so DNS should be changed there instead of switching to Vercel nameservers immediately. This keeps the migration smaller and avoids moving registrar-level control during the site cutover.

## Manual Operations

- Deploy production from `portfolio-v3`
- Optionally sync a copy to OneDrive when needed
- After DNS propagation, confirm domain verification in Vercel before retiring the old server
