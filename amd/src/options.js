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
 * Options helper for persistentresize plugin
 *
 * @module     tiny_persistentresize/options
 * @copyright  2025 Andrew Rowatt <A.J.Rowatt@massey.ac.nz>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getPluginOptionName} from 'editor_tiny/options';
import {pluginName} from 'tiny_persistentresize/common';

const contextIdName = getPluginOptionName(pluginName, 'contextid');
const usernameName = getPluginOptionName(pluginName, 'username');

/**
 * Register the options for the persistentresize plugin.
 *
 * @param {tinyMCE} editor
 */
export const register = (editor) => {
    const registerOption = editor.options.register;

    registerOption(contextIdName, {
        processor: 'number',
        "default": 0,
    });

    registerOption(usernameName, {
        processor: 'string',
        "default": '',
    });
};

/**
 * Get the context id (TODO this is an example option).
 *
 * @param {TinyMCE} editor
 * @returns {number}
 */
export const getContextId = (editor) => editor.options.get(contextIdName);

/**
 * Get the username.
 *
 * @param {TinyMCE} editor
 * @returns {string}
 */
export const getUsername = (editor) => editor.options.get(usernameName);
