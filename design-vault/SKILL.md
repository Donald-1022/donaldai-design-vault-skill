---
name: design-vault
description: Search the public DonaldAI Design Vault catalog for verified listed design resources, icon libraries, interaction animations, typography, presentation templates, design inspiration, and implementation snippets. Use when a user asks to find reusable web design references or commands. Never invent resource details.
---

# DonaldAI Design Vault

This is a public curated reference index, **not** a code execution platform or an unrestricted asset license.

## When to activate

- The user wants icon libraries, frontend UI components, layout transitions, scroll effects, fonts, palettes, PPT assets, or design inspiration.
- The user wants a *real* listed source and install/usage command, when that command is present in the catalog.
- The user wants to compile a bulk contribution JSON from supplied URLs.

## Query the public API

Default endpoint: `https://donaldai-design-vault.vercel.app/api/resources`. The custom host `https://design.donaldai.uk/api/resources` is also usable when configured. Override with `DESIGN_VAULT_API`.

Call the local helper from the project root:

```sh
node .agents/skills/design-vault/scripts/query.mjs --category icons --limit 8
node .agents/skills/design-vault/scripts/query.mjs --query scroll --limit 8
```

The single endpoint supports `q`, `category`, `limit`, and `download=1`. The web UI's fuzzy search does not imply semantic or typo-tolerant API search. For questions in Chinese, start with relevant categories if direct keyword search finds nothing, e.g. `icons`, `motion`, `typography`, `color`, `ppt`.

## Safety and accuracy

1. Refer only to entries returned by the API or to catalog JSON explicitly provided by the user.
2. Cite the entry's canonical `url` and `github`/`demo` where available. Do **not** invent features, integrations, licensing, commands, current versions, or site uptime.
3. Show `install`, `usage`, or `skill` text only if present in that entry; a cloned demo is not automatically an installable npm library.
4. Check the original project's license before redistributing code, visuals, screenshots, fonts, logos, or components. This catalog's MIT license covers only the catalog website code.
5. If no results are found, say so. Optionally broaden terms/categories; never fabricate matches.
6. Ask for the user's framework if a package has incompatible framework requirements.

## Typical response format

Use 3–6 grounded suggestions with name, why relevant, original URL, and install/use steps when included. When there are no relevant entries, give a concise zero-results explanation and direct to the public catalog.

## Bulk submissions

When asked to turn user links into contributions, output a JSON object with `resources` array (maximum 50) and each item: `name`, `url`, `category`, `why`. Categories: `ai`, `motion`, `components`, `icons`, `typography`, `color`, `ppt`, `inspiration`, `workflow`. Deduplicate normalized URLs. Do not pretend the submissions have been sent or accepted; ask the user to send JSON to `donald_chan@foxmail.com` or via the website's mailto flow.
