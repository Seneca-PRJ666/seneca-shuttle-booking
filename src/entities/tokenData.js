/**
 * This is a simple class to encapsulate data needed to generate a token.
 * @module Utilities/TokenData
 * @author Badal Sarkar <badalsarkar86@gmail.com>
 */
import  env from "dotenv";
import {isEmpty} from "../utilities/validator.js";

env.config();

export default class TokenData{

    /**
     * Constructs an object that can be passed to TokenService to generate a token.
     * @param {!Object} payload={} - The payload that will be put in the token
     * @param {String} secret=process.env.TOKEN_SECRET - The secret that will be used to generate a token.
     * @param {String} expiryTime=30min - Token expiry time.
     */
    constructor() {
        this.payload={};
        this.secret=process.env.TOKEN_SECRET_KEY;
        this.expiryTime='30m';
    }

    static builder(){
        return new TokenData();
    }

    setPayload(payload){
        if(!isEmpty(payload)){
            this.payload=payload;
        }
        return this;
    }

    setSecret(secret){
        if(!isEmpty(secret)){
            this.secret=secret;
        }
        return this;
    }

    setExpiryTime(expiryTime){
        if(!isEmpty(expiryTime)){
            this.expiryTime=expiryTime;
        }
        return this;
    }
};