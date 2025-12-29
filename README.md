# Persistent Resize - TinyMCE plugin for Moodle

A TinyMCE editor plugin for Moodle that remembers the height of each editor instance between page loads.

## Description

When users resize the TinyMCE editor by dragging the resize handle, this plugin automatically saves the new height to the browser's localStorage. The next time the user visits a page with that same editor, it will be restored to their preferred height.

Each editor instance is tracked separately by its element ID, so users can have different preferred heights for different editors throughout Moodle.

## Features

-   Automatically saves editor height when resized
-   Restores saved height on page load
-   Per-editor height preferences (different editors can have different heights)
-   Menu option to clear the saved height preference and reset to default
-   No server-side storage required (uses browser localStorage). Note this also means sizes are not sync'ed across browsers or devices. This is intentional.

## Requirements

-   Moodle 4.5 (2024100700)

## Installing via uploaded ZIP file

1.  Log in to your Moodle site as an admin and go to *Site administration \> Plugins \> Install plugins*.
2.  Upload the ZIP file with the plugin code. You should only be prompted to add extra details if your plugin type is not automatically detected.
3.  Check the plugin validation report and finish the installation.

## Installing manually

The plugin can be also installed by putting the contents of this directory to

```
{your/moodle/dirroot}/lib/editor/tiny/plugins/persistentresize
```

Afterwards, log in to your Moodle site as an admin and go to *Site administration \> Notifications* to complete the installation.

Alternatively, you can run

```
$ php admin/cli/upgrade.php
```

to complete the installation from the command line.

Alternatively, install using git:

```
cd /path/to/moodle
git clone https://github.com/andrewrowatt-masseyuni/moodle-tiny_persistentresize.git lib/editor/tiny/plugins/persistentresize
```

Afterwards, log in to your Moodle site as an admin and go to *Site administration \> Notifications* to complete the installation.

Alternatively, you can run

```
$ php admin/cli/upgrade.php
```

to complete the installation from the command line.

## Usage

Once installed, the plugin works automatically. Simply resize any TinyMCE editor using the drag handle at the bottom of the editor, and your preference will be remembered.

To clear a saved height preference for a specific editor:

1.  Click the editor's *Tools* menu
2.  Select "Clear editor size preference (for this editor)"

To clear a saved height preference for all editors:

1.  Click the editor's *Tools* menu
2.  Select "Clear all editor size preferences"

## Icons

*Close* by Marek Polakovic from [Noun Project](https://thenounproject.com/icon/close-142255/) (CC BY 3.0).

*Close all* by Marek Polakovic from [Noun Project](https://thenounproject.com/icon/close-142258/) (CC BY 3.0)

## License

This plugin is licensed under the GNU GPL v3 or later.

Copyright 2025 Andrew Rowatt [A.J.Rowatt@massey.ac.nz](mailto:A.J.Rowatt@massey.ac.nz)
