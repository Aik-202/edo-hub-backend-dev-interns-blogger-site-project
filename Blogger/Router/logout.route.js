const path=require('path');

const {logOut}=require(path.join(__dirname,'..','Controller','logout.controller'));

const logoutRoute=require('express').Router();

logoutRoute.get('/',logOut);

module.exports={
    logoutRoute
}