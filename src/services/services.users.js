'use strict'

import bcrypt from "bcrypt";
import UserDB from "../dbaccess/dbaccess.users.js";
import TokenData from "../entities/tokenData.js";
import {isEmpty} from "../utilities/validator.js";
import {InvalidArguments, PasswordMismatchError, UnauthorizedUserError} from "./services.errors.js";
import tokenService from "./services.token.js";


export default class UserService {

    /**
     * @name register
     * @description
     * Register a new user.
     *
     * @param {Object} userData
     * @param {string} userData.username
     * @param {string} userData.password
     * @param {string} userData.password2
     * @returns {module:Utilities~Response}
     */
    static async register(userData) {
        try {
            if (isEmpty(userData.password)) {
                throw new InvalidArguments("Password is required");
            }
            if (userData.password !== userData.password2) {
                throw new PasswordMismatchError("Password1 and password2 must match");
            }

            //hash and salt
            let hash = await bcrypt.hash(userData.password, 10);
            userData.password = hash;
            const user = await UserDB.insertOne(userData);
            return user;
        } catch (err) {
            throw e;
        }
    }

    /**
     * @name checkUser
     * @description
     * Authenticate user and allow login.
     *
     * @param {Object} user
     * @param {string} user.username
     * @param {string} user.password
     * @returns
     */
    static async login(user) {
        const validUser = await this.checkUser(user);
        if (validUser) {
            //create token
            const tokenPayload = {
                username: user.username
            }
            const tokenData = TokenData.builder().setExpiryTime('1d').setPayload(tokenPayload);
            const token = tokenService.generateToken(tokenData);
            return token;
        } else {
            throw UnauthorizedUserError("Unauthorized");
        }
    }

    /**
     * @name checkUser
     * @description
     * Authenticate user and allow login.
     *
     * @param {Object} user
     * @param {string} user.username
     * @param {string} user.password
     * @returns {module:Utilities~Response}
     */
    static async checkUser(user) {
        let validUser=false;
        try {
            const userInDb = await UserDB.findByUsername(user.username, "username password");

            if (isEmpty(userInDb)) {
                throw new UserNotFound("User is not registered");
            }

            //match password
            validUser = await bcrypt.compare(
                user.password,
                userInDb.password
            );
        } catch (err) {
            console.log(err);
        }
        return validUser;
    }
}