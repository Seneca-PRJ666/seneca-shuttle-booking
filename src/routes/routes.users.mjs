'use strict'

import express from "express";
import getLogger from '../config/config.logger.mjs'
import HttpStatus from "../services/service.httpStatus.mjs";
import UserService from "../services/services.users.js";
import {isEmpty} from "../utilities/validator.js";

const UserRouter = express.Router();
const logger = getLogger("Users Route");

/**
 * User registration
 */
UserRouter.post("/", async function (req, res){
    if(isEmpty(req.body)){
        res.status(HttpStatus.UNPROCESSABLE).json({status:"error", message:"Payload required"})
        return;
    }

    try{
        const result = await UserService.register(req.body);
        res.status(HttpStatus.CREATED).json({status:"success", message:"User successfully registered"});
    }
    catch (e) {
        //todo error handling must be more robust
        res.status(HttpStatus.UNPROCESSABLE).json({status:"error", message:"Some error occured"});
    }
})


/**
 * User login
 *
 */
UserRouter.post("/login", async function (req, res){
    if(isEmpty(req.body)){
        res.status(HttpStatus.UNPROCESSABLE).json({status:"error", message:"Payload required"});
        return;
    }

    try{
        const token = await UserService.login(req.body);
        res.cookie("jwt", token, {httpOnly: true});
        res.status(HttpStatus.OK).json({status:"success",message:"Successfully logged in" });
        return;
    }
    catch (e) {
        res.status(HttpStatus.UNAUTHORIZED).json({status:"error", message:"Unauthorized"});
    }
})
export default UserRouter;