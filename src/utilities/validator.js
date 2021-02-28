'use strict'

import validate from "validate.js";

/**
 * Checks if the given value is empty. The following are evaluated to be empty-
 * <ul>
 *     <li>null</li>
 *     <li>undefined</li>
 *     <li>Empty strings</li>
 *     <li>Whitespace only string</li>
 *     <li>Empty array</li>
 *     <li>Empty objects</li>
 * </ul>
 * @param {Any} value - The value to be evaluated.
 * @returns {boolean}
 */
export function isEmpty(value){
    return validate.isEmpty(value);
}