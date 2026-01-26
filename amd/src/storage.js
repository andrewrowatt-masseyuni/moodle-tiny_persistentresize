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
 * IndexedDB storage utility for persistent resize plugin
 *
 * @module     tiny_persistentresize/storage
 * @copyright  2025 Andrew Rowatt <A.J.Rowatt@massey.ac.nz>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

const DB_NAME = 'tiny_persistentresize';
const DB_VERSION = 1;
const STORE_NAME = 'editorSizes';

/**
 * Open or create the IndexedDB database
 * @returns {Promise<IDBDatabase>}
 */
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
    });
};

/**
 * Set a value in IndexedDB
 * @param {string} key - The key to store the value under
 * @param {string} value - The value to store
 * @returns {Promise<void>}
 */
export const setItem = async (key, value) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(value, key);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();

        transaction.oncomplete = () => db.close();
    });
};

/**
 * Get a value from IndexedDB
 * @param {string} key - The key to retrieve the value for
 * @returns {Promise<string|null>}
 */
export const getItem = async (key) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(key);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result || null);

        transaction.oncomplete = () => db.close();
    });
};

/**
 * Remove a value from IndexedDB
 * @param {string} key - The key to remove
 * @returns {Promise<void>}
 */
export const removeItem = async (key) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(key);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();

        transaction.oncomplete = () => db.close();
    });
};

/**
 * Get all keys from IndexedDB
 * @returns {Promise<Array<string>>}
 */
export const getAllKeys = async () => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAllKeys();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result || []);

        transaction.oncomplete = () => db.close();
    });
};
