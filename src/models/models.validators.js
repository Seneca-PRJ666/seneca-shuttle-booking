/**
 * Validates an email address.
 */
import {isEmail} from "../utilities/validator.js";

export const validateEmail={
    validator:function(v){
        return isEmail(v);
    },
    message: props=> `${props.value} is not a valid email.`
};