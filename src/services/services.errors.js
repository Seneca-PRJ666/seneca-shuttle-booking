
/**
 * Custom error calss
 */
export class MyCustomError extends Error{

    constructor(message){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}


/**
 * Custom error class.
 *
 */
export class DuplicateDataError extends MyCustomError {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Generated when a required argument is not found.
 */
export class RequiredItemMissingError extends MyCustomError{
    constructor(message) {
        super(message);
        this.name=this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Error that is thrown when arguemtns passed in a function are not valid.
 */
export class InvalidArguments extends MyCustomError{
    constructor(message) {
        super(message);
        this.name= this.constructor.name;
        Error.captureStackTrace(this,this.constructor);
    }
}

/**
 * Error that is thrown when arguemtns passed in a function are not valid.
 */
export class ItemNotFound extends MyCustomError{
    constructor(message) {
        super(message);
        this.name= this.constructor.name;
        Error.captureStackTrace(this,this.constructor);
    }
}


// /**
//  * This error is thrown when a token can't be validated.
//  */
// export class InvalidTokenError extends MyCustomError{
//     constructor(message) {
//         super(message);
//         this.name= this.constructor.name;
//         Error.captureStackTrace(this,this.constructor);
//     }
// }
//
// /**
//  * This error is thrown when a token is expired.
//  */
// export class ExpiredTokenError extends MyCustomError{
//     constructor(message) {
//         super(message);
//         this.name= this.constructor.name;
//         Error.captureStackTrace(this,this.constructor);
//     }
// }

