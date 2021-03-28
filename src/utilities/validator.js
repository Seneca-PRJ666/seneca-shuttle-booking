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

/**
 * Validates email address
 * For email address validation {@link https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address|read here}
 *
 * @param   {!string}   email       -Email address to be validated.
 * @returns {boolean}   True if the address is an email address.
 */
export function isEmail (email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
}