# Persistent Resize - TinyMCE plugin for Moodle

A TinyMCE editor plugin for Moodle that remembers the height of each editor instance between page loads.

## Description

When users resize the TinyMCE editor by dragging the resize handle, this plugin automatically saves the new height to the browser's localStorage. The next time the user visits a page with that same editor, it will be restored to their preferred height.

Each editor instance is tracked separately by its element ID, so users can have different preferred heights for different editors throughout Moodle.

## Features

- Automatically saves editor height when resized
- Restores saved height on page load
- Per-editor height preferences (different editors can have different heights)
- Menu option to clear the saved height preference and reset to default
- No server-side storage required (uses browser localStorage). Note this also means sizes are not sync'ed across browsers or devices. This is intentional.

## Requirements

- Moodle 4.5 (2024100700)

## Installation

1. Download the plugin
2. Extract to `lib/editor/tiny/plugins/persistentresize`
3. Visit Site administration > Notifications to complete the installation

Alternatively, install using git:

```bash
cd /path/to/moodle
git clone https://github.com/andrewrowatt-masseyuni/moodle-tiny_persistentresize.git lib/editor/tiny/plugins/persistentresize
```

## Usage

Once installed, the plugin works automatically. Simply resize any TinyMCE editor using the drag handle at the bottom of the editor, and your preference will be remembered.

To clear a saved height preference for a specific editor:
1. Click the editor's menu button (three dots or hamburger menu)
2. Select "Clear editor size preference (for this editor)"

## License

This plugin is licensed under the GNU GPL v3 or later.

Copyright 2025 Andrew Rowatt <A.J.Rowatt@massey.ac.nz>
