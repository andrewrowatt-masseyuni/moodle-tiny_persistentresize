// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Tiny persistentresize commands
 *
 * @module     tiny_persistentresize/commands
 * @copyright  2025 Andrew Rowatt <A.J.Rowatt@massey.ac.nz>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getButtonImage} from 'editor_tiny/utils';
import {get_string as getString} from 'core/str';
import {component, buttonName, icon} from 'tiny_persistentresize/common';
import Notification from 'core/notification';

export const getSetup = async() => {
    const [
        menuTitle,
        menuImage,
        confirmationTitle,
        confirmationMessage,
    ] = await Promise.all([
        getString('menutitle', component),
        getButtonImage('icon', component),
        getString('confirmationtitle', component),
        getString('confirmationmessage', component),
    ]);

    return (editor) => {
        // Register the persistentresize icon.
        editor.ui.registry.addIcon(icon, menuImage.html);

        // Register the Menu item.
        editor.ui.registry.addMenuItem(buttonName, {
            icon,
            text: menuTitle,
            onAction: () => {
                const target = editor.getElement();
                const storedDefaultheight = localStorage.getItem(`tiny_persistentresize_height_${target.id}_default`);

                // Reset to default height and remove stored height preference.
                // Tiny will handle the actual resize and a null height with a sensible default.
                editor.editorContainer.style.height = storedDefaultheight;
                localStorage.removeItem(`tiny_persistentresize_height_${target.id}`);
                localStorage.removeItem(`tiny_persistentresize_height_${target.id}_default`);
                // Notify the user.
                Notification.alert(confirmationTitle, confirmationMessage);
            },
        });

        // Restore the editor height from localStorage if it exists.
        editor.on('init', () => {
            const target = editor.getElement();

            // Store the default height in case the user wants to reset it later.
            localStorage.setItem(`tiny_persistentresize_height_${target.id}_default`, editor.editorContainer.style.height);

            const storedheight = localStorage.getItem(`tiny_persistentresize_height_${target.id}`);
            if (storedheight) {
                editor.editorContainer.style.height = storedheight;
            }
        });

        // Store the editor height in localStorage whenever it is resized.
        editor.on('ResizeEditor', function() {
            const target = editor.getElement();
            localStorage.setItem(`tiny_persistentresize_height_${target.id}`, editor.editorContainer.style.height);
        });
    };
};
