# reDiscord
Like Undiscord but not.

## Changelog

### v5.3.0
- The GUI now remembers its last-used settings between page loads. Every input
  (IDs, filters, regex pattern, message/date ranges, delays, NSFW/pinned/nuke
  toggles, streamer mode, autoscroll) is persisted to localStorage on change
  and restored when the panel reopens, so you don't have to re-type everything
  each time you reopen Discord. The auth token is intentionally **not**
  persisted — it's a credential and is auto-refilled per session.
