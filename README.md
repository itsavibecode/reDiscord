# reDiscord
Like Undiscord but not.

## Install

In Tampermonkey, create a new script and paste the contents of
`reDiscordPurple.js`, or point Tampermonkey at the raw URL:

```
https://raw.githubusercontent.com/itsavibecode/reDiscord/main/reDiscordPurple.js
```

This is also the `@updateURL`/`@downloadURL` baked into the header, so
Tampermonkey will auto-update from `main`.

## Changelog

### v5.3.2
- Update the redaction text. Replaced messages now read
  `🔒 Message has been Redacted.` with the small-text "Discord+" subscription
  prompt below it (Rickroll link unchanged). The previous `||REDACTED||`
  spoiler-block prefix is kept as a legacy match so messages redacted with
  older versions are still recognized and skipped on re-runs.

### v5.3.1
- Fix `@updateURL` and `@downloadURL`: they pointed at GitHub's `/blob/`
  rendered-HTML page, which Tampermonkey can't parse. Switched to
  `raw.githubusercontent.com` so auto-update actually works.

### v5.3.0
- The GUI now remembers its last-used settings between page loads. Every input
  (IDs, filters, regex pattern, message/date ranges, delays, NSFW/pinned/nuke
  toggles, streamer mode, autoscroll) is persisted to localStorage on change
  and restored when the panel reopens, so you don't have to re-type everything
  each time you reopen Discord. The auth token is intentionally **not**
  persisted — it's a credential and is auto-refilled per session.
