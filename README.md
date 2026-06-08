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

### v5.5.1
- Fix the calendar-picker icon on the After / Before Date fields being
  invisible against the dark purple background. Chrome's built-in
  `::-webkit-calendar-picker-indicator` is a dark glyph by default and
  blended into the panel — now inverted so it shows up cleanly on both
  empty and filled fields.

### v5.5.0
- **Fix: persistence has been silently broken since v5.3.0.** Discord
  deletes `window.localStorage` during app boot so that browser
  extensions can't read the auth token, and our save/load layer was
  writing into the deleted object. Re-routed every read/write through a
  same-origin iframe's untouched `localStorage` (the same trick the
  script already uses for `getToken`). Author/server/channel IDs, NSFW,
  filter options, delays, dates, and the redaction-message presets now
  actually stick across reloads.
- Add a **Today** button next to "Before date" that fills the field
  with the current local date and time in one click.
- Add **resolved-name labels above Server ID and Channel ID**. As you
  type or paste an ID, ReDiscord queries Discord's API and shows the
  server/channel name above the input — so you know that
  `1234567890` is actually `#wallstreetbets` before you hit Redact.
  Lookups are cached per ID; DMs are labelled with their participants.
- Auto-fill the auth token when the panel opens (silent — replaces no
  manual override) so the name lookups work immediately without having
  to click `fill` first.

### v5.4.1
- "Before date" now defaults to **right now** (current local date + time)
  every time the panel opens, instead of restoring whatever you last
  typed. Most runs want "everything up to this moment," so a stale saved
  value was misleading. You can still edit the field before hitting
  Redact — it just won't sticky-persist across reloads. All other fields
  still save/restore exactly as before.

### v5.4.0
- Add a "Redaction message" panel to the GUI. The replacement text is now
  editable inline, and you can save any number of named presets (e.g. one
  per server or vibe) to localStorage and switch between them from a
  dropdown. The previous v5.3.2 lock-emoji + Discord+ paywall is the
  built-in default and can't be overwritten — use **Save as…** to create
  a copy you can edit. **Reset** restores the default. Whatever's in the
  textarea at the moment you hit ▶︎ Redact is what gets used. The active
  text's first line is also added to the "already redacted, skip on
  re-run" check, so a custom message self-skips.

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
