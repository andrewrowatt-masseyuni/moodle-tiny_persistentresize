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
import {component, buttonName, clearAllButtonName, icon, iconclearall} from 'tiny_persistentresize/common';
import Notification from 'core/notification';
import ModalFactory from 'core/modal_factory';
import ModalEvents from 'core/modal_events';
import {getUsername} from 'tiny_persistentresize/options';
import * as Storage from 'tiny_persistentresize/storage';

export const getSetup = async() => {
    const [
        menuTitle,
        menuImage,
        menuClearAllImage,
        confirmationTitle,
        confirmationMessage,
        clearAllMenuTitle,
        clearAllConfirmTitle,
        clearAllConfirmMessage,
        clearAllSuccessTitle,
        clearAllSuccessMessage,
        yesString,
    ] = await Promise.all([
        getString('menutitle', component),
        getButtonImage('menuicon', component),
        getButtonImage('menuclearallicon', component),
        getString('confirmationtitle', component),
        getString('confirmationmessage', component),
        getString('clearallmenutitle', component),
        getString('clearallconfirmtitle', component),
        getString('clearallconfirmmessage', component),
        getString('clearallsuccesstitle', component),
        getString('clearallsuccessmessage', component),
        getString('yes', 'core'),
    ]);

    return (editor) => {
        // Register the persistentresize icon.
        editor.ui.registry.addIcon(icon, menuImage.html);
        editor.ui.registry.addIcon(iconclearall, menuClearAllImage.html);

        // Register the Menu item.
        editor.ui.registry.addMenuItem(buttonName, {
            icon,
            text: menuTitle,
            onAction: async() => {
                const target = editor.getElement();
                const username = getUsername(editor);
                const defaultKey = `${username}_tiny_persistentresize_height_${target.id}_default`;
                const heightKey = `${username}_tiny_persistentresize_height_${target.id}`;

                try {
                    const storedDefaultheight = await Storage.getItem(defaultKey);

                    // Reset to default height and remove stored height preference.
                    // Tiny will handle the actual resize and a null height with a sensible default.
                    editor.editorContainer.style.height = storedDefaultheight;
                    await Storage.removeItem(heightKey);
                    await Storage.removeItem(defaultKey);
                    // Notify the user.
                    Notification.alert(confirmationTitle, confirmationMessage);
                } catch (error) {
                    Notification.exception(error);
                }
            },
        });

        // Register the "Clear All" Menu item.
        editor.ui.registry.addMenuItem(clearAllButtonName, {
            icon: iconclearall,
            text: clearAllMenuTitle,
            onAction: () => {
                // Show confirmation dialog.
                ModalFactory.create({
                    type: ModalFactory.types.SAVE_CANCEL,
                    title: clearAllConfirmTitle,
                    body: clearAllConfirmMessage,
                }).then((modal) => {
                    modal.setSaveButtonText(yesString);
                    modal.getRoot().on(ModalEvents.save, async() => {
                        try {
                            // Save the current editor's default height before clearing.
                            const target = editor.getElement();
                            const username = getUsername(editor);
                            const defaultKey = `${username}_tiny_persistentresize_height_${target.id}_default`;
                            const storedDefaultheight = await Storage.getItem(defaultKey);

                            // Clear all IndexedDB items related to this plugin for this user.
                            const allKeys = await Storage.getAllKeys();
                            const prefix = `${username}_tiny_persistentresize_height_`;
                            const keysToRemove = allKeys.filter(key => key.startsWith(prefix));
                            await Promise.all(keysToRemove.map(key => Storage.removeItem(key)));

                            // Reset the current editor to default height.
                            if (storedDefaultheight) {
                                editor.editorContainer.style.height = storedDefaultheight;
                            }

                            // Notify the user.
                            Notification.alert(clearAllSuccessTitle, clearAllSuccessMessage);
                        } catch (error) {
                            Notification.exception(error);
                        }
                    });
                    modal.show();
                    return modal;
                }).catch(Notification.exception);
            },
        });

        // Restore the editor height from IndexedDB if it exists.
        editor.on('init', async() => {
            const target = editor.getElement();
            const username = getUsername(editor);
            const defaultKey = `${username}_tiny_persistentresize_height_${target.id}_default`;
            const heightKey = `${username}_tiny_persistentresize_height_${target.id}`;

            try {
                // Store the default height in case the user wants to reset it later.
                await Storage.setItem(defaultKey, editor.editorContainer.style.height);

                const storedheight = await Storage.getItem(heightKey);
                if (storedheight) {
                    editor.editorContainer.style.height = storedheight;
                }
            } catch (error) {
                Notification.exception(error);
            }
        });

        // Store the editor height in IndexedDB whenever it is resized.
        editor.on('ResizeEditor', async function() {
            const target = editor.getElement();
            const username = getUsername(editor);
            const heightKey = `${username}_tiny_persistentresize_height_${target.id}`;

            try {
                await Storage.setItem(heightKey, editor.editorContainer.style.height);
            } catch (error) {
                Notification.exception(error);
            }
        });
    };
};
