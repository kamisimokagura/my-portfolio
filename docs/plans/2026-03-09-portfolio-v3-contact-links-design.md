## Goal

Update the `portfolio-v3` contact section so email inquiries target `kamigaminosinri@gmail.com`, the X profile points to `https://x.com/dadydKRKMX34157`, and the GitHub profile points to `https://github.com/kamisimokagura`. Facebook and Instagram remain unchanged.

## Recommended Approach

Use the existing contact form as a `mailto:` launcher instead of introducing a backend mail service. On submit, collect the form values and open the user's mail client with the destination address, subject, and body prefilled.

## Why This Approach

This keeps the change small, matches the current static/Vite setup, and avoids adding infrastructure or secrets. The social links are already defined in one array, so those updates stay isolated to the same component.

## Scope

- Add a submit handler in `index.tsx` for the contact form
- Add `name` attributes so form values can be read via `FormData`
- Update the X and GitHub URLs
- Leave Facebook and Instagram as-is

## Risks

- `mailto:` depends on the visitor having a configured mail client
- No server-side delivery or validation is introduced in this change
