// ==UserScript==
// @name            ReDiscord - Purple
// @description     Delete all messages in a Discord channel or DM (Bulk deletion)
// @version         5.6.0
// @author          victornpb, itsavibecode
// @homepageURL     https://github.com/victornpb/undiscord
// @supportURL      https://github.com/victornpb/undiscord/discussions
// @match           https://*.discord.com/app
// @match           https://*.discord.com/channels/*
// @match           https://*.discord.com/login
// @license         MIT
// @namespace       https://github.com/victornpb/deleteDiscordMessages
// @icon            https://victornpb.github.io/undiscord/images/icon128.png
// @contributionURL https://www.buymeacoffee.com/vitim
// @grant           none
// @attribution     Original project (https://github.com/victornpb/undiscord)
// @downloadURL https://raw.githubusercontent.com/itsavibecode/reDiscord/main/reDiscordPurple.js
// @updateURL https://raw.githubusercontent.com/itsavibecode/reDiscord/main/reDiscordPurple.js
// ==/UserScript==
(function () {
	'use strict';

	/* rollup-plugin-baked-env */
	const VERSION = "5.6.0";

	var themeCss = (`
/* undiscord window — purple theme */
#undiscord.browser { box-shadow: 0 8px 32px rgba(0,0,0,0.6); border: 1px solid #6b4fa0; overflow: hidden; }
#undiscord.container,
#undiscord .container { background-color: #2a1f3d; border-radius: 8px; box-sizing: border-box; cursor: default; flex-direction: column; }
#undiscord .header { background-color: #3b2a5a; height: 48px; align-items: center; min-height: 48px; padding: 0 16px; display: flex; color: #e8d8ff; cursor: grab; }
#undiscord .header .icon { color: #c084fc; margin-right: 8px; flex-shrink: 0; width: 24; height: 24; }
#undiscord .header .icon:hover { color: #e8d8ff; }
#undiscord .header h3 { font-size: 16px; line-height: 20px; font-weight: 500; font-family: var(--font-display); color: #f0e6ff; flex-shrink: 0; margin-right: 16px; }
#undiscord .spacer { flex-grow: 1; }
#undiscord .header .vert-divider { width: 1px; height: 24px; background-color: #6b4fa0; margin-right: 16px; flex-shrink: 0; }
#undiscord legend,
#undiscord label { color: #b89edd; font-size: 12px; line-height: 16px; font-weight: 500; text-transform: uppercase; cursor: default; font-family: var(--font-display); margin-bottom: 8px; }
#undiscord .multiInput { display: flex; align-items: center; font-size: 16px; box-sizing: border-box; width: 100%; border-radius: 3px; color: #e8d8ff; background-color: #1e1530; border: none; transition: border-color 0.2s ease-in-out 0s; }
#undiscord .multiInput :first-child { flex-grow: 1; }
#undiscord .multiInput button:last-child { margin-right: 4px; }
#undiscord .input { font-size: 16px; width: 100%; transition: border-color 0.2s ease-in-out 0s; padding: 10px; height: 44px; background-color: #1e1530; border: 1px solid #6b4fa0; border-radius: 8px; box-sizing: border-box; color: #e8d8ff; }
#undiscord fieldset { margin-top: 16px; }
#undiscord .input-wrapper { display: flex; align-items: center; font-size: 16px; box-sizing: border-box; width: 100%; border-radius: 3px; color: #e8d8ff; background-color: #1e1530; border: none; transition: border-color 0.2s ease-in-out 0s; }
#undiscord input[type="text"],
#undiscord input[type="search"],
#undiscord input[type="password"],
#undiscord input[type="datetime-local"],
#undiscord input[type="number"],
#undiscord input[type="range"] { background-color: #1e1530; border: 1px solid #6b4fa0; border-radius: 8px; box-sizing: border-box; color: #e8d8ff; font-size: 16px; height: 44px; padding: 12px 10px; transition: border-color .2s ease-in-out; width: 100%; }
/* Chrome's default calendar picker glyph is a dark icon that vanishes on
   our dark panel — and on wider inputs it can render in a position where it
   looks missing entirely. Replace it with an explicit purple SVG so it
   shows up reliably on every datetime-local input. */
#undiscord input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23c084fc'><path d='M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z'/></svg>");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 20px 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: 1;
  filter: none;
  margin-left: 4px;
  padding: 0;
}
#undiscord input[type="datetime-local"]::-webkit-calendar-picker-indicator:hover { opacity: 0.7; }
#undiscord textarea { background-color: #1e1530; border: 1px solid #6b4fa0; border-radius: 8px; box-sizing: border-box; color: #e8d8ff; font-family: inherit; font-size: 13px; line-height: 1.4; padding: 10px; transition: border-color .2s ease-in-out; width: 100%; resize: vertical; min-height: 88px; }
#undiscord .resolvedName { font-size: 12px; line-height: 16px; color: #c084fc; min-height: 16px; margin-bottom: 6px; font-weight: 600; font-family: var(--font-display); word-break: break-word; }
#undiscord .resolvedName:empty { display: none; }
#undiscord .resolvedName.loading { color: #b89edd; font-style: italic; font-weight: 400; }
#undiscord .resolvedName.err { color: #faa61a; font-weight: 400; }
#undiscord textarea:focus { outline: none; border-color: #c084fc; }
#undiscord select { background-color: #1e1530; border: 1px solid #6b4fa0; border-radius: 8px; box-sizing: border-box; color: #e8d8ff; font-size: 14px; height: 36px; padding: 6px 10px; width: 100%; }
#undiscord select:focus { outline: none; border-color: #c084fc; }
#undiscord input:focus { outline: none; border-color: #c084fc; }
#undiscord .divider,
#undiscord hr { border: none; margin-bottom: 24px; padding-bottom: 4px; border-bottom: 1px solid #6b4fa0; }
#undiscord .sectionDescription { margin-bottom: 16px; color: #b89edd; font-size: 14px; line-height: 20px; font-weight: 400; }
#undiscord a { color: #c084fc; text-decoration: none; }
#undiscord a:hover { color: #e8d8ff; }
#undiscord .btn,
#undiscord button { position: relative; display: flex; -webkit-box-pack: center; justify-content: center; -webkit-box-align: center; align-items: center; box-sizing: border-box; background: none; border: none; border-radius: 3px; font-size: 14px; font-weight: 500; line-height: 16px; padding: 2px 16px; user-select: none; /* sizeSmall */ width: 60px; height: 32px; min-width: 60px; min-height: 32px; color: #f0e6ff; background-color: #5b3f8a; }
#undiscord button:hover { background-color: #7a55b5; }
#undiscord .sizeMedium { width: 96px; height: 38px; min-width: 96px; min-height: 38px; }
#undiscord .sizeMedium.icon { width: 38px; min-width: 38px; }
#undiscord sup { vertical-align: top; }
/* lookFilled colorPrimary */
#undiscord .accent { background-color: #7c3aed; }
#undiscord .danger { background-color: #ed4245; }
#undiscord .danger:hover { background-color: #c03537; }
#undiscord .positive { background-color: #43b581; }
#undiscord .info { font-size: 12px; line-height: 16px; padding: 8px 10px; color: #b89edd; }
/* Scrollbar */
#undiscord .scroll::-webkit-scrollbar { width: 8px; height: 8px; }
#undiscord .scroll::-webkit-scrollbar-corner { background-color: transparent; }
#undiscord .scroll::-webkit-scrollbar-thumb { background-clip: padding-box; border: 2px solid transparent; border-radius: 4px; background-color: #6b4fa0; min-height: 40px; }
#undiscord .scroll::-webkit-scrollbar-track { background-color: #1e1530; border: 2px solid #1e1530; }
/* fade scrollbar */
#undiscord .scroll::-webkit-scrollbar-thumb,
#undiscord .scroll::-webkit-scrollbar-track { visibility: hidden; }
#undiscord .scroll:hover::-webkit-scrollbar-thumb,
#undiscord .scroll:hover::-webkit-scrollbar-track { visibility: visible; }
/**** functional classes ****/
#undiscord.redact .priv { display: none !important; }
#undiscord.redact x:not(:active) { color: transparent !important; background-color: #3b2a5a !important; cursor: default; user-select: none; }
#undiscord.redact x:hover { position: relative; }
#undiscord.redact x:hover::after { content: "Redacted information (Streamer mode: ON)"; position: absolute; display: inline-block; top: -32px; left: -20px; padding: 4px; width: 150px; font-size: 8pt; text-align: center; white-space: pre-wrap; background-color: #2a1f3d; box-shadow: 0 4px 12px rgba(0,0,0,0.5); color: #e8d8ff; border-radius: 5px; pointer-events: none; border: 1px solid #6b4fa0; }
#undiscord.redact [priv] { -webkit-text-security: disc !important; }
#undiscord :disabled { display: none; }
/**** layout and utility classes ****/
#undiscord,
#undiscord * { box-sizing: border-box; }
#undiscord .col { display: flex; flex-direction: column; }
#undiscord .row { display: flex; flex-direction: row; align-items: center; }
#undiscord .mb1 { margin-bottom: 8px; }
#undiscord .log { margin-bottom: 0.25em; }
#undiscord .log-debug { color: #e8d8ff; }
#undiscord .log-info { color: #00b0f4; }
#undiscord .log-verb { color: #9b7fd4; }
#undiscord .log-warn { color: #faa61a; }
#undiscord .log-error { color: #f04747; }
#undiscord .log-success { color: #43b581; }
`);

	var mainCss = (`
/**** Undiscord Button ****/
#rediscord-purple-btn { position: fixed; top: 10px; left: 50%; transform: translateX(-50%); z-index: 9999; width: 44px; height: 44px; cursor: pointer; color: white; background-color: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(124,58,237,0.6); transition: background-color 0.2s, transform 0.1s; }
#rediscord-purple-btn:hover { background-color: #6d28d9; transform: translateX(-50%) scale(1.1); }
#rediscord-purple-btn svg { width: 22px; height: 22px; pointer-events: none; }
#rediscord-purple-btn progress { position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 44px; height: 4px; display: none; border-radius: 2px; }
#rediscord-purple-btn.running { background-color: #faa61a !important; }
#rediscord-purple-btn.running progress { display: block; }
/**** Undiscord Interface ****/
#undiscord { position: fixed; z-index: 100; top: 58px; right: 10px; display: flex; flex-direction: column; width: 800px; height: 80vh; min-width: 610px; max-width: 100vw; min-height: 448px; max-height: 100vh; color: #e8d8ff; border-radius: 8px; background-color: #2a1f3d; box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px #6b4fa0; will-change: top, left, width, height; }
#undiscord .header .icon { cursor: pointer; }
#undiscord .window-body { height: calc(100% - 48px); }
#undiscord .sidebar { overflow: hidden scroll; overflow-y: auto; width: 270px; min-width: 250px; height: 100%; max-height: 100%; padding: 8px; background: #1e1530; }
#undiscord .sidebar legend,
#undiscord .sidebar label { display: block; width: 100%; }
#undiscord .main { display: flex; max-width: calc(100% - 250px); background-color: #251840; flex-grow: 1; }
#undiscord.hide-sidebar .sidebar { display: none; }
#undiscord.hide-sidebar .main { max-width: 100%; }
#undiscord #logArea { font-family: Consolas, Liberation Mono, Menlo, Courier, monospace; font-size: 0.75rem; overflow: auto; padding: 10px; user-select: text; flex-grow: 1; flex-grow: 1; cursor: auto; color: #e8d8ff; background-color: #1a1028; }
#undiscord .rateLimitBanner { background-color: #3b2a13; color: #faa61a; border-left: 4px solid #faa61a; padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 12px; line-height: 1.4; }
#undiscord .rateLimitBanner .bannerText { flex: 1; }
#undiscord .rateLimitBanner .bannerText b { color: #ffcc66; }
#undiscord .rateLimitBanner .bannerActions { display: flex; gap: 4px; flex-shrink: 0; }
#undiscord .rateLimitBanner .bannerActions button { width: auto; height: 28px; min-width: 0; min-height: 0; padding: 0 10px; font-size: 12px; }
#undiscord .tbar { padding: 8px; background-color: #3b2a5a; }
#undiscord .tbar button { margin-right: 4px; margin-bottom: 4px; }
#undiscord .footer { cursor: se-resize; padding-right: 30px; background-color: #2a1f3d; }
#undiscord .footer #progressPercent { padding: 0 1em; font-size: small; color: #b89edd; flex-grow: 1; }
.resize-handle { position: absolute; bottom: -15px; right: -15px; width: 30px; height: 30px; transform: rotate(-45deg); background: repeating-linear-gradient(0, #6b4fa0, #6b4fa0 1px, transparent 2px, transparent 4px); cursor: nwse-resize; }
/**** Elements ****/
#undiscord summary { font-size: 16px; font-weight: 500; line-height: 20px; position: relative; overflow: hidden; margin-bottom: 2px; padding: 6px 10px; cursor: pointer; white-space: nowrap; text-overflow: ellipsis; color: #c084fc; border-radius: 4px; flex-shrink: 0; }
#undiscord summary:hover { color: #e8d8ff; background-color: #3b2a5a; }
#undiscord fieldset { padding-left: 8px; }
#undiscord legend a { float: right; text-transform: initial; }
#undiscord progress { height: 8px; margin-top: 4px; flex-grow: 1; accent-color: #9b5de5; }
#undiscord .importJson { display: flex; flex-direction: row; }
#undiscord .importJson button { margin-left: 5px; width: fit-content; }
`);

	var dragCss = (`
[name^="grab-"] { position: absolute; --size: 6px; --corner-size: 16px; --offset: -1px; z-index: 9; }
[name^="grab-"]:hover{ background: rgba(128,128,128,0.1); }
[name="grab-t"] { top: 0px; left: var(--corner-size); right: var(--corner-size); height: var(--size); margin-top: var(--offset); cursor: ns-resize; }
[name="grab-r"] { top: var(--corner-size); bottom: var(--corner-size); right: 0px; width: var(--size); margin-right: var(--offset);
  cursor: ew-resize; }
[name="grab-b"] { bottom: 0px; left: var(--corner-size); right: var(--corner-size); height: var(--size); margin-bottom: var(--offset); cursor: ns-resize; }
[name="grab-l"] { top: var(--corner-size); bottom: var(--corner-size); left: 0px; width: var(--size); margin-left: var(--offset); cursor: ew-resize; }
[name="grab-tl"] { top: 0px; left: 0px; width: var(--corner-size); height: var(--corner-size); margin-top: var(--offset); margin-left: var(--offset); cursor: nwse-resize; }
[name="grab-tr"] { top: 0px; right: 0px; width: var(--corner-size); height: var(--corner-size); margin-top: var(--offset); margin-right: var(--offset); cursor: nesw-resize; }
[name="grab-br"] { bottom: 0px; right: 0px; width: var(--corner-size); height: var(--corner-size); margin-bottom: var(--offset); margin-right: var(--offset); cursor: nwse-resize; }
[name="grab-bl"] { bottom: 0px; left: 0px; width: var(--corner-size); height: var(--corner-size); margin-bottom: var(--offset); margin-left: var(--offset); cursor: nesw-resize; }
`);

	var buttonHtml = (`
<div id="rediscord-purple-btn" tabindex="0" role="button" aria-label="ReDiscord - Purple" title="ReDiscord - Purple">
    <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
        <path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path>
    </svg>
    <progress></progress>
</div>
`);

	var undiscordTemplate = (`
<div id="undiscord" class="browser container redact" style="display:none;">
    <div class="header">
        <svg class="icon" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
            <path fill="currentColor"
                d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z">
            </path>
        </svg>
        <h3>ReDiscord - Purple</h3>
        <div class="vert-divider"></div>
        <span>Bulk redact messages</span>
        <div class="spacer"></div>
        <div id="hide" class="icon" aria-label="Close" role="button" tabindex="0">
            <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z">
                </path>
            </svg>
        </div>
    </div>
    <div class="window-body" style="display: flex; flex-direction: row;">
        <div class="sidebar scroll">
            <details open>
                <summary>General</summary>
                <fieldset>
                    <legend>
                        Author ID
                        <a href="{{WIKI}}/authorId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="authorId" type="text" priv>
                        </div>
                        <button id="getAuthor">me</button>
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Server ID
                        <a href="{{WIKI}}/guildId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="resolvedName" id="guildIdLabel"></div>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="guildId" type="text" priv>
                        </div>
                        <button id="getGuild">current</button>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        Channel ID
                        <a href="{{WIKI}}/channelId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="resolvedName" id="channelIdLabel"></div>
                    <div class="multiInput mb1">
                        <div class="input-wrapper">
                            <input class="input" id="channelId" type="text" priv>
                        </div>
                        <button id="getChannel">current</button>
                    </div>
                    <div class="sectionDescription">
                        <label class="row"><input id="includeNsfw" type="checkbox">This is a NSFW channel</label>
                    </div>
                </fieldset>
            </details>
            <details open>
                <summary>Redaction message</summary>
                <fieldset>
                    <legend>Saved messages</legend>
                    <div class="multiInput mb1">
                        <div class="input-wrapper">
                            <select id="redactPresetSelect"></select>
                        </div>
                        <button id="redactPresetDelete" title="Delete the selected saved message">✕</button>
                    </div>
                    <legend>Replacement text</legend>
                    <textarea id="redactText" rows="5" placeholder="The text every redacted message is replaced with…"></textarea>
                    <div class="row" style="margin-top:8px; flex-wrap:wrap; gap:4px;">
                        <button id="redactPresetSaveAs" style="width:auto;" title="Save the current text as a new preset">Save as…</button>
                        <button id="redactPresetUpdate" style="width:auto;" title="Overwrite the selected preset with the current text">Update</button>
                        <button id="redactPresetReset" style="width:auto;" title="Restore the built-in default text">Reset</button>
                    </div>
                    <div class="sectionDescription">
                        Discord markdown works — <code>||spoilers||</code>, <code>[links](url)</code>, and <code>-#</code> subtext.
                        Wrap URLs in <code>&lt;…&gt;</code> to suppress embeds.
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Wipe Archive</summary>
                <fieldset>
                    <legend>
                        Import index.json
                        <a href="{{WIKI}}/importJson" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input type="file" id="importJsonInput" accept="application/json,.json" style="width:100%";>
                    </div>
                    <div class="sectionDescription">
                        <br>
                        After requesting your data from discord, you can import it here.<br>
                        Select the "messages/index.json" file from the discord archive.
                    </div>
                </fieldset>
            </details>
            <hr>
            <details>
                <summary>Filter</summary>
                <fieldset>
                    <legend>
                        Search
                        <a href="{{WIKI}}/filters" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="search" type="text" placeholder="Containing text" priv>
                    </div>
                    <div class="sectionDescription">
                        Only redact messages that contain the text
                    </div>
                    <div class="sectionDescription">
                        <label><input id="hasLink" type="checkbox">has: link</label>
                    </div>
                    <div class="sectionDescription">
                        <label><input id="hasFile" type="checkbox">has: file</label>
                    </div>
                    <div class="sectionDescription">
                        <label><input id="includePinned" type="checkbox">Include pinned</label>
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Pattern
                        <a href="{{WIKI}}/pattern" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="sectionDescription">
                        Redact messages that match the regular expression
                    </div>
                    <div class="input-wrapper">
                        <span class="info">/</span>
                        <input id="pattern" type="text" placeholder="regular expression" priv>
                        <span class="info">/</span>
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Messages interval</summary>
                <fieldset>
                    <legend>
                        Interval of messages
                        <a href="{{WIKI}}/messageId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput mb1">
                        <div class="input-wrapper">
                            <input id="minId" type="text" placeholder="After a message" priv>
                        </div>
                        <button id="pickMessageAfter">Pick</button>
                    </div>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input id="maxId" type="text" placeholder="Before a message" priv>
                        </div>
                        <button id="pickMessageBefore">Pick</button>
                    </div>
                    <div class="sectionDescription">
                        Specify an interval to redact messages.
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Date interval</summary>
                <fieldset>
                    <legend>
                        After date
                        <a href="{{WIKI}}/dateRange" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper mb1">
                        <input id="minDate" type="datetime-local" title="Messages posted AFTER this date">
                    </div>
                    <legend>
                        Before date
                        <a href="{{WIKI}}/dateRange" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input id="maxDate" type="datetime-local" title="Messages posted BEFORE this date">
                        </div>
                        <button id="maxDateNow" title="Fill with the current date and time">Today</button>
                    </div>
                    <div class="sectionDescription">
                        Redact messages that were posted between the two dates.
                    </div>
                    <div class="sectionDescription">
                        * Filtering by date doesn't work if you use the "Messages interval".
                    </div>
                </fieldset>
            </details>
            <hr>
            <details>
                <summary>Advanced settings</summary>
                <fieldset>
                    <legend>
                        Search delay
                        <a href="{{WIKI}}/delay" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="searchDelay" type="range" value="30000" step="100" min="100" max="60000">
                        <div id="searchDelayValue"></div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        Edit delay
                        <a href="{{WIKI}}/delay" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="deleteDelay" type="range" value="1000" step="50" min="50" max="10000">
                        <div id="deleteDelayValue"></div>
                    </div>
                    <br>
                    <div class="sectionDescription">
                        This will affect the speed in which the messages are redacted.
                        Use the help link for more information.
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Authorization Token
                        <a href="{{WIKI}}/authToken" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="token" type="text" autocomplete="dont" priv>
                        </div>
                        <button id="getToken">fill</button>
                    </div>
                </fieldset>
            </details>
            <hr>
            <details open>
                <summary style="color:#f87171;">☢️ Nuke Mode</summary>
                <fieldset>
                    <div class="sectionDescription" style="color:#f87171; font-weight:bold;">
                        ⚠️ WARNING: When enabled, ALL messages matching your parameters are permanently DELETED — no editing, no filters, no mercy.
                    </div>
                    <div class="sectionDescription">
                        <label class="row" style="color:#f87171;">
                            <input id="nukeMode" type="checkbox"> ☢️ Delete everything (ignore all rules)
                        </label>
                    </div>
                </fieldset>
            </details>
            <hr>
            <div></div>
            <div class="info">
                ReDiscord - Purple {{VERSION}}
                <br> Based on Undiscord by victornpb
            </div>
        </div>
        <div class="main col">
            <div class="tbar col">
                <div class="row">
                    <button id="toggleSidebar" class="sizeMedium icon">☰</button>
                    <button id="start" class="sizeMedium danger" style="width: 150px;" title="Start the redaction process">▶︎ Redact</button>
                    <button id="stop" class="sizeMedium" title="Stop the redaction process" disabled>🛑 Stop</button>
                    <button id="clear" class="sizeMedium">Clear log</button>
                    <label class="row" title="Hide sensitive information on your screen for taking screenshots">
                        <input id="redact" type="checkbox" checked> Streamer mode
                    </label>
                </div>
                <div class="row">
                    <progress id="progressBar" style="display:none;"></progress>
                </div>
            </div>
            <div id="rateLimitBanner" class="rateLimitBanner" style="display:none;">
                <div class="bannerText"></div>
                <div class="bannerActions">
                    <button id="rateLimitApply" class="positive">Apply</button>
                    <button id="rateLimitDismiss">Dismiss</button>
                </div>
            </div>
            <pre id="logArea" class="logarea scroll">
                <div class="" style="background: #3b1f1f; color:#f87171; padding: .5em; border-radius:4px;">⚠️ This tool EDITS messages, replacing content with the redaction text. Messages with attachments are DELETED. Enable ☢️ Nuke Mode to delete everything. This cannot be undone.</div>
                <center>
                    <div>This is a revised fork — star the original <a href="{{HOME}}" target="_blank" rel="noopener noreferrer">Undiscord</a> on GitHub!</div>
                    <div><a href="{{HOME}}/discussions" target="_blank" rel="noopener noreferrer">Issues or help</a></div>
                </center>
            </pre>
            <div class="tbar footer row">
                <div id="progressPercent"></div>
                <span class="spacer"></span>
                <label>
                    <input id="autoScroll" type="checkbox" checked> Auto scroll
                </label>
                <div class="resize-handle"></div>
            </div>
        </div>
    </div>
</div>

`);

	const log = {
	  debug() { return logFn ? logFn('debug', arguments) : console.debug.apply(console, arguments); },
	  info() { return logFn ? logFn('info', arguments) : console.info.apply(console, arguments); },
	  verb() { return logFn ? logFn('verb', arguments) : console.log.apply(console, arguments); },
	  warn() { return logFn ? logFn('warn', arguments) : console.warn.apply(console, arguments); },
	  error() { return logFn ? logFn('error', arguments) : console.error.apply(console, arguments); },
	  success() { return logFn ? logFn('success', arguments) : console.info.apply(console, arguments); },
	};

	var logFn; // custom console.log function
	const setLogFn = (fn) => logFn = fn;

	// Helpers
	const wait = async ms => new Promise(done => setTimeout(done, ms));
	const msToHMS = s => `${s / 3.6e6 | 0}h ${(s % 3.6e6) / 6e4 | 0}m ${(s % 6e4) / 1000 | 0}s`;
	const escapeHTML = html => String(html).replace(/[&<"']/g, m => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '\'': '&#039;' })[m]);
	const redact = str => `<x>${escapeHTML(str)}</x>`;
	const queryString = params => params.filter(p => p[1] !== undefined).map(p => p[0] + '=' + encodeURIComponent(p[1])).join('&');
	const ask = async msg => new Promise(resolve => setTimeout(() => resolve(window.confirm(msg)), 10));
	const toSnowflake = (date) => /:/.test(date) ? ((new Date(date).getTime() - 1420070400000) * Math.pow(2, 22)) : date;
	const replaceInterpolations = (str, obj, removeMissing = false) => str.replace(/\{\{([\w_]+)\}\}/g, (m, key) => obj[key] || (removeMissing ? '' : m));

	const PREFIX$1 = '[REDISCORD]';

	// Default replacement text applied to redacted messages when the user hasn't
	// customized one in the GUI. The active runtime text comes from
	// undiscordCore.options.redactText (falls back to this).
	const DEFAULT_REDACT_TEXT = '🔒 Message has been Redacted.\n-# Full access requires subscription to Discord+ [Learn More](<https://youtu.be/wW89DayjjCY?si=4SrrzRTYL6R_5oE1&t=19>)';

	// Prefixes used to detect "already redacted" messages so re-runs don't redo work.
	// Legacy entries keep older redactions (from previous versions) recognized.
	// The active redactText's first line is added to this set at runtime so a
	// user's custom message also self-skips on re-run.
	const REDACT_PREFIXES = [
	  '🔒 Message has been Redacted.', // current default (v5.3.2+)
	  '||REDACTED||',                  // legacy (≤ v5.3.1)
	];

	/**
	 * Delete all messages in a Discord channel or DM
	 * @author Victornpb <https://www.github.com/victornpb>
	 * @see https://github.com/victornpb/undiscord
	 */
	class UndiscordCore {

	  options = {
	    authToken: null, // Your authorization token
	    authorId: null, // Author of the messages you want to delete
	    guildId: null, // Server were the messages are located
	    channelId: null, // Channel were the messages are located
	    minId: null, // Only delete messages after this, leave blank do delete all
	    maxId: null, // Only delete messages before this, leave blank do delete all
	    content: null, // Filter messages that contains this text content
	    hasLink: null, // Filter messages that contains link
	    hasFile: null, // Filter messages that contains file
	    includeNsfw: null, // Search in NSFW channels
	    includePinned: null, // Delete messages that are pinned
	    pattern: null, // Only delete messages that match the regex (insensitive)
	    searchDelay: null, // Delay each time we fetch for more messages
	    deleteDelay: null, // Delay between each delete operation
	    maxAttempt: 2, // Attempts to delete a single message if it fails
	    askForConfirmation: true,
	    nukeMode: false, // if true, delete everything regardless of type/content
	    redactText: null, // text used to overwrite each message; null = use DEFAULT_REDACT_TEXT
	  };

	  state = {
	    running: false,
	    delCount: 0,
	    failCount: 0,
	    grandTotal: 0,
	    offset: 0,
	    iterations: 0,

	    _seachResponse: null,
	    _messagesToDelete: [],
	    _skippedMessages: [],
	  };

	  stats = {
	    startTime: new Date(), // start time
	    throttledCount: 0, // how many times you have been throttled
	    throttledTotalTime: 0, // the total amount of time you spent being throttled
	    lastPing: null, // the most recent ping
	    avgPing: null, // average ping used to calculate the estimated remaining time
	    etr: 0,
	  };

	  // events
	  onStart = undefined;
	  onProgress = undefined;
	  onStop = undefined;

	  resetState() {
	    this.state = {
	      running: false,
	      delCount: 0,
	      failCount: 0,
	      grandTotal: 0,
	      offset: 0,
	      iterations: 0,

	      _seachResponse: null,
	      _messagesToDelete: [],
	      _skippedMessages: [],
	    };

	    this.options.askForConfirmation = true;
	  }

	  /** Automate the deletion process of multiple channels */
	  async runBatch(queue) {
	    if (this.state.running) return log.error('Already running!');

	    log.info(`Runnning batch with queue of ${queue.length} jobs`);
	    for (let i = 0; i < queue.length; i++) {
	      const job = queue[i];
	      log.info('Starting job...', `(${i + 1}/${queue.length})`);

	      // set options
	      this.options = {
	        ...this.options, // keep current options
	        ...job, // override with options for that job
	      };

	      await this.run(true);
	      if (!this.state.running) break;

	      log.info('Job ended.', `(${i + 1}/${queue.length})`);
	      this.resetState();
	      this.options.askForConfirmation = false;
	      this.state.running = true; // continue running
	    }

	    log.info('Batch finished.');
	    this.state.running = false;
	  }

	  /** Start the redaction process */
	  async run(isJob = false) {
	    if (this.state.running && !isJob) return log.error('Already running!');

	    this.state.running = true;
	    this.stats.startTime = new Date();

	    log.success(`\nStarted at ${this.stats.startTime.toLocaleString()}`);
	    log.debug(
	      `authorId = "${redact(this.options.authorId)}"`,
	      `guildId = "${redact(this.options.guildId)}"`,
	      `channelId = "${redact(this.options.channelId)}"`,
	      `minId = "${redact(this.options.minId)}"`,
	      `maxId = "${redact(this.options.maxId)}"`,
	      `hasLink = ${!!this.options.hasLink}`,
	      `hasFile = ${!!this.options.hasFile}`,
	    );

	    if (this.onStart) this.onStart(this.state, this.stats);

	    do {
	      this.state.iterations++;

	      log.verb('Fetching messages...');
	      // Search messages
	      await this.search();

	      // Process results and find which messages should be redacted
	      await this.filterResponse();

	      log.verb(
	        `Grand total: ${this.state.grandTotal}`,
	        `(Messages in current page: ${this.state._seachResponse.messages.length}`,
	        `To be redacted: ${this.state._messagesToDelete.length}`,
	        `Skipped: ${this.state._skippedMessages.length})`,
	        `offset: ${this.state.offset}`
	      );
	      this.printStats();

	      // Calculate estimated time
	      this.calcEtr();
	      log.verb(`Estimated time remaining: ${msToHMS(this.stats.etr)}`);

	      // if there are messages to redact, redact them
	      if (this.state._messagesToDelete.length > 0) {

	        if (await this.confirm() === false) {
	          this.state.running = false; // break out of a job
	          break; // immediately stop this iteration
	        }

	        await this.editMessagesFromList();
	      }
	      else if (this.state._skippedMessages.length > 0) {
	        // There are messages, but nothing to redact (e.g. a page full of system messages or already-redacted)
	        const oldOffset = this.state.offset;
	        this.state.offset += this.state._skippedMessages.length;
	        log.verb('There\'s nothing we can redact on this page, checking next page...');
	        log.verb(`Skipped ${this.state._skippedMessages.length} out of ${this.state._seachResponse.messages.length} in this page.`, `(Offset was ${oldOffset}, adjusted to ${this.state.offset})`);
	      }
	      else {
	        log.verb('Ended because API returned an empty page.');
	        log.verb('[End state]', this.state);
	        if (isJob) break; // break without stopping if this is part of a job
	        this.state.running = false;
	      }

	      // wait before next page (fix search page not updating fast enough)
	      log.verb(`Waiting ${(this.options.searchDelay / 1000).toFixed(2)}s before next page...`);
	      await wait(this.options.searchDelay);

	    } while (this.state.running);

	    this.stats.endTime = new Date();
	    log.success(`Ended at ${this.stats.endTime.toLocaleString()}! Total time: ${msToHMS(this.stats.endTime.getTime() - this.stats.startTime.getTime())}`);
	    this.printStats();
	    log.debug(`Redacted ${this.state.delCount} messages, ${this.state.failCount} failed.\n`);

	    if (this.onStop) this.onStop(this.state, this.stats);
	  }

	  stop() {
	    this.state.running = false;
	    if (this.onStop) this.onStop(this.state, this.stats);
	  }

	  /** Calculate the estimated time remaining based on the current stats */
	  calcEtr() {
	    this.stats.etr = (this.options.searchDelay * Math.round(this.state.grandTotal / 25)) + ((this.options.deleteDelay + this.stats.avgPing) * this.state.grandTotal);
	  }

	  /** Ask for confirmation at the beginning of the process */
	  async confirm() {
	    if (!this.options.askForConfirmation) return true;

	    log.verb('Waiting for your confirmation...');
	    const preview = this.state._messagesToDelete.map(m => `${m.author.username}#${m.author.discriminator}: ${m.attachments.length ? '[ATTACHMENTS]' : m.content}`).join('\n');

	    const answer = await ask(
	      `Do you want to REDACT ~${this.state.grandTotal} messages? (Estimated time: ${msToHMS(this.stats.etr)})\n` +
	      `Each message's text will be replaced with "REDACTED". This cannot be undone.\n` +
	      '(The actual number of messages may be less, depending if you\'re using filters to skip some messages)' +
	      '\n\n---- Preview ----\n' +
	      preview
	    );

	    if (!answer) {
	      log.error('Aborted by you!');
	      return false;
	    }
	    else {
	      log.verb('OK');
	      this.options.askForConfirmation = false; // do not ask for confirmation again on the next request
	      return true;
	    }
	  }

	  async search() {
	    let API_SEARCH_URL;
	    if (this.options.guildId === '@me') API_SEARCH_URL = `https://discord.com/api/v9/channels/${this.options.channelId}/messages/`; // DMs
	    else API_SEARCH_URL = `https://discord.com/api/v9/guilds/${this.options.guildId}/messages/`; // Server

	    let resp;
	    try {
	      this.beforeRequest();
	      resp = await fetch(API_SEARCH_URL + 'search?' + queryString([
	        ['author_id', this.options.authorId || undefined],
	        ['channel_id', (this.options.guildId !== '@me' ? this.options.channelId : undefined) || undefined],
	        ['min_id', this.options.minId ? toSnowflake(this.options.minId) : undefined],
	        ['max_id', this.options.maxId ? toSnowflake(this.options.maxId) : undefined],
	        ['sort_by', 'timestamp'],
	        ['sort_order', 'desc'],
	        ['offset', this.state.offset],
	        ['has', this.options.hasLink ? 'link' : undefined],
	        ['has', this.options.hasFile ? 'file' : undefined],
	        ['content', this.options.content || undefined],
	        ['include_nsfw', this.options.includeNsfw ? true : undefined],
	      ]), {
	        headers: {
	          'Authorization': this.options.authToken,
	        }
	      });
	      this.afterRequest();
	    } catch (err) {
	      this.state.running = false;
	      log.error('Search request threw an error:', err);
	      throw err;
	    }

	    // not indexed yet
	    if (resp.status === 202) {
	      let w = (await resp.json()).retry_after * 1000;
	      w = w || this.stats.searchDelay; // Fix retry_after 0
	      this.stats.throttledCount++;
	      this.stats.throttledTotalTime += w;
	      log.warn(`This channel isn't indexed yet. Waiting ${w}ms for discord to index it...`);
	      await wait(w);
	      return await this.search();
	    }

	    if (!resp.ok) {
	      // searching messages too fast
	      if (resp.status === 429) {
	        let w = (await resp.json()).retry_after * 1000;
	        w = w || this.stats.searchDelay; // Fix retry_after 0

	        this.stats.throttledCount++;
	        this.stats.throttledTotalTime += w;
	        this.stats.searchDelay += w; // increase delay
	        w = this.stats.searchDelay;
	        log.warn(`Being rate limited by the API for ${w}ms! Increasing search delay...`);
	        this.printStats();
	        log.verb(`Cooling down for ${w * 2}ms before retrying...`);

	        await wait(w * 2);
	        return await this.search();
	      }
	      else {
	        this.state.running = false;
	        log.error(`Error searching messages, API responded with status ${resp.status}!\n`, await resp.json());
	        throw resp;
	      }
	    }
	    const data = await resp.json();
	    this.state._seachResponse = data;
	    console.log(PREFIX$1, 'search', data);
	    return data;
	  }

	  async filterResponse() {
	    const data = this.state._seachResponse;

	    // the search total will decrease as we edit stuff
	    const total = data.total_results;
	    if (total > this.state.grandTotal) this.state.grandTotal = total;

	    // search returns messages near the actual message, only get the messages we searched for.
	    const discoveredMessages = data.messages.map(convo => convo.find(message => message.hit === true));

	    // Include normal messages (type 0) and replies (type 19); system messages are not editable.
	    let messagesToDelete = discoveredMessages;
	    messagesToDelete = messagesToDelete.filter(msg => msg.type === 0 || msg.type === 19);
	    messagesToDelete = messagesToDelete.filter(msg => msg.pinned ? this.options.includePinned : true);

	    // In nuke mode, skip content filters and redact-check — delete everything
	    if (this.options.nukeMode) {
	      this.state._messagesToDelete = messagesToDelete;
	      this.state._skippedMessages = discoveredMessages.filter(msg => !messagesToDelete.find(m => m.id === msg.id));
	      console.log(PREFIX$1, 'filterResponse (nuke)', this.state);
	      return;
	    }

	    // skip messages that are already redacted (so re-running is safe)
	    // BUT always keep messages with attachments — they still need to be deleted even if the text was already redacted
	    // Include the active redact text's first line so a user's custom message self-skips on re-run.
	    const activeRedactText = this.options.redactText || DEFAULT_REDACT_TEXT;
	    const activePrefix = (activeRedactText.split('\n')[0] || '').trim();
	    const allPrefixes = activePrefix ? [activePrefix, ...REDACT_PREFIXES] : REDACT_PREFIXES;
	    messagesToDelete = messagesToDelete.filter(msg =>
	      (msg.attachments && msg.attachments.length > 0) || !allPrefixes.some(p => msg.content.startsWith(p))
	    );

	    // custom filter of messages
	    try {
	      const regex = new RegExp(this.options.pattern, 'i');
	      messagesToDelete = messagesToDelete.filter(msg => regex.test(msg.content));
	    } catch (e) {
	      log.warn('Ignoring RegExp because pattern is malformed!', e);
	    }

	    // create an array containing everything we skipped. (used to calculate offset for next searches)
	    const skippedMessages = discoveredMessages.filter(msg => !messagesToDelete.find(m => m.id === msg.id));

	    this.state._messagesToDelete = messagesToDelete;
	    this.state._skippedMessages = skippedMessages;

	    console.log(PREFIX$1, 'filterResponse', this.state);
	  }

	  async editMessagesFromList() {
	    for (let i = 0; i < this.state._messagesToDelete.length; i++) {
	      const message = this.state._messagesToDelete[i];
	      if (!this.state.running) return log.error('Stopped by you!');

	      const hasAttachments = message.attachments && message.attachments.length > 0;
	      const action = (this.options.nukeMode || hasAttachments) ? 'DELETE' : 'EDIT';

	      log.debug(
	        `[${this.state.delCount + 1}/${this.state.grandTotal}] ` +
	        `<b>[${action}]</b> ` +
	        `<sup>${new Date(message.timestamp).toLocaleString()}</sup> ` +
	        `<b>${redact(message.author.username + '#' + message.author.discriminator)}</b>` +
	        `: <i>${redact(message.content).replace(/\n/g, '↵')}</i>` +
	        (hasAttachments ? ' ' + redact(JSON.stringify(message.attachments)) : ''),
	        `<sup>{ID:${redact(message.id)}}</sup>`
	      );

	      // Delete messages with attachments or in nuke mode; edit text-only messages
	      let attempt = 0;
	      while (attempt < this.options.maxAttempt) {
	        const result = (this.options.nukeMode || hasAttachments)
	          ? await this.deleteMessage(message)
	          : await this.editMessage(message);

	        if (result === 'RETRY') {
	          attempt++;
	          log.verb(`Retrying in ${this.options.deleteDelay}ms... (${attempt}/${this.options.maxAttempt})`);
	          await wait(this.options.deleteDelay);
	        }
	        else break;
	      }

	      this.calcEtr();
	      if (this.onProgress) this.onProgress(this.state, this.stats);

	      await wait(this.options.deleteDelay);
	    }
	  }

	  // PATCH the message content to the active redact text instead of deleting
	  async editMessage(message) {
	    const API_EDIT_URL = `https://discord.com/api/v9/channels/${message.channel_id}/messages/${message.id}`;
	    let resp;
	    try {
	      this.beforeRequest();
	      resp = await fetch(API_EDIT_URL, {
	        method: 'PATCH',
	        headers: {
	          'Authorization': this.options.authToken,
	          'Content-Type': 'application/json',
	        },
	        body: JSON.stringify({ content: this.options.redactText || DEFAULT_REDACT_TEXT }),
	      });
	      this.afterRequest();
	    } catch (err) {
	      // no response error (e.g. network error)
	      log.error('Edit request threw an error:', err);
	      log.verb('Related object:', redact(JSON.stringify(message)));
	      this.state.failCount++;
	      return 'FAILED';
	    }

	    if (!resp.ok) {
	      if (resp.status === 429) {
	        // editing messages too fast
	        const w = (await resp.json()).retry_after * 1000;
	        this.stats.throttledCount++;
	        this.stats.throttledTotalTime += w;
	        this.options.deleteDelay = w; // increase delay
	        log.warn(`Being rate limited by the API for ${w}ms! Adjusted edit delay to ${this.options.deleteDelay}ms.`);
	        this.printStats();
	        log.verb(`Cooling down for ${w * 2}ms before retrying...`);
	        await wait(w * 2);
	        return 'RETRY';
	      } else {
	        const body = await resp.text();

	        try {
	          const r = JSON.parse(body);

	          if (resp.status === 400 && r.code === 50083) {
	            // Thread is archived — skip this message
	            log.warn('Error editing message (Thread is archived). Will increment offset so we don\'t search this in the next page...');
	            this.state.offset++;
	            this.state.failCount++;
	            return 'FAIL_SKIP';
	          }

	          log.error(`Error editing message, API responded with status ${resp.status}!`, r);
	          log.verb('Related object:', redact(JSON.stringify(message)));
	          this.state.failCount++;
	          return 'FAILED';
	        } catch (e) {
	          log.error(`Fail to parse JSON. API responded with status ${resp.status}!`, body);
	        }
	      }
	    }

	    this.state.delCount++;
	    return 'OK';
	  }

	  // Hard DELETE a message (used for attachments and nuke mode)
  async deleteMessage(message) {
    const API_DELETE_URL = `https://discord.com/api/v9/channels/${message.channel_id}/messages/${message.id}`;
    let resp;
    try {
      this.beforeRequest();
      resp = await fetch(API_DELETE_URL, {
        method: 'DELETE',
        headers: { 'Authorization': this.options.authToken },
      });
      this.afterRequest();
    } catch (err) {
      log.error('Delete request threw an error:', err);
      log.verb('Related object:', redact(JSON.stringify(message)));
      this.state.failCount++;
      return 'FAILED';
    }
    if (!resp.ok) {
      if (resp.status === 429) {
        const w = (await resp.json()).retry_after * 1000;
        this.stats.throttledCount++;
        this.stats.throttledTotalTime += w;
        this.options.deleteDelay = w;
        log.warn(`Rate limited for ${w}ms! Adjusted delay to ${this.options.deleteDelay}ms.`);
        await wait(w * 2);
        return 'RETRY';
      } else {
        log.error(`Error deleting message, API responded with status ${resp.status}!`);
        this.state.failCount++;
        return 'FAILED';
      }
    }
    this.state.delCount++;
    return 'OK';
  }

  #beforeTs = 0; // used to calculate latency
	  beforeRequest() {
	    this.#beforeTs = Date.now();
	  }
	  afterRequest() {
	    this.stats.lastPing = (Date.now() - this.#beforeTs);
	    this.stats.avgPing = this.stats.avgPing > 0 ? (this.stats.avgPing * 0.9) + (this.stats.lastPing * 0.1) : this.stats.lastPing;
	  }

	  printStats() {
	    log.verb(
	      `Edit delay: ${this.options.deleteDelay}ms, Search delay: ${this.options.searchDelay}ms`,
	      `Last Ping: ${this.stats.lastPing}ms, Average Ping: ${this.stats.avgPing | 0}ms`,
	    );
	    log.verb(
	      `Rate Limited: ${this.stats.throttledCount} times.`,
	      `Total time throttled: ${msToHMS(this.stats.throttledTotalTime)}.`
	    );
	  }
	}

	const MOVE = 0;
	const RESIZE_T = 1;
	const RESIZE_B = 2;
	const RESIZE_L = 4;
	const RESIZE_R = 8;
	const RESIZE_TL = RESIZE_T + RESIZE_L;
	const RESIZE_TR = RESIZE_T + RESIZE_R;
	const RESIZE_BL = RESIZE_B + RESIZE_L;
	const RESIZE_BR = RESIZE_B + RESIZE_R;

	/**
	 * Make an element draggable/resizable
	 * @author Victor N. wwww.vitim.us
	 */
	class DragResize {
	  constructor({ elm, moveHandle, options }) {
	    this.options = defaultArgs({
	      enabledDrag: true,
	      enabledResize: true,
	      minWidth: 200,
	      maxWidth: Infinity,
	      minHeight: 100,
	      maxHeight: Infinity,
	      dragAllowX: true,
	      dragAllowY: true,
	      resizeAllowX: true,
	      resizeAllowY: true,
	      draggingClass: 'drag',
	      useMouseEvents: true,
	      useTouchEvents: true,
	      createHandlers: true,
	    }, options);
	    Object.assign(this, options);
	    options = undefined;

	    elm.style.position = 'fixed';

	    this.drag_m = new Draggable(elm, moveHandle, MOVE, this.options);

	    if (this.options.createHandlers) {
	      this.el_t = createElement('div', { name: 'grab-t' }, elm);
	      this.drag_t = new Draggable(elm, this.el_t, RESIZE_T, this.options);
	      this.el_r = createElement('div', { name: 'grab-r' }, elm);
	      this.drag_r = new Draggable(elm, this.el_r, RESIZE_R, this.options);
	      this.el_b = createElement('div', { name: 'grab-b' }, elm);
	      this.drag_b = new Draggable(elm, this.el_b, RESIZE_B, this.options);
	      this.el_l = createElement('div', { name: 'grab-l' }, elm);
	      this.drag_l = new Draggable(elm, this.el_l, RESIZE_L, this.options);
	      this.el_tl = createElement('div', { name: 'grab-tl' }, elm);
	      this.drag_tl = new Draggable(elm, this.el_tl, RESIZE_TL, this.options);
	      this.el_tr = createElement('div', { name: 'grab-tr' }, elm);
	      this.drag_tr = new Draggable(elm, this.el_tr, RESIZE_TR, this.options);
	      this.el_br = createElement('div', { name: 'grab-br' }, elm);
	      this.drag_br = new Draggable(elm, this.el_br, RESIZE_BR, this.options);
	      this.el_bl = createElement('div', { name: 'grab-bl' }, elm);
	      this.drag_bl = new Draggable(elm, this.el_bl, RESIZE_BL, this.options);
	    }
	  }
	}

	class Draggable {
	  constructor(targetElm, handleElm, op, options) {
	    Object.assign(this, options);
	    options = undefined;

	    this._targetElm = targetElm;
	    this._handleElm = handleElm;

	    let vw = window.innerWidth;
	    let vh = window.innerHeight;
	    let initialX, initialY, initialT, initialL, initialW, initialH;

	    const clamp = (value, min, max) => value < min ? min : value > max ? max : value;

	    const moveOp = (x, y) => {
	      const deltaX = (x - initialX);
	      const deltaY = (y - initialY);
	      const t = clamp(initialT + deltaY, 0, vh - initialH);
	      const l = clamp(initialL + deltaX, 0, vw - initialW);
	      this._targetElm.style.top = t + 'px';
	      this._targetElm.style.left = l + 'px';
	    };

	    const resizeOp = (x, y) => {
	      x = clamp(x, 0, vw);
	      y = clamp(y, 0, vh);
	      const deltaX = (x - initialX);
	      const deltaY = (y - initialY);
	      const resizeDirX = (op & RESIZE_L) ? -1 : 1;
	      const resizeDirY = (op & RESIZE_T) ? -1 : 1;
	      const deltaXMax = (this.maxWidth - initialW);
	      const deltaXMin = (this.minWidth - initialW);
	      const deltaYMax = (this.maxHeight - initialH);
	      const deltaYMin = (this.minHeight - initialH);
	      const t = initialT + clamp(deltaY * resizeDirY, deltaYMin, deltaYMax) * resizeDirY;
	      const l = initialL + clamp(deltaX * resizeDirX, deltaXMin, deltaXMax) * resizeDirX;
	      const w = initialW + clamp(deltaX * resizeDirX, deltaXMin, deltaXMax);
	      const h = initialH + clamp(deltaY * resizeDirY, deltaYMin, deltaYMax);
	      if (op & RESIZE_T) { // resize ↑
	        this._targetElm.style.top = t + 'px';
	        this._targetElm.style.height = h + 'px';
	      }
	      if (op & RESIZE_B) { // resize ↓
	        this._targetElm.style.height = h + 'px';
	      }
	      if (op & RESIZE_L) { // resize ←
	        this._targetElm.style.left = l + 'px';
	        this._targetElm.style.width = w + 'px';
	      }
	      if (op & RESIZE_R) { // resize →
	        this._targetElm.style.width = w + 'px';
	      }
	    };

	    let operation = op === MOVE ? moveOp : resizeOp;

	    function dragStartHandler(e) {
	      const touch = e.type === 'touchstart';
	      if ((e.buttons === 1 || e.which === 1) || touch) {
	        e.preventDefault();
	        const x = touch ? e.touches[0].clientX : e.clientX;
	        const y = touch ? e.touches[0].clientY : e.clientY;
	        initialX = x;
	        initialY = y;
	        vw = window.innerWidth;
	        vh = window.innerHeight;
	        initialT = this._targetElm.offsetTop;
	        initialL = this._targetElm.offsetLeft;
	        initialW = this._targetElm.clientWidth;
	        initialH = this._targetElm.clientHeight;
	        if (this.useMouseEvents) {
	          document.addEventListener('mousemove', this._dragMoveHandler);
	          document.addEventListener('mouseup', this._dragEndHandler);
	        }
	        if (this.useTouchEvents) {
	          document.addEventListener('touchmove', this._dragMoveHandler, { passive: false });
	          document.addEventListener('touchend', this._dragEndHandler);
	        }
	        this._targetElm.classList.add(this.draggingClass);
	      }
	    }

	    function dragMoveHandler(e) {
	      e.preventDefault();
	      let x, y;
	      const touch = e.type === 'touchmove';
	      if (touch) {
	        const t = e.touches[0];
	        x = t.clientX;
	        y = t.clientY;
	      } else { //mouse
	        // If the button is not down, dispatch a "fake" mouse up event, to stop listening to mousemove
	        // This happens when the mouseup is not captured (outside the browser)
	        if ((e.buttons || e.which) !== 1) {
	          this._dragEndHandler();
	          return;
	        }
	        x = e.clientX;
	        y = e.clientY;
	      }
	      // perform drag / resize operation
	      operation(x, y);
	    }

	    function dragEndHandler(e) {
	      if (this.useMouseEvents) {
	        document.removeEventListener('mousemove', this._dragMoveHandler);
	        document.removeEventListener('mouseup', this._dragEndHandler);
	      }
	      if (this.useTouchEvents) {
	        document.removeEventListener('touchmove', this._dragMoveHandler);
	        document.removeEventListener('touchend', this._dragEndHandler);
	      }
	      this._targetElm.classList.remove(this.draggingClass);
	    }

	    // We need to bind the handlers to this instance
	    this._dragStartHandler = dragStartHandler.bind(this);
	    this._dragMoveHandler = dragMoveHandler.bind(this);
	    this._dragEndHandler = dragEndHandler.bind(this);

	    this.enable();
  }

	  /** Turn on the drag and drop of the instance */
	  enable() {
	    this.destroy(); // prevent events from getting binded twice
	    if (this.useMouseEvents) this._handleElm.addEventListener('mousedown', this._dragStartHandler);
	    if (this.useTouchEvents) this._handleElm.addEventListener('touchstart', this._dragStartHandler, { passive: false });
	  }

	  /** Teardown all events bound to the document and elements. You can resurrect this instance by calling enable() */
	  destroy() {
	    this._targetElm.classList.remove(this.draggingClass);
	    if (this.useMouseEvents) {
	      this._handleElm.removeEventListener('mousedown', this._dragStartHandler);
	      document.removeEventListener('mousemove', this._dragMoveHandler);
	      document.removeEventListener('mouseup', this._dragEndHandler);
	    }
	    if (this.useTouchEvents) {
	      this._handleElm.removeEventListener('touchstart', this._dragStartHandler);
	      document.removeEventListener('touchmove', this._dragMoveHandler);
	      document.removeEventListener('touchend', this._dragEndHandler);
	    }
	  }
	}

	function createElement(tag='div', attrs, parent) {
	  const elm = document.createElement(tag);
	  if (attrs) Object.entries(attrs).forEach(([k, v]) => elm.setAttribute(k, v));
	  if (parent) parent.appendChild(elm);
	  return elm;
	}

	function defaultArgs(defaults, options) {
	  function isObj(x) { return x !== null && typeof x === 'object'; }
	  function hasOwn(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
	  if (isObj(options)) for (let prop in defaults) {
	    if (hasOwn(defaults, prop) && hasOwn(options, prop) && options[prop] !== undefined) {
	      if (isObj(defaults[prop])) defaultArgs(defaults[prop], options[prop]);
	      else defaults[prop] = options[prop];
	    }
	  }
	  return defaults;
	}

	function createElm(html) {
	  const temp = document.createElement('div');
	  temp.innerHTML = html;
	  return temp.removeChild(temp.firstElementChild);
	}

	function insertCss(css) {
	  const style = document.createElement('style');
	  style.appendChild(document.createTextNode(css));
	  document.head.appendChild(style);
	  return style;
	}

	const messagePickerCss = `
body.undiscord-pick-message [data-list-id="chat-messages"] {
  background-color: var(--background-secondary-alt);
  box-shadow: inset 0 0 0px 2px var(--button-outline-brand-border);
}

body.undiscord-pick-message [id^="message-content-"]:hover {
  cursor: pointer;
  cursor: cell;
  background: var(--background-message-automod-hover);
}
body.undiscord-pick-message [id^="message-content-"]:hover::after {
  position: absolute;
  top: calc(50% - 11px);
  left: 4px;
  z-index: 1;
  width: 65px;
  height: 22px;
  line-height: 22px;
  font-family: var(--font-display);
  background-color: var(--button-secondary-background);
  color: var(--header-secondary);
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  border-radius: 3px;
  content: 'This 👉';
}
body.undiscord-pick-message.before [id^="message-content-"]:hover::after {
  content: 'Before 👆';
}
body.undiscord-pick-message.after [id^="message-content-"]:hover::after {
  content: 'After 👇';
}
`;

	const messagePicker = {
	  init() {
	    insertCss(messagePickerCss);
	  },
	  grab(auxiliary) {
	    return new Promise((resolve, reject) => {
	      document.body.classList.add('undiscord-pick-message');
	      if (auxiliary) document.body.classList.add(auxiliary);
	      function clickHandler(e) {
	        const message = e.target.closest('[id^="message-content-"]');
	        if (message) {
	          e.preventDefault();
	          e.stopPropagation();
	          e.stopImmediatePropagation();
	          if (auxiliary) document.body.classList.remove(auxiliary);
	          document.body.classList.remove('undiscord-pick-message');
	          document.removeEventListener('click', clickHandler);
	          try {
	            resolve(message.id.match(/message-content-(\d+)/)[1]);
	          } catch (e) {
	            resolve(null);
	          }
	        }
	      }
	      document.addEventListener('click', clickHandler);
	    });
	  }
	};
	window.messagePicker = messagePicker;

	function getToken() {
	  window.dispatchEvent(new Event('beforeunload'));
	  const LS = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage;
	  try {
	    return JSON.parse(LS.token);
	  } catch {
	    log.info('Could not automatically detect Authorization Token in local storage!');
	    log.info('Attempting to grab token using webpack');
	    return (window.webpackChunkdiscord_app.push([[''], {}, e => { window.m = []; for (let c in e.c) window.m.push(e.c[c]); }]), window.m).find(m => m?.exports?.default?.getToken !== void 0).exports.default.getToken();
	  }
	}

	function getAuthorId() {
	  const LS = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage;
	  return JSON.parse(LS.user_id_cache);
	}

	function getGuildId() {
	  const m = location.href.match(/channels\/([\w@]+)\/(\d+)/);
	  if (m) return m[1];
	  else alert('Could not find the Guild ID!\nPlease make sure you are on a Server or DM.');
	}

	function getChannelId() {
	  const m = location.href.match(/channels\/([\w@]+)\/(\d+)/);
	  if (m) return m[2];
	  else alert('Could not find the Channel ID!\nPlease make sure you are on a Channel or DM.');
	}

	function fillToken() {
	  try {
	    return getToken();
	  } catch (err) {
	    log.verb(err);
	    log.error('Could not automatically detect Authorization Token!');
	    log.info('Please make sure Undiscord is up to date');
	    log.debug('Alternatively, you can try entering a Token manually in the "Advanced Settings" section.');
	  }
	  return '';
	}

	const PREFIX = '[REDISCORD]';

	// -------------------------- User interface ------------------------------- //

	// links
	const HOME = 'https://github.com/victornpb/undiscord';
	const WIKI = 'https://github.com/victornpb/undiscord/wiki';

	const undiscordCore = new UndiscordCore();
	messagePicker.init();

	const ui = {
	  undiscordWindow: null,
	  undiscordBtn: null,
	  logArea: null,
	  autoScroll: null,

	  // progress handler
	  progressMain: null,
	  progressIcon: null,
	  percent: null,
	};
	const $ = s => ui.undiscordWindow.querySelector(s);

	function initUI() {

	  insertCss(themeCss);
	  insertCss(mainCss);
	  insertCss(dragCss);

	  // create undiscord window
	  const undiscordUI = replaceInterpolations(undiscordTemplate, {
	    VERSION,
	    HOME,
	    WIKI,
	  });
	  ui.undiscordWindow = createElm(undiscordUI);
	  document.body.appendChild(ui.undiscordWindow);

	  // enable drag and resize on undiscord window
	  new DragResize({ elm: ui.undiscordWindow, moveHandle: $('.header') });

	  // create floating button and mount directly to body
	  ui.undiscordBtn = createElm(buttonHtml);
	  ui.undiscordBtn.onclick = toggleWindow;
	  document.body.appendChild(ui.undiscordBtn);

	  function toggleWindow() {
	    if (ui.undiscordWindow.style.display !== 'none') {
	      ui.undiscordWindow.style.display = 'none';
	      ui.undiscordBtn.style.opacity = '0.7';
	    }
	    else {
	      ui.undiscordWindow.style.display = '';
	      ui.undiscordBtn.style.opacity = '1';
	    }
	  }

	  // cached elements
	  ui.logArea = $('#logArea');
	  ui.autoScroll = $('#autoScroll');
	  ui.progressMain = $('#progressBar');
	  ui.progressIcon = ui.undiscordBtn.querySelector('progress') || { value: 0, style: {}, setAttribute() {}, removeAttribute() {} };
	  ui.percent = $('#progressPercent');

	  // register event listeners
	  $('#hide').onclick = toggleWindow;
	  $('#toggleSidebar').onclick = ()=> ui.undiscordWindow.classList.toggle('hide-sidebar');
	  $('button#start').onclick = startAction;
	  $('button#stop').onclick = stopAction;
	  $('button#clear').onclick = () => ui.logArea.innerHTML = '';
	  $('button#getAuthor').onclick = () => {
	    $('input#authorId').value = getAuthorId();
	    saveSettings();
	  };
	  $('button#getGuild').onclick = () => {
	    const guildId = $('input#guildId').value = getGuildId();
	    if (guildId === '@me') $('input#channelId').value = getChannelId();
	    saveSettings();
	    updateGuildLabel();
	    updateChannelLabel();
	  };
	  $('button#getChannel').onclick = () => {
	    $('input#channelId').value = getChannelId();
	    $('input#guildId').value = getGuildId();
	    saveSettings();
	    updateGuildLabel();
	    updateChannelLabel();
	  };
	  $('button#maxDateNow').onclick = () => {
	    $('#maxDate').value = formatLocalDatetimeLocal(new Date());
	  };
	  $('#redact').onchange = () => {
	    const b = ui.undiscordWindow.classList.toggle('redact');
	    if (b) alert('This mode will attempt to hide personal information, so you can screen share / take screenshots.\nAlways double check you are not sharing sensitive information!');
	  };
	  $('#pickMessageAfter').onclick = async () => {
	    alert('Select a message on the chat.\nThe message below it will be redacted.');
	    toggleWindow();
	    const id = await messagePicker.grab('after');
	    if (id) {
	      $('input#minId').value = id;
	      saveSettings();
	    }
	    toggleWindow();
	  };
	  $('#pickMessageBefore').onclick = async () => {
	    alert('Select a message on the chat.\nThe message above it will be redacted.');
	    toggleWindow();
	    const id = await messagePicker.grab('before');
	    if (id) {
	      $('input#maxId').value = id;
	      saveSettings();
	    }
	    toggleWindow();
	  };
	  $('button#getToken').onclick = () => $('input#token').value = fillToken();

	  // sync delays
	  $('input#searchDelay').onchange = (e) => {
	    const v = parseInt(e.target.value);
	    if (v) undiscordCore.options.searchDelay = v;
	  };
	  $('input#deleteDelay').onchange = (e) => {
	    const v = parseInt(e.target.value);
	    if (v) undiscordCore.options.deleteDelay = v;
	  };

	  $('input#searchDelay').addEventListener('input', (event) => {
	    $('div#searchDelayValue').textContent = event.target.value + 'ms';
	  });
	  $('input#deleteDelay').addEventListener('input', (event) => {
	    $('div#deleteDelayValue').textContent = event.target.value + 'ms';
	  });

	  // import json
	  const fileSelection = $('input#importJsonInput');
	  fileSelection.onchange = async () => {
	    const files = fileSelection.files;

	    // No files added
	    if (files.length === 0) return log.warn('No file selected.');

	    // Get channel id field to set it later
	    const channelIdField = $('input#channelId');

	    // Force the guild id to be ourself (@me)
	    const guildIdField = $('input#guildId');
	    guildIdField.value = '@me';

	    // Set author id in case its not set already
	    $('input#authorId').value = getAuthorId();
	    try {
	      const file = files[0];
	      const text = await file.text();
	      const json = JSON.parse(text);
	      const channelIds = Object.keys(json);
	      channelIdField.value = channelIds.join(',');
	      log.info(`Loaded ${channelIds.length} channels.`);
	      saveSettings();
	    } catch(err) {
	      log.error('Error parsing file!', err);
	    }
	  };

	  // redirect console logs to inside the window after setting up the UI
	  setLogFn(printLog);

	  setupUndiscordCore();

	  // seed the redact-message textarea with the built-in default before
	  // loadSettings() runs (loadSettings will overwrite it if the user has
	  // previously edited it). Then wire up the preset library.
	  const ta = $('#redactText');
	  if (ta) ta.value = DEFAULT_REDACT_TEXT;
	  reloadPresetState();
	  refreshPresetSelect(DEFAULT_PRESET_ID);
	  bindPresetHandlers();

	  // wire up Server/Channel ID → name lookups
	  bindNameResolvers();

	  // silently auto-fill the auth token at panel open so name resolution
	  // works immediately — the user can still replace it manually.
	  try {
	    const tokenEl = $('input#token');
	    if (tokenEl && !tokenEl.value) {
	      const t = getToken();
	      if (t) tokenEl.value = t;
	    }
	  } catch (e) { /* user can click 'fill' manually */ }

	  // restore previously-saved settings, then start tracking changes
	  loadSettings();
	  bindSettingsAutosave();

	  // After all restore work is done, force "Before date" to the current
	  // local datetime — overrides anything previously saved or seeded. The
	  // user can still tweak it before hitting Redact.
	  const maxDateEl = $('#maxDate');
	  if (maxDateEl) maxDateEl.value = formatLocalDatetimeLocal(new Date());

	  // resolve labels for whatever IDs got restored
	  updateGuildLabel();
	  updateChannelLabel();

	  // If last session got rate-limited, surface a banner offering safer delays.
	  showRateLimitBanner();
	}

	// Format a Date as the value an <input type="datetime-local"> expects:
	// YYYY-MM-DDTHH:MM in the user's local time, no timezone suffix.
	function formatLocalDatetimeLocal(d) {
	  const pad = n => String(n).padStart(2, '0');
	  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
	         `T${pad(d.getHours())}:${pad(d.getMinutes())}`;
	}

	function printLog(type = '', args) {
	  ui.logArea.insertAdjacentHTML('beforeend', `<div class="log log-${type}">${Array.from(args).map(o => typeof o === 'object' ? JSON.stringify(o, o instanceof Error && Object.getOwnPropertyNames(o)) : o).join('\t')}</div>`);
	  if (ui.autoScroll.checked) ui.logArea.querySelector('div:last-child').scrollIntoView(false);
	  if (type==='error') console.error(PREFIX, ...Array.from(args));
	}

	function setupUndiscordCore() {

	  undiscordCore.onStart = (state, stats) => {
	    console.log(PREFIX, 'onStart', state, stats);
	    $('#start').disabled = true;
	    $('#stop').disabled = false;

	    ui.undiscordBtn.classList.add('running');
	    ui.progressMain.style.display = 'block';
	    ui.percent.style.display = 'block';
	  };

	  undiscordCore.onProgress = (state, stats) => {
	    let max = state.grandTotal;
	    const value = state.delCount + state.failCount;
	    max = Math.max(max, value, 0); // clamp max

	    // status bar
	    const percent = value >= 0 && max ? Math.round(value / max * 100) + '%' : '';
	    const elapsed = msToHMS(Date.now() - stats.startTime.getTime());
	    const remaining = msToHMS(stats.etr);
	    ui.percent.innerHTML = `${percent} (${value}/${max}) Elapsed: ${elapsed} Remaining: ${remaining}`;

	    ui.progressIcon.value = value;
	    ui.progressMain.value = value;

	    // indeterminate progress bar
	    if (max) {
	      ui.progressIcon.setAttribute('max', max);
	      ui.progressMain.setAttribute('max', max);
	    } else {
	      ui.progressIcon.removeAttribute('value');
	      ui.progressMain.removeAttribute('value');
	      ui.percent.innerHTML = '...';
	    }

	    // update delays
	    const searchDelayInput = $('input#searchDelay');
	    searchDelayInput.value = undiscordCore.options.searchDelay;
	    $('div#searchDelayValue').textContent = undiscordCore.options.searchDelay+'ms';

	    const deleteDelayInput = $('input#deleteDelay');
	    deleteDelayInput.value = undiscordCore.options.deleteDelay;
	    $('div#deleteDelayValue').textContent = undiscordCore.options.deleteDelay+'ms';
	  };

	  undiscordCore.onStop = (state, stats) => {
	    console.log(PREFIX, 'onStop', state, stats);
	    $('#start').disabled = false;
	    $('#stop').disabled = true;
	    ui.undiscordBtn.classList.remove('running');
	    ui.progressMain.style.display = 'none';
	    ui.percent.style.display = 'none';
	    // Remember rate-limit warnings so the next panel open can offer a
	    // safer delay. Only persist if anything actually got throttled —
	    // a clean run wipes the slate.
	    if (stats && stats.throttledCount > 0) {
	      persistSessionStats(state, stats, undiscordCore.options);
	    } else {
	      clearLastSessionStats();
	    }
	  };
	}

	// ---- localStorage shim ----
	// Discord deletes window.localStorage on app boot (so extensions can't read
	// the auth token). We work around it the same way the script already does
	// for getToken/getAuthorId: create a same-origin iframe and use its
	// untouched window.localStorage. The underlying storage is shared, so
	// writes from the iframe LS are readable to the iframe LS on the next load.
	let _safeLSRef = null;
	function safeLS() {
	  if (_safeLSRef) return _safeLSRef;
	  try {
	    const iframe = document.createElement('iframe');
	    iframe.style.display = 'none';
	    document.body.appendChild(iframe);
	    _safeLSRef = iframe.contentWindow.localStorage;
	    // Leave the iframe attached — removing it may invalidate the reference.
	  } catch (e) {
	    console.warn(PREFIX, 'safeLS unavailable, persistence disabled', e);
	    _safeLSRef = null;
	  }
	  return _safeLSRef;
	}

	// ---- Settings persistence ----
	// Token is intentionally excluded — it's a credential and is auto-filled per session.
	const SETTINGS_KEY = 'rediscord-purple-settings';
	const PERSISTED_FIELDS = [
	  // text / number / datetime inputs
	  { id: 'authorId',     prop: 'value' },
	  { id: 'guildId',      prop: 'value' },
	  { id: 'channelId',    prop: 'value' },
	  { id: 'search',       prop: 'value' },
	  { id: 'pattern',      prop: 'value' },
	  { id: 'minId',        prop: 'value' },
	  { id: 'maxId',        prop: 'value' },
	  { id: 'minDate',      prop: 'value' },
	  // maxDate intentionally NOT persisted — see initUI: it's always reset to
	  // the current local datetime on load so "before this moment" is the default.
	  { id: 'searchDelay',  prop: 'value' },
	  { id: 'deleteDelay',  prop: 'value' },
	  { id: 'redactText',   prop: 'value' },
	  // checkboxes
	  { id: 'includeNsfw',    prop: 'checked' },
	  { id: 'nukeMode',       prop: 'checked' },
	  { id: 'hasLink',        prop: 'checked' },
	  { id: 'hasFile',        prop: 'checked' },
	  { id: 'includePinned',  prop: 'checked' },
	  { id: 'redact',         prop: 'checked' },
	  { id: 'autoScroll',     prop: 'checked' },
	];

	function saveSettings() {
	  try {
	    const ls = safeLS();
	    if (!ls) return;
	    const data = {};
	    for (const f of PERSISTED_FIELDS) {
	      const el = $('#' + f.id);
	      if (!el) continue;
	      data[f.id] = el[f.prop];
	    }
	    ls.setItem(SETTINGS_KEY, JSON.stringify(data));
	  } catch (e) {
	    console.warn(PREFIX, 'saveSettings failed', e);
	  }
	}

	function loadSettings() {
	  let data = null;
	  try {
	    const ls = safeLS();
	    const raw = ls && ls.getItem(SETTINGS_KEY);
	    if (raw) data = JSON.parse(raw);
	  } catch (e) {
	    console.warn(PREFIX, 'loadSettings failed', e);
	  }
	  if (!data) return;
	  for (const f of PERSISTED_FIELDS) {
	    if (!(f.id in data)) continue;
	    const el = $('#' + f.id);
	    if (!el) continue;
	    if (f.prop === 'checked') el.checked = !!data[f.id];
	    else el.value = data[f.id] != null ? data[f.id] : '';
	  }
	  // sync derived UI state
	  const sd = $('#searchDelay');
	  if (sd) $('#searchDelayValue').textContent = sd.value + 'ms';
	  const dd = $('#deleteDelay');
	  if (dd) $('#deleteDelayValue').textContent = dd.value + 'ms';
	  const redactCb = $('#redact');
	  if (redactCb) ui.undiscordWindow.classList.toggle('redact', redactCb.checked);
	  // mirror restored delays into core options so they take effect immediately
	  const sdv = parseInt(($('#searchDelay') || {}).value);
	  if (sdv) undiscordCore.options.searchDelay = sdv;
	  const ddv = parseInt(($('#deleteDelay') || {}).value);
	  if (ddv) undiscordCore.options.deleteDelay = ddv;
	}

	function bindSettingsAutosave() {
	  for (const f of PERSISTED_FIELDS) {
	    const el = $('#' + f.id);
	    if (!el) continue;
	    el.addEventListener('change', saveSettings);
	  }
	}

	// ---- Rate-limit memory ----
	// Persist throttle stats from each completed run so we can offer the user
	// a safer delay next time they open the panel. Only stored when the run
	// actually got rate-limited.
	const LAST_SESSION_KEY = 'rediscord-purple-last-session';
	function persistSessionStats(state, stats, optionsUsed) {
	  try {
	    const ls = safeLS();
	    if (!ls) return;
	    const data = {
	      throttledCount: stats.throttledCount || 0,
	      throttledTotalTime: stats.throttledTotalTime || 0,
	      searchDelay: optionsUsed.searchDelay,
	      deleteDelay: optionsUsed.deleteDelay,
	      delCount: state.delCount || 0,
	      failCount: state.failCount || 0,
	      endTime: new Date().toISOString(),
	    };
	    ls.setItem(LAST_SESSION_KEY, JSON.stringify(data));
	  } catch (e) { console.warn(PREFIX, 'persistSessionStats failed', e); }
	}
	function loadLastSessionStats() {
	  try {
	    const ls = safeLS();
	    const raw = ls && ls.getItem(LAST_SESSION_KEY);
	    if (raw) return JSON.parse(raw);
	  } catch (e) { console.warn(PREFIX, 'loadLastSessionStats failed', e); }
	  return null;
	}
	function clearLastSessionStats() {
	  try {
	    const ls = safeLS();
	    if (ls) ls.removeItem(LAST_SESSION_KEY);
	  } catch (e) { console.warn(PREFIX, 'clearLastSessionStats failed', e); }
	}

	// Recommend a higher delay pair based on last session's throttle stats.
	// Returns null if nothing meaningful to suggest (no throttles, or the
	// current sliders are already at-or-above where we'd recommend).
	function recommendDelays(last) {
	  if (!last || !last.throttledCount) return null;
	  const avgThrottle = last.throttledTotalTime / last.throttledCount;
	  // Bump search delay by half the avg throttle time we measured, snap to 100ms.
	  let recSearch = Math.round((last.searchDelay + avgThrottle * 0.5) / 100) * 100;
	  recSearch = Math.min(60000, Math.max(last.searchDelay + 1000, recSearch));
	  // Bump edit delay 25% (no throttle data per-message, but bumping helps), snap to 50ms.
	  let recDelete = Math.round((last.deleteDelay * 1.25) / 50) * 50;
	  recDelete = Math.min(10000, Math.max(last.deleteDelay + 100, recDelete));
	  // Don't pester the user if their current sliders are already as high or higher.
	  const curSearch = parseInt(($('#searchDelay') || {}).value) || last.searchDelay;
	  const curDelete = parseInt(($('#deleteDelay') || {}).value) || last.deleteDelay;
	  if (recSearch <= curSearch && recDelete <= curDelete) return null;
	  return {
	    searchDelay: Math.max(recSearch, curSearch),
	    deleteDelay: Math.max(recDelete, curDelete),
	  };
	}

	function showRateLimitBanner() {
	  const last = loadLastSessionStats();
	  const rec = recommendDelays(last);
	  const banner = $('#rateLimitBanner');
	  if (!banner) return;
	  if (!rec) { banner.style.display = 'none'; return; }
	  const seconds = Math.round((last.throttledTotalTime || 0) / 1000);
	  const text = banner.querySelector('.bannerText');
	  text.innerHTML =
	    `⚠️ Last run was rate-limited <b>${last.throttledCount}×</b>` +
	    (seconds ? ` (${seconds}s total cooldown)` : '') + '. ' +
	    `Bump <b>Search delay</b> ${last.searchDelay}ms → <b>${rec.searchDelay}ms</b> and ` +
	    `<b>Edit delay</b> ${last.deleteDelay}ms → <b>${rec.deleteDelay}ms</b>?`;
	  banner.style.display = 'flex';
	  $('#rateLimitApply').onclick = () => {
	    const sd = $('#searchDelay');
	    const dd = $('#deleteDelay');
	    if (sd) { sd.value = rec.searchDelay; $('#searchDelayValue').textContent = rec.searchDelay + 'ms'; }
	    if (dd) { dd.value = rec.deleteDelay; $('#deleteDelayValue').textContent = rec.deleteDelay + 'ms'; }
	    undiscordCore.options.searchDelay = rec.searchDelay;
	    undiscordCore.options.deleteDelay = rec.deleteDelay;
	    saveSettings();
	    clearLastSessionStats();
	    banner.style.display = 'none';
	    log.info(`Applied safer delays: search ${rec.searchDelay}ms, edit ${rec.deleteDelay}ms.`);
	  };
	  $('#rateLimitDismiss').onclick = () => {
	    clearLastSessionStats();
	    banner.style.display = 'none';
	  };
	}

	// ---- Redaction-message presets ----
	// Stored separately from the per-input settings so the preset library is
	// independent of the live textarea content.
	const PRESETS_KEY = 'rediscord-purple-redact-presets';
	const DEFAULT_PRESET_ID = '__default__';

	function loadPresetState() {
	  try {
	    const ls = safeLS();
	    const raw = ls && ls.getItem(PRESETS_KEY);
	    if (raw) {
	      const parsed = JSON.parse(raw);
	      if (Array.isArray(parsed.presets)) return parsed;
	    }
	  } catch (e) {
	    console.warn(PREFIX, 'loadPresetState failed', e);
	  }
	  return { presets: [] };
	}

	function savePresetState(state) {
	  try {
	    const ls = safeLS();
	    if (ls) ls.setItem(PRESETS_KEY, JSON.stringify(state));
	  } catch (e) { console.warn(PREFIX, 'savePresetState failed', e); }
	}

	// Defer reading until initUI runs (document.body guaranteed available there);
	// reloadPresetState() can refresh after a save if needed.
	let presetState = { presets: [] };
	function reloadPresetState() { presetState = loadPresetState(); }

	function refreshPresetSelect(selectedId) {
	  const sel = $('#redactPresetSelect');
	  if (!sel) return;
	  sel.innerHTML = '';
	  const optDefault = document.createElement('option');
	  optDefault.value = DEFAULT_PRESET_ID;
	  optDefault.textContent = 'Default (🔒 Redacted)';
	  sel.appendChild(optDefault);
	  for (const p of presetState.presets) {
	    const o = document.createElement('option');
	    o.value = p.id;
	    o.textContent = p.name;
	    sel.appendChild(o);
	  }
	  if (selectedId && [...sel.options].some(o => o.value === selectedId)) {
	    sel.value = selectedId;
	  }
	  // hide delete button for the built-in default
	  const del = $('#redactPresetDelete');
	  if (del) del.style.visibility = (sel.value === DEFAULT_PRESET_ID) ? 'hidden' : 'visible';
	}

	function loadPresetIntoTextarea(id) {
	  const ta = $('#redactText');
	  if (!ta) return;
	  if (id === DEFAULT_PRESET_ID) {
	    ta.value = DEFAULT_REDACT_TEXT;
	  } else {
	    const p = presetState.presets.find(p => p.id === id);
	    if (p) ta.value = p.text;
	  }
	  saveSettings(); // persist the textarea value via the standard settings layer
	}

	// ---- Server/Channel name resolution ----
	// Hit Discord's API with the user's auth token to translate a guild ID or
	// channel ID into the human-readable name shown above the input.
	const NAME_CACHE_KEY = 'rediscord-purple-name-cache';
	let _nameCache = null;
	function loadNameCache() {
	  if (_nameCache) return _nameCache;
	  try {
	    const ls = safeLS();
	    const raw = ls && ls.getItem(NAME_CACHE_KEY);
	    if (raw) _nameCache = JSON.parse(raw);
	  } catch (e) { console.warn(PREFIX, 'loadNameCache failed', e); }
	  if (!_nameCache || typeof _nameCache !== 'object') _nameCache = {};
	  if (!_nameCache.guilds) _nameCache.guilds = {};
	  if (!_nameCache.channels) _nameCache.channels = {};
	  return _nameCache;
	}
	function saveNameCache() {
	  try {
	    const ls = safeLS();
	    if (ls && _nameCache) ls.setItem(NAME_CACHE_KEY, JSON.stringify(_nameCache));
	  } catch (e) { console.warn(PREFIX, 'saveNameCache failed', e); }
	}
	function currentToken() {
	  const tEl = $('#token');
	  return (tEl && tEl.value.trim()) || '';
	}
	async function resolveGuildName(guildId) {
	  if (!guildId) return '';
	  if (guildId === '@me') return 'Direct Messages';
	  const cache = loadNameCache();
	  if (cache.guilds[guildId]) return cache.guilds[guildId];
	  const token = currentToken();
	  if (!token) return null; // signal: can't resolve, no token
	  try {
	    const r = await fetch(`https://discord.com/api/v9/guilds/${guildId}`, { headers: { 'Authorization': token } });
	    if (!r.ok) return '';
	    const j = await r.json();
	    if (j && j.name) {
	      cache.guilds[guildId] = j.name;
	      saveNameCache();
	      return j.name;
	    }
	  } catch (e) { console.warn(PREFIX, 'resolveGuildName failed', e); }
	  return '';
	}
	async function resolveChannelName(channelId) {
	  if (!channelId) return '';
	  const cache = loadNameCache();
	  if (cache.channels[channelId]) return cache.channels[channelId];
	  const token = currentToken();
	  if (!token) return null;
	  try {
	    const r = await fetch(`https://discord.com/api/v9/channels/${channelId}`, { headers: { 'Authorization': token } });
	    if (!r.ok) return '';
	    const j = await r.json();
	    let name = j && j.name;
	    // DMs have no name — synthesize from recipients
	    if (!name && j && Array.isArray(j.recipients) && j.recipients.length) {
	      name = j.recipients.map(u => u.global_name || u.username).filter(Boolean).join(', ');
	    }
	    if (name) {
	      cache.channels[channelId] = name;
	      saveNameCache();
	      return name;
	    }
	  } catch (e) { console.warn(PREFIX, 'resolveChannelName failed', e); }
	  return '';
	}
	function setLabel(labelEl, text, opts) {
	  if (!labelEl) return;
	  labelEl.classList.remove('loading', 'err');
	  if (opts && opts.loading) labelEl.classList.add('loading');
	  if (opts && opts.err) labelEl.classList.add('err');
	  labelEl.textContent = text || '';
	}
	async function updateGuildLabel() {
	  const label = $('#guildIdLabel');
	  const id = ($('#guildId').value || '').trim();
	  if (!id) { setLabel(label, ''); return; }
	  setLabel(label, 'looking up…', { loading: true });
	  const name = await resolveGuildName(id);
	  if (name === null) setLabel(label, 'name unavailable (fill token first)', { err: true });
	  else setLabel(label, name);
	}
	async function updateChannelLabel() {
	  const label = $('#channelIdLabel');
	  const raw = ($('#channelId').value || '').trim();
	  if (!raw) { setLabel(label, ''); return; }
	  // channelId field may contain a comma-separated list — only resolve the first one.
	  const id = raw.split(/\s*,\s*/)[0];
	  setLabel(label, 'looking up…', { loading: true });
	  const name = await resolveChannelName(id);
	  if (name === null) setLabel(label, 'name unavailable (fill token first)', { err: true });
	  else setLabel(label, name ? '#' + name : '');
	}
	let _guildResolveT, _channelResolveT;
	function bindNameResolvers() {
	  const g = $('#guildId');
	  const c = $('#channelId');
	  if (g) g.addEventListener('input', () => {
	    clearTimeout(_guildResolveT);
	    _guildResolveT = setTimeout(updateGuildLabel, 400);
	  });
	  if (c) c.addEventListener('input', () => {
	    clearTimeout(_channelResolveT);
	    _channelResolveT = setTimeout(updateChannelLabel, 400);
	  });
	}

	function bindPresetHandlers() {
	  const sel = $('#redactPresetSelect');
	  const ta = $('#redactText');
	  if (!sel || !ta) return;

	  sel.addEventListener('change', () => {
	    loadPresetIntoTextarea(sel.value);
	    const del = $('#redactPresetDelete');
	    if (del) del.style.visibility = (sel.value === DEFAULT_PRESET_ID) ? 'hidden' : 'visible';
	  });

	  $('#redactPresetSaveAs').addEventListener('click', () => {
	    const name = prompt('Name this redaction message:');
	    if (!name) return;
	    const id = 'p_' + Date.now().toString(36);
	    presetState.presets.push({ id, name: name.slice(0, 60), text: ta.value });
	    savePresetState(presetState);
	    refreshPresetSelect(id);
	    log.info(`Saved redaction message "${name}".`);
	  });

	  $('#redactPresetUpdate').addEventListener('click', () => {
	    if (sel.value === DEFAULT_PRESET_ID) {
	      alert('The built-in default can\'t be overwritten. Use "Save as…" to make a copy.');
	      return;
	    }
	    const p = presetState.presets.find(p => p.id === sel.value);
	    if (!p) return;
	    p.text = ta.value;
	    savePresetState(presetState);
	    log.info(`Updated "${p.name}".`);
	  });

	  $('#redactPresetDelete').addEventListener('click', () => {
	    if (sel.value === DEFAULT_PRESET_ID) return;
	    const idx = presetState.presets.findIndex(p => p.id === sel.value);
	    if (idx === -1) return;
	    const removed = presetState.presets[idx];
	    if (!confirm(`Delete "${removed.name}"?`)) return;
	    presetState.presets.splice(idx, 1);
	    savePresetState(presetState);
	    refreshPresetSelect(DEFAULT_PRESET_ID);
	    loadPresetIntoTextarea(DEFAULT_PRESET_ID);
	    log.info(`Deleted "${removed.name}".`);
	  });

	  $('#redactPresetReset').addEventListener('click', () => {
	    sel.value = DEFAULT_PRESET_ID;
	    loadPresetIntoTextarea(DEFAULT_PRESET_ID);
	    refreshPresetSelect(DEFAULT_PRESET_ID);
	  });
	}

	async function startAction() {
	  console.log(PREFIX, 'startAction');
	  // general
	  const authorId = $('input#authorId').value.trim();
	  const guildId = $('input#guildId').value.trim();
	  const channelIds = $('input#channelId').value.trim().split(/\s*,\s*/);
	  const includeNsfw = $('input#includeNsfw').checked;
  const nukeMode = $('input#nukeMode').checked;
	  // filter
	  const content = $('input#search').value.trim();
	  const hasLink = $('input#hasLink').checked;
	  const hasFile = $('input#hasFile').checked;
	  const includePinned = $('input#includePinned').checked;
	  const pattern = $('input#pattern').value;
	  // message interval
	  const minId = $('input#minId').value.trim();
	  const maxId = $('input#maxId').value.trim();
	  // date range
	  const minDate = $('input#minDate').value.trim();
	  const maxDate = $('input#maxDate').value.trim();
	  //advanced
	  const searchDelay = parseInt($('input#searchDelay').value.trim());
	  const deleteDelay = parseInt($('input#deleteDelay').value.trim());
	  // redact text
	  const redactText = ($('#redactText') && $('#redactText').value) || DEFAULT_REDACT_TEXT;

	  // token
	  const authToken = $('input#token').value.trim() || fillToken();
	  if (!authToken) return; // get token already logs an error.

	  // validate input
	  if (!guildId) return log.error('You must fill the "Server ID" field!');

	  // persist the just-committed settings so the next page load reopens with these values
	  saveSettings();

	  // clear logArea
	  ui.logArea.innerHTML = '';

	  undiscordCore.resetState();
	  undiscordCore.options = {
	    ...undiscordCore.options,
	    authToken,
	    authorId,
	    guildId,
	    channelId: channelIds.length === 1 ? channelIds[0] : undefined, // single or multiple channel
	    minId: minId || minDate,
	    maxId: maxId || maxDate,
	    content,
	    hasLink,
	    hasFile,
	    includeNsfw,
	    includePinned,
	    pattern,
	    searchDelay,
	    deleteDelay,
	    nukeMode,
	    redactText,
	    // maxAttempt: 2,
	  };
	  if (channelIds.length > 1) {
	    const jobs = channelIds.map(ch => ({
	      guildId: guildId,
	      channelId: ch,
	    }));

	    try {
	      await undiscordCore.runBatch(jobs);
	    } catch (err) {
	      log.error('CoreException', err);
	    }
	  }
	  // single channel
	  else {
	    try {
	      await undiscordCore.run();
	    } catch (err) {
	      log.error('CoreException', err);
	      undiscordCore.stop();
	    }
	  }
	}

	function stopAction() {
	  console.log(PREFIX, 'stopAction');
	  undiscordCore.stop();
	}

	// ---- END Undiscord ----

	initUI();

})();
