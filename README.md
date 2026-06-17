# MR Growth Engine

An outbound email engine for AI/L&D advisory. Takes an offer + prospects, generates
personalized multi-step sequences (plus a tailored one-pager per prospect), and exports
copy ready to drop into a sender (Instantly).

**Buyer:** CPOs / CHROs / Heads of People
**Sell:** Peer-to-peer advisory — a People leader who built AI transformation inside a
1,200-person company, helping other People leaders do the same.

## Status

v1 — in active build. Built step by step:

- [x] Step 0 — Scaffold
- [x] Step 1 — Offer Brain panel (editable source of truth)
- [x] Step 2 — Single prospect input
- [x] Step 3 — 4-step sequence generation (open / proof / angle / breakup)
- [ ] Step 4 — A/B variants (subjects + CTAs) + tracking
- [ ] Step 5 — Tailored one-pager per prospect
- [ ] Step 6 — CSV batch
- [ ] Step 7 — Instantly-ready export

## How it runs

Single-file React app. Generation runs via live Claude API calls inside the Claude.ai
artifact preview. No backend, no secrets committed. Self-hosting later requires an API
key + a small proxy.
