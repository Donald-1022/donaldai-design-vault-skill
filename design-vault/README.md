# Design Vault Skill

A minimal, read-only, public catalog skill for coding assistants. Contains `SKILL.md` and dependency-free Node 20+ query helper. Repository host and trademark rights remain with their respective authors.

## Install

Copy this folder to `.agents/skills/design-vault/` inside a project supporting agent Skills, or to the relevant directory supported by your AI tool.

## Test

```sh
node .agents/skills/design-vault/scripts/query.mjs --category icons --limit 5
```

Offline fallback (when you downloaded the public JSON):

```sh
node .agents/skills/design-vault/scripts/query.mjs --file ./resources.json --query svg
```

Set `DESIGN_VAULT_API` to override the endpoint after deployment. This repository does not contain a live hosted service or a GitHub-published skill unless you publish it.
